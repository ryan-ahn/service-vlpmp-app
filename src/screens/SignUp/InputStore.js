/**
 * Author : Ryan
 * Date : 2022-08-29
 * Desc : Input Name
 */

import React, { useState, useCallback } from 'react';
import { View, Text, TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';
import { SIGNUP_NOTICE_TEXT } from '@containers/data';
import { useSignUpStore } from '@libs/zustand';
import StackTitle from '@components/Common/Title/StackTitle';

export default function InputStore() {
  // Root State
  const { setStore } = useSignUpStore();
  // State
  const [focusedItem, setFocusedItem] = useState(false);

  // Render Item
  const renderNoticeItem = useCallback(item => {
    return (
      <NoticetItemWrapper>
        <NoticeTitleText>{item.title}</NoticeTitleText>
        {item.content.map(contentItem => (
          <FlexRowStartBox key={contentItem.id}>
            <NoticeContentText>{'∙ '}</NoticeContentText>
            <NoticeContentText>{contentItem.text}</NoticeContentText>
          </FlexRowStartBox>
        ))}
      </NoticetItemWrapper>
    );
  }, []);

  // Render List
  const renderNoticeList = useCallback(data => {
    return data.map(item => <View key={item.id}>{renderNoticeItem(item)}</View>);
  });

  return (
    <Wrapper>
      <TitleBox>
        <PartnersText>파트너스</PartnersText>
        <StackTitle title={'지점명을 입력해 주세요'} />
      </TitleBox>
      <InputBox>
        <LabelText>지점명</LabelText>
        <Input
          attrFocus={focusedItem}
          autoFocus={true}
          placeholder={'예: 발품전자 노노점'}
          onFocus={() => setFocusedItem(true)}
          onBlur={() => setFocusedItem(false)}
          onChangeText={text => setStore(text)}
        ></Input>
      </InputBox>
      <NoticeBox>{renderNoticeList(SIGNUP_NOTICE_TEXT)}</NoticeBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  height: 100%;
`;

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

const NoticeBox = styled(View)`
  position: absolute;
  bottom: 0px;
  width: 100%;
  background-color: #f6f6f6;
  padding: 25px 45px 140px 30px;
  text-align: left;
`;

const NoticeTitleText = styled(Text)`
  margin-bottom: 10px;
  color: #f26467;
  ${({ theme }) => theme.fontSet(14, 700, 20)};
`;

const NoticetItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  margin-bottom: 20px;
`;

const FlexRowStartBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'row')};
`;

const NoticeContentText = styled(Text)`
  color: #9b9ea8;
  ${({ theme }) => theme.fontSet(13, 400, 18)};
`;
