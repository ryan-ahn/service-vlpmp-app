/**
 * Author : Ryan
 * Date : 2022-08-28
 * Desc : Input Name
 */

import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useSignUpStore } from '@libs/zustand';
import StackTitle from '@components/Common/Title/StackTitle';

export default function InputNumber() {
  // Root State
  const { setNumber } = useSignUpStore();
  // State
  const [focusedItem, setFocusedItem] = useState(false);

  return (
    <Wrapper>
      <TitleBox>
        <PartnersText>파트너스</PartnersText>
        <StackTitle title={'본인 확인을 위해\n휴대전화 인증이 필요합니다'} />
      </TitleBox>
      <InputBox>
        <LabelText>휴대전화</LabelText>
        <Input
          attrFocus={focusedItem}
          autoFocus={true}
          keyboardType="phone-pad"
          placeholder={'예: 01012345678'}
          onFocus={() => setFocusedItem(true)}
          onBlur={() => setFocusedItem(false)}
          onChangeText={text => setNumber(text)}
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
  margin-top: 70px;
`;

const LabelText = styled(Text)`
  color: #333333;
  ${({ theme }) => theme.fontSet(13, 100, 20)};
`;

const Input = styled(TextInput)`
  width: 100%;
  height: 50px;
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
`;
