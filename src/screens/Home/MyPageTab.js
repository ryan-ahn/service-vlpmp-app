/**
 * Author : Ryan
 * Date : 2022-08-13
 * Desc : MyPageTab
 */

import React, { useCallback } from 'react';
import { Platform, Dimensions, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore, useMypageStore } from '@libs/zustand';
import { MYINFO_DATA, MYPAGE_MENU_LIST } from '@containers/data';
import Icons from '@components/Common/Icons';
import PageHeader from '@components/Common/Header/PageHeader';

export default function MyPageTab({ navigation, route }) {
  // Root State
  const { userDetail, initSignInState } = useUserStore();
  const { setId } = useMypageStore();
  // value
  const screenHeight = Dimensions.get('window').height;
  // Hooks
  const toast = useToast();

  const onPressSignOut = useCallback(async () => {
    await AsyncStorage.removeItem('access');
    initSignInState();
  }, []);

  const onPressRouteToStack = useCallback(stack => {
    // navigation.navigate('editMyInfo');
    navigation.navigate(stack);
    if (stack === 'notice') {
      setId(null);
    }
  }, []);

  // Render Item
  const renderMyInfoItem = useCallback(item => {
    return (
      <MyInfoItemWrapper>
        <FlexRowBox>
          <BrandIconBox attrSvg={item.store.brand}>
            <Icons icon={item.store.brand} width={60} height={60} />
          </BrandIconBox>
          <DetailInfoBox>
            <MyNameText>{`${item.name} 담당자`}</MyNameText>
            <BrandNameText numberOfLines={1}>{item.store.name}</BrandNameText>
            <BrandAddressText numberOfLines={1}>{item.store.address}</BrandAddressText>
          </DetailInfoBox>
        </FlexRowBox>
        {/* <EditButtonBox>
          <EditButtonText>편집</EditButtonText>
        </EditButtonBox> */}
      </MyInfoItemWrapper>
    );
  }, []);

  const renderMyRankItem = useCallback(item => {
    return (
      <MyRankItemWrapper>
        <RankText>{`RANK ${item.rank}`}</RankText>
        <DealBox>
          <DealText>누적 확정 거래수</DealText>
          <DealCount>{`${item.deal} 회`}</DealCount>
        </DealBox>
      </MyRankItemWrapper>
    );
  }, []);

  const renderMenuItem = useCallback(item => {
    return (
      <MenuItemWrapper onPress={() => onPressRouteToStack(item.stack)}>
        <LabelText>{item.label}</LabelText>
        <Icons icon={'arrowRightBlack'} width={15} height={15} />
      </MenuItemWrapper>
    );
  }, []);

  // Render List
  const renderMenuList = useCallback(() => {
    return MYPAGE_MENU_LIST.map(item => <View key={item.id}>{renderMenuItem(item)}</View>);
  }, []);

  return (
    <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight - 80 : screenHeight - 94 }}>
      <HeaderBlock>
        <PageHeader navigation={navigation} tab="mypage" />
      </HeaderBlock>
      <ContentBlock>
        <MyInfoBlock>{renderMyInfoItem(userDetail)}</MyInfoBlock>
        {/* <MyRankBlock>{renderMyRankItem(MYINFO_DATA)}</MyRankBlock> */}
        <MenuBlock>
          {renderMenuList()}
          <SignOutButtonBox onPress={onPressSignOut}>
            <SignOutButtonText textBreakStrategy="simple">로그아웃</SignOutButtonText>
          </SignOutButtonBox>
        </MenuBlock>
      </ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  background-color: white;
`;

const HeaderBlock = styled(View)`
  padding: 0 25px;
  padding-bottom: 20px;
`;

const ContentBlock = styled(ScrollView)`
  padding: 0 25px 50px 25px;
`;

const MyInfoBlock = styled(View)``;

const MyInfoItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
`;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const BrandIconBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 78px;
  height: 78px;
  margin-right: 15px;
  border-radius: 12px;
  background-color: black;
  ${props =>
    props.attrSvg === 'samsung' &&
    css`
      background-color: #3a67bf;
    `}
  ${props =>
    props.attrSvg === 'lg' &&
    css`
      background-color: #f34e4e;
    `}
    ${props =>
    props.attrSvg === 'himart' &&
    css`
      background-color: #ff1c1c;
    `}
    ${props =>
    props.attrSvg === 'electronic' &&
    css`
      background-color: #2e2f3a;
    `}
`;

const DetailInfoBox = styled(View)`
  width: 60%;
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
`;

const MyNameText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 700, 24)};
`;

const BrandNameText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 400, 24)};
`;

const BrandAddressText = styled(Text)`
  color: #b1b1b1;
  ${({ theme }) => theme.fontSet(14, 300, 20)};
`;

const EditButtonBox = styled(View)`
  padding: 10px;
`;
const EditButtonText = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(14, 400, 20)};
`;

const MyRankBlock = styled(View)`
  padding: 25px 0;
`;

const MyRankItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
  padding: 20px 30px;
  border-radius: 15px;
  background-color: #e9e9e9;
`;

const RankText = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(9, 700, 15)};
`;

const DealBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
`;

const DealText = styled(Text)`
  ${({ theme }) => theme.fontSet(18, 400, 30)};
`;

const DealCount = styled(Text)`
  ${({ theme }) => theme.fontSet(18, 400, 30)};
`;

const MenuBlock = styled(View)``;

const MenuItemWrapper = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  height: 60px;
`;

const LabelText = styled(Text)`
  ${({ theme }) => theme.fontSet(17, 500, 25)};
`;

const SignOutButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  width: 100%;
  height: 50px;
`;

const SignOutButtonText = styled(Text)`
  ${({ theme }) => theme.fontSet(17, 500, 25)};
`;
