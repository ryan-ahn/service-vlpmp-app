/**
 * Author : Ryan
 * Date : 2022-07-30
 * Desc : Intro
 */

import React, { useCallback } from 'react';
import { Platform, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useSignUpStore } from '@libs/zustand';
import IntroBanner from '@components/Common/Banner/IntroBanner';

export default function IntroScreen({ navigation }) {
  // Root State
  const { initSignUpStore } = useSignUpStore();
  // Value
  const screenHeight = Dimensions.get('window').height;

  const onPressRouteToSignIn = useCallback(() => {
    navigation.navigate('signIn');
  }, []);

  const onPressRouteToSignUp = useCallback(() => {
    initSignUpStore();
    navigation.navigate('signUp');
  }, []);

  return (
    <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight : screenHeight - 24 }}>
      <ContentBlock>
        <IntroBanner />
      </ContentBlock>
      <ButtonBlock>
        <SignInButtonBox onPress={onPressRouteToSignIn}>
          <ButtonTextWhite>로그인하기</ButtonTextWhite>
        </SignInButtonBox>
        <SignUpButtonBox onPress={onPressRouteToSignUp}>
          <ButtonTextBlack>가입하기</ButtonTextBlack>
        </SignUpButtonBox>
      </ButtonBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  position: relative;
`;

const ContentBlock = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
`;

const ButtonBlock = styled(View)`
  position: absolute;
  bottom: 30px;
  width: 100%;
  padding: 0 25px;
`;

const SignInButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 50px;
  border-radius: 12px;
  margin-bottom: 10px;
  background-color: #557fe6;
`;

const SignUpButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: #e7e7e7;
`;

const ButtonTextBlack = styled(Text)`
  width: 100%;
  height: 26px;
  ${({ theme }) => theme.fontSet(18, 700, 26)};
  text-align: center;
`;
const ButtonTextWhite = styled(Text)`
  width: 100%;
  height: 26px;
  color: white;
  ${({ theme }) => theme.fontSet(18, 700, 26)};
  text-align: center;
`;
