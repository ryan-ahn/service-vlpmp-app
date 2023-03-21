/**
 * Author : Ryan
 * Date : 2022-06-12
 * Desc : RequestComplete
 */

import React, { useCallback } from 'react';
import { Dimensions, Platform, Pressable, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { useCreateEstimateStore } from '@libs/zustand';

export default function RequestComplete({ navigation, route }) {
  // Root State
  const { initStore } = useCreateEstimateStore();
  // Value
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const onPressRouteToHome = useCallback(() => {
    navigation.reset({ routes: [{ name: 'home' }] });
    initStore();
  }, []);

  return (
    <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight : screenHeight - 24 }}>
      <HeaderBlock>
        <HeaderTitle>견적 전송 완료</HeaderTitle>
      </HeaderBlock>
      <ContentBlock>
        <IconBox>📨</IconBox>
        <TitleBox>
          <TitleText>견적서가 전송되었습니다.</TitleText>
        </TitleBox>
        <DescriptionBox>
          <DescriptionRegularText>고객의 연락처는 대화 진행시</DescriptionRegularText>
          <DescriptionRegularText>
            <DescriptionBoldText>견적상담 탭</DescriptionBoldText>에서 확인 가능합니다.
          </DescriptionRegularText>
        </DescriptionBox>
      </ContentBlock>
      <NextButtonBox style={{ width: screenWidth - 40 }} onPress={onPressRouteToHome}>
        <NextButtonText>{'홈으로'}</NextButtonText>
      </NextButtonBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const HeaderBlock = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-end', 'row')};
  padding: 60px 20px 20px 20px;
  border: 1px solid #f2f3f4;
`;

const HeaderTitle = styled(Text)`
  ${({ theme }) => theme.fontSet(20, 700, 29)};
`;

const ContentBlock = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  padding: 25px;
`;

const IconBox = styled(Text)`
  margin-top: 100px;
  ${({ theme }) => theme.fontSet(60, 500, 70)};
`;

const TitleBox = styled(View)`
  margin-top: 20px;
`;

const TitleText = styled(Text)`
  ${({ theme }) => theme.fontSet(21, 700, 31)};
`;

const DescriptionBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'column')};
  width: 100%;
  margin-top: 30px;
  padding: 25px;
  border-radius: 14px;
  background-color: #f2f3f4;
`;

const DescriptionRegularText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 400, 25)};
`;

const DescriptionBoldText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 700, 25)};
`;

const NextButtonBox = styled(Pressable)`
  position: absolute;
  bottom: 30px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 60px;
  margin-left: 20px;
  border-radius: 14px;
  background-color: #557fe6;
  ${props =>
    props.attrDisabled &&
    css`
      display: none;
    `}
  ${props =>
    props.attrDeactive &&
    css`
      background-color: #eee;
    `}
`;

const NextButtonText = styled(Text)`
  width: 100%;
  height: 26px;
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
  text-align: center;
`;
