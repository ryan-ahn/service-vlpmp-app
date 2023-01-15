/**
 * Author : Ryan
 * Date : 2022-08-17
 * Desc : index
 */

import React, { useCallback, useEffect } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { RESPONSE_LIST_TAB, ESTIMATE_LIST_TYPE } from '@containers/data';
import { validationMillion } from '@libs/utils/validation';
import { useUsingEstimateStore } from '@libs/zustand';
import StackHeader from '@components/Common/Header/StackHeader';
import StackTab from '@components/Common/Tab/StackTab';
import ListFilter from '@components/Common/Filter/ListFilter';
import { VARIATION_BRAND_TYPE, VARIATION_STATUE_TYPE } from '@containers/type';

export default function EstimateListScreen({ navigation, route }) {
  // Root State
  const { setId, tab, setTab, usingEstimateList, fetchUsingEstimate, isLoadingUsingEstimate } =
    useUsingEstimateStore();
  // value
  const screenHeight = Dimensions.get('window').height;
  const onChangeFocusedTab = useCallback(
    tab => {
      setTab(tab);
    },
    [tab],
  );

  const onPressRouteToRequestDetail = useCallback(item => {
    setId(item.id);
    if (item.chatUrl) {
      // navigation.reset({ routes: [{ name: 'home' }] });
    }
  }, []);

  useEffect(() => {
    fetchUsingEstimate({ type: tab });
  }, [tab]);

  // Render Content
  const renderTitleContent = useCallback(
    item => {
      switch (item) {
        case 'ING':
          return '작성 중인 견적서';
        case 'SENDED':
          return '발송한 견적서';
        case 'USING':
          return '상담중인 견적서';
      }
    },
    [tab],
  );

  // Render Item
  const renderRequestTypeItem = useCallback(
    item => {
      switch (item.call.type) {
        case 'BRAND':
          return (
            <SelectedSpecText>{`${VARIATION_BRAND_TYPE[item.call.brand]} | ${
              item.products.length
            }품목 | ${validationMillion(Number(item.priceAvailable))} | ${
              item.call.purpose
            }`}</SelectedSpecText>
          );
        case 'BUDGET':
          return (
            <SelectedSpecText>{`무관 | ${item.products.length}품목 | ${validationMillion(
              Number(item.priceAvailable),
            )} | ${item.call.purpose}`}</SelectedSpecText>
          );
        case 'MODEL':
          return (
            <SelectedSpecText>{`무관 | ${item.products.length}품목 | ${validationMillion(
              Number(item.priceAvailable),
            )} | ${item.call.purpose}`}</SelectedSpecText>
          );
      }
    },
    [tab],
  );

  const renderRequestItem = useCallback(
    item => {
      return (
        <ItemWrapper key={item.id}>
          <FlexColumnBox>
            <FlexRowBox>
              <RequestTypeText textBreakStrategy="simple">
                {ESTIMATE_LIST_TYPE[item.call.type]}
              </RequestTypeText>
              <StatusBox attrState={item.state}>
                <StatusText>{VARIATION_STATUE_TYPE[item.state]}</StatusText>
              </StatusBox>
            </FlexRowBox>
            <FlexRowBox>{renderRequestTypeItem(item)}</FlexRowBox>
            <DeliveryAddressText>{item.deliveryAddress}</DeliveryAddressText>
          </FlexColumnBox>
          {/* <ButtonBox onPress={() => onPressRouteToRequestDetail(item)}>
            <ButtonText>보기</ButtonText>
          </ButtonBox> */}
        </ItemWrapper>
      );
    },
    [tab],
  );

  // Render List
  const renderResponseList = useCallback(() => {
    if (!isLoadingUsingEstimate && usingEstimateList !== null) {
      if (usingEstimateList.length !== 0) {
        return usingEstimateList.map(item => <View key={item.id}>{renderRequestItem(item)}</View>);
      } else {
        return (
          <EmptyWrapper>
            <EmptyText>진행 중인 견적서가 없어요</EmptyText>
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
  }, [tab, usingEstimateList, isLoadingUsingEstimate]);

  return (
    <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight : screenHeight - 24 }}>
      <HeaderBlock>
        <StackHeader
          type="step"
          title={renderTitleContent(tab)}
          navigation={navigation}
          route={route}
        />
      </HeaderBlock>
      <TabBlock>
        <StackTab
          list={RESPONSE_LIST_TAB}
          focusedTab={tab}
          onChangeFocusedTab={onChangeFocusedTab}
        />
      </TabBlock>
      <FilterBlock>
        <ListFilter />
      </FilterBlock>
      <ListBlock>{renderResponseList()}</ListBlock>
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
    props.attrState === 'SENDED' &&
    css`
      background-color: #525864;
    `}
    ${props =>
    props.attrState === 'USING' &&
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
