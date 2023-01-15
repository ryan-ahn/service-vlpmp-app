/**
 * Author : Ryan
 * Date : 2022-08-17
 * Desc : SelectModel
 */

import React, { useState, useCallback } from 'react';
import { View, Text, TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useCreateEstimateStore } from '@libs/zustand';
import { ESTIMATE_PRICE_LABEL, CALL_NOTICE_TEXT } from '@containers/data';
import StackTitle from '@components/Common/Title/StackTitle';

export default function SelectPrice() {
  // Root State
  const { retailPrice, price, setRetailPrice, setPrice } = useCreateEstimateStore();
  // State
  const [focusedItem, setFocusedItem] = useState(null);

  const onChangePrice = useCallback(
    (price, type) => {
      switch (type) {
        case 0:
          setRetailPrice(price * 10000);
          break;
        case 1:
          setPrice(price * 10000);
          break;
      }
    },
    [retailPrice, price],
  );

  // Render Item
  const renderPriceItem = useCallback(
    item => {
      return (
        <PriceItemWrapper>
          <LabelText>{item.label}</LabelText>
          <ValueBox>
            <ValueTextInput
              keyboardType="number-pad"
              placeholder={'(예: 1,100)'}
              attrFocused={item.id === focusedItem}
              onPressIn={() => setFocusedItem(item.id)}
              onChangeText={e => onChangePrice(e, item.id)}
            />
            <UnitText>만원</UnitText>
          </ValueBox>
        </PriceItemWrapper>
      );
    },
    [focusedItem],
  );

  const renderAlertItem = useCallback(item => {
    return (
      <AlertItemWrapper>
        <AlertTitleText>{item.title}</AlertTitleText>
        {item.content.map(contentItem => (
          <FlexRowStartBox key={contentItem.id}>
            <AlertContentText>{'∙ '}</AlertContentText>
            <AlertContentText>{contentItem.text}</AlertContentText>
          </FlexRowStartBox>
        ))}
      </AlertItemWrapper>
    );
  }, []);

  // Render List
  const renderPriceList = useCallback(
    data => {
      return data.map(item => <View key={item.id}>{renderPriceItem(item)}</View>);
    },
    [focusedItem],
  );

  const renderAlertList = useCallback(data => {
    return data.map(item => <View key={item.id}>{renderAlertItem(item)}</View>);
  });

  return (
    <Wrapper>
      <StackTitle
        title={'할인이 반영된\n최대 혜택가를 입력해 주세요'}
        description={'차액만큼 할인률이 계산됩니다.'}
      />
      <ContentBlock>{renderPriceList(ESTIMATE_PRICE_LABEL)}</ContentBlock>
      <AlertBlock>{renderAlertList(CALL_NOTICE_TEXT)}</AlertBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  position: relative;
  height: 100%;
  background-color: #f6f6f6;
`;

const ContentBlock = styled(View)`
  padding: 10px 25px 60px 25px;
  background-color: white;
`;

const AlertBlock = styled(View)`
  background-color: #f6f6f6;
  padding: 45px 35px 110px 35px;
  text-align: left;
`;

const PriceItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  height: 60px;
`;

const LabelText = styled(Text)`
  color: #353942;
  ${({ theme }) => theme.fontSet(16, 400, 24)};
`;

const ValueBox = styled(View)`
  position: relative;
  width: 40%;
  height: 40px;
`;
const ValueTextInput = styled(TextInput)`
  position: absolute;
  left: 0;
  width: 100%;
  height: 40px;
  ${({ theme }) => theme.fontSet(16, 400, 24)};
  border-bottom-width: 2px;
  border-bottom-color: #eaeaea;
  ${props =>
    props.attrFocused &&
    css`
      border-bottom-color: #557fe6;
    `}
`;

const UnitText = styled(Text)`
  position: absolute;
  bottom: 7px;
  right: 0;
  color: #353942;
  ${({ theme }) => theme.fontSet(18, 500, 26)};
`;

const AlertItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  margin-bottom: 20px;
`;

const AlertTitleText = styled(Text)`
  margin-bottom: 10px;
  color: #9b9ea8;
  ${({ theme }) => theme.fontSet(14, 500, 20)};
`;

const FlexRowStartBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'row')};
`;

const AlertContentText = styled(Text)`
  color: #9b9ea8;
  ${({ theme }) => theme.fontSet(13, 400, 18)};
`;
