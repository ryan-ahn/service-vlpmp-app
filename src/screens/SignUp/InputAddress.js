/**
 * Author : Ryan
 * Date : 2022-08-29
 * Desc : Input Name
 */

import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { SIGNUP_NOTICE_TEXT } from '@containers/data';
import { useSignUpStore } from '@libs/zustand';
import StackTitle from '@components/Common/Title/StackTitle';

export default function InputAddress({ navigation }) {
  // Root State
  const { address, setDetailAddress } = useSignUpStore();
  // State
  const [focusedItem, setFocusedItem] = useState(false);

  const onPressRouteToPostCode = useCallback(() => {
    navigation.navigate('postCode');
  }, []);

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
        <StackTitle title={'지점 주소를 입력해 주세요'} />
      </TitleBox>
      <InputBox>
        <LabelText>주소</LabelText>
        <AddressBox>
          <AddressText>{address ? address : '주소를 검색해 주세요'}</AddressText>
          <AddressButton onPress={onPressRouteToPostCode}>
            <ButtonText>검색</ButtonText>
          </AddressButton>
        </AddressBox>
        {address ? (
          <Input
            attrFocus={focusedItem}
            autoFocus={true}
            placeholder={'상세 주소를 입력해 주세요'}
            onFocus={() => setFocusedItem(true)}
            onBlur={() => setFocusedItem(false)}
            onChangeText={text => setDetailAddress(text)}
          />
        ) : null}
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

const AddressBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
  height: 50px;
  border-bottom-width: 2px;
  border-bottom-color: #eee;
`;

const AddressText = styled(Text)`
  color: #bbb;
  padding: 5px 0;
  ${({ theme }) => theme.fontSet(16, 400, 25)};
`;

const AddressButton = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 60px;
  height: 40px;
  border-radius: 7px;
  background-color: #557fe6;
`;

const ButtonText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(15, 600, 24)};
`;

const Input = styled(TextInput)`
  width: 100%;
  height: 50px;
  margin-top: 20px;
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
