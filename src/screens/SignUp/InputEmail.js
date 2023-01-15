/**
 * Author : Ryan
 * Date : 2022-08-28
 * Desc : Input Name
 */

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useToast } from 'react-native-toast-notifications';
import { useSignUpStore } from '@libs/zustand';
import { EMAIL_REGEX } from '@libs/utils/verification';
import StackTitle from '@components/Common/Title/StackTitle';

export default function InputEmail() {
  // Root State
  const {
    email,
    setEmail,
    setPassword,
    setRepassword,
    checkedEmail,
    fetchCheckEmail,
    isLoadingCheckEmail,
    hasErrorsCheckEmail,
    errorMessage,
    initCheckEmailError,
  } = useSignUpStore();
  // State
  const [focusedItem, setFocusedItem] = useState(null);
  // Hooks
  const toast = useToast();

  const onPressCheckEmail = useCallback(() => {
    fetchCheckEmail({ email: email });
  }, [email]);

  useEffect(() => {
    if (checkedEmail !== null) {
      if (checkedEmail && checkedEmail.success) {
        toast.show(checkedEmail.message);
      }
    } else if (hasErrorsCheckEmail) {
      toast.show(errorMessage);
    }
    setTimeout(() => {
      initCheckEmailError();
    }, 1000);
  }, [checkedEmail, hasErrorsCheckEmail, errorMessage]);

  return (
    <Wrapper>
      <TitleBox>
        <PartnersText>회원가입</PartnersText>
        <StackTitle title={'이메일과 비밀번호를\n입력해 주세요'} />
      </TitleBox>
      <InputBox>
        <LabelText>이메일</LabelText>
        <EmailInputBox>
          <Input
            type="check"
            attrFocus={focusedItem === 0}
            autoFocus={true}
            keyboardType="email-address"
            placeholder={'예: info@vlpm.io'}
            onFocus={() => setFocusedItem(0)}
            onBlur={() => setFocusedItem(null)}
            onChangeText={text => setEmail(text)}
          ></Input>
          <CheckEmailButtonBox
            attrDisabled={EMAIL_REGEX.test(email) === false}
            disabled={EMAIL_REGEX.test(email) === false}
            onPress={onPressCheckEmail}
          >
            {isLoadingCheckEmail ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <CheckEmailButtonText>확인</CheckEmailButtonText>
            )}
          </CheckEmailButtonBox>
        </EmailInputBox>
        <LabelText>비밀번호</LabelText>
        <Input
          attrFocus={focusedItem === 1}
          secureTextEntry={true}
          placeholder={'영어 + 숫자 8자리 이상'}
          onFocus={() => setFocusedItem(1)}
          onBlur={() => setFocusedItem(null)}
          onChangeText={text => setPassword(text)}
        ></Input>
        <LabelText>비밀번호 확인</LabelText>
        <Input
          attrFocus={focusedItem === 2}
          secureTextEntry={true}
          placeholder={'비밀번호를 다시 입력해 주세요'}
          onFocus={() => setFocusedItem(2)}
          onBlur={() => setFocusedItem(null)}
          onChangeText={text => setRepassword(text)}
        ></Input>
      </InputBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const TitleBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
`;

const PartnersText = styled(Text)`
  margin-top: 10px;
  padding: 0 25px;
  color: #557fe6;
  ${({ theme }) => theme.fontSet(18, 700, 25)};
`;

const InputBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'column')};
  padding: 25px;
  margin-top: 50px;
`;

const EmailInputBox = styled(View)`
  width: 100%;
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'row')};
`;

const CheckEmailButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 60px;
  height: 40px;
  border-radius: 7px;
  background-color: #557fe6;
  ${props =>
    props.attrDisabled &&
    css`
      background-color: #eee;
    `}
`;

const CheckEmailButtonText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(15, 600, 24)};
`;

const LabelText = styled(Text)`
  color: #333333;
  ${({ theme }) => theme.fontSet(13, 100, 20)};
`;

const Input = styled(TextInput)`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  border-bottom-width: 2px;
  border-bottom-color: #eee;
  padding: 5px 0;
  ${({ theme }) => theme.fontSet(16, 400, 25)};
  ${props =>
    props.attrFocus &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: #6690ed;
    `}
  ${props =>
    props.type === 'check' &&
    css`
      width: 81%;
    `}
`;
