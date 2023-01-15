/**
 * Author : Ryan
 * Date : 2022-08-15
 * Desc : index
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  Dimensions,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { REQUEST_LIST_TAB } from '@containers/data';
import { validationMillion } from '@libs/utils/validation';
import { useCallStore } from '@libs/zustand';
import StackHeader from '@components/Common/Header/StackHeader';
import StackTab from '@components/Common/Tab/StackTab';
import ListFilter from '@components/Common/Filter/ListFilter';
import { VARIATION_REQUEST_TYPE, VARIATION_BRAND_TYPE } from '@containers/type';

export default function CallListScreen({ navigation, route }) {
  // Root State
  const { callList, setCallDetail, fetchCallList, isLoadingCall, isFetchedCall, errorMessage } =
    useCallStore();
  // State
  const [focusedTab, setFocusedTab] = useState('new');
  // value
  const screenHeight = Dimensions.get('window').height;

  const onChangeFocusedTab = useCallback(
    tab => {
      setFocusedTab(tab);
    },
    [focusedTab],
  );

  const onPressRouteToCallDetail = useCallback(item => {
    setCallDetail(item);
    navigation.navigate('callDetail');
  }, []);

  useEffect(() => {
    if (focusedTab === 'new') {
      fetchCallList(7);
    } else {
      fetchCallList(1);
    }
  }, [focusedTab]);

  // Render Item
  const renderCallTypeItem = useCallback(item => {
    switch (item.type) {
      case 'brand':
        return (
          <SelectedSpecText>{`${VARIATION_BRAND_TYPE[item.brand]} | ${validationMillion(
            item.budget,
          )} | ${item.purpose}`}</SelectedSpecText>
        );
      case 'budget':
        return (
          <SelectedSpecText>{`전체 | ${validationMillion(item.budget)} | ${
            item.purpose
          }`}</SelectedSpecText>
        );
      case 'model':
        return (
          <SelectedSpecText>{`전체 | ${validationMillion(item.budget)} | ${
            item.purpose
          }`}</SelectedSpecText>
        );
    }
  }, []);

  const renderCallItem = useCallback(item => {
    return (
      <ItemWrapper key={item.id}>
        <FlexColumnBox>
          <FlexRowBox>
            <RequestTypeText textBreakStrategy="simple">
              {VARIATION_REQUEST_TYPE[item.type]}
            </RequestTypeText>
            <StatusBox attrState={item.tags[0]}>
              <StatusText>{item.tags[0]}</StatusText>
            </StatusBox>
          </FlexRowBox>
          <FlexRowBox>{renderCallTypeItem(item)}</FlexRowBox>
          <DeliveryAddressText>{item.address}</DeliveryAddressText>
        </FlexColumnBox>
        <ButtonBox onPress={() => onPressRouteToCallDetail(item)}>
          <ButtonText>보기</ButtonText>
        </ButtonBox>
      </ItemWrapper>
    );
  }, []);

  // Render List
  const renderList = useCallback(() => {
    if (!isLoadingCall && callList !== null) {
      if (callList.length !== 0) {
        return callList.map(item => <View key={item.id}>{renderCallItem(item)}</View>);
      } else {
        return (
          <EmptyWrapper>
            <EmptyText>도착한 견적서가 없어요</EmptyText>
          </EmptyWrapper>
        );
      }
    } else {
      return (
        <EmptyWrapper>
          <ActivityIndicator size="large" color="#557FE6" />
        </EmptyWrapper>
      );
    }
  }, [focusedTab, callList, isLoadingCall]);

  return (
    <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight : screenHeight - 24 }}>
      <HeaderBlock>
        <StackHeader
          type="step"
          title={focusedTab === 'new' ? '24시간 내에 접수된 요청서' : '7일 이내 마감되는 요청서'}
          navigation={navigation}
          route={route}
        />
      </HeaderBlock>
      <TabBlock>
        <StackTab
          list={REQUEST_LIST_TAB}
          focusedTab={focusedTab}
          onChangeFocusedTab={onChangeFocusedTab}
        />
      </TabBlock>
      <FilterBlock>
        <ListFilter />
      </FilterBlock>
      <ListBlock>{renderList()}</ListBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const HeaderBlock = styled(View)`
  padding: 0 20px;
`;

const TabBlock = styled(View)`
  padding: 0 25px;
`;

const FilterBlock = styled(View)`
  padding: 25px;
`;

const ListBlock = styled(ScrollView)`
  padding: 0 25px;
`;

const ItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  margin-bottom: 30px;
`;

const FlexColumnBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
`;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const RequestTypeText = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(14, 400, 20)};
`;

const StatusBox = styled(View)`
  margin-left: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  ${props =>
    props.attrState === 'ING' &&
    css`
      background-color: #f26467;
    `}
  ${props =>
    props.attrState === '견적전송' &&
    css`
      background-color: #525864;
    `}
    ${props =>
    props.attrState === '상담중' &&
    css`
      background-color: #557fe6;
    `}
`;

const StatusText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(10, 700, 12)};
`;

const SelectedSpecText = styled(Text)`
  margin-top: 3px;
  color: #353942;
  ${({ theme }) => theme.fontSet(16, 700, 22)};
`;

const DeliveryAddressText = styled(Text)`
  margin-top: 3px;
  color: #9b9ea8;
  ${({ theme }) => theme.fontSet(14, 400, 20)};
`;

const ButtonBox = styled(TouchableOpacity)`
  padding: 8px 18px;
  border-radius: 6px;
  background-color: #f7f7f7;
`;

const ButtonText = styled(Text)`
  color: #525864;
  ${({ theme }) => theme.fontSet(13, 700, 18)};
`;

const EmptyWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 100px;
`;

const EmptyText = styled(Text)`
  color: #666;
  ${({ theme }) => theme.fontSet(13, 400, 20)};
`;
