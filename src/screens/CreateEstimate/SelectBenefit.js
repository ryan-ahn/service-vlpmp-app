/**
 * Author : Ryan
 * Date : 2022-08-16
 * Desc : SelectBenefit
 */

import React, { useCallback } from 'react';
import { ScrollView, View, Text, TextInput, Switch } from 'react-native';
import styled from 'styled-components/native';
import { useCreateEstimateStore, useCallStore } from '@libs/zustand';
import { BENEFIT_SWITCHBOX_LABEL } from '@containers/data';
import StackTitle from '@components/Common/Title/StackTitle';

export default function SelectBenefit() {
  // Root State
  const { saletype, selectedBenefit, setSelectedBenefit, setSaleType } = useCreateEstimateStore();
  const { callDetail } = useCallStore();

  const onChangeToggleSwitch = useCallback(
    id => {
      const copiedSelectedBenefit = [...selectedBenefit];
      if (selectedBenefit.some(storeItem => storeItem === id)) {
        setSelectedBenefit(copiedSelectedBenefit.filter(filteredItem => filteredItem !== id));
      } else {
        setSelectedBenefit(copiedSelectedBenefit.concat(id));
      }
    },
    [selectedBenefit],
  );

  // Render Item
  const renderCheckBoxItem = useCallback(
    item => {
      return (
        <CheckBoxItemWrapper>
          <LabelText>{item.label}</LabelText>
          <Switch
            value={selectedBenefit.some(storeItem => storeItem === item.id)}
            thumbColor={
              selectedBenefit.some(storeItem => storeItem === item.id) ? 'white' : 'white'
            }
            trackColor={{ true: '#557FE6', false: '#F3F3F3' }}
            onValueChange={() => onChangeToggleSwitch(item.id)}
          ></Switch>
        </CheckBoxItemWrapper>
      );
    },
    [selectedBenefit],
  );

  const renderInputBoxItem = useCallback(() => {
    return (
      <CheckBoxItemWrapper>
        <LabelText>할인 종류</LabelText>
        <InputModelName
          value={saletype}
          placeholder={`(요청: ${callDetail.purpose})`}
          onChangeText={value => setSaleType(value)}
        />
      </CheckBoxItemWrapper>
    );
  }, [saletype]);

  // Render List
  const renderCheckBoxList = useCallback(() => {
    return BENEFIT_SWITCHBOX_LABEL.map(item => (
      <View key={item.id}>{renderCheckBoxItem(item)}</View>
    ));
  }, [selectedBenefit]);

  return (
    <Wrapper>
      <StackTitle title={'적용 가능한\n할인 혜택을 선택해 주세요'} />
      <ContentBlock>
        {renderCheckBoxList()}
        {renderInputBoxItem()}
      </ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled(ScrollView)``;

const ContentBlock = styled(View)`
  padding: 10px 25px;
`;

const CheckBoxItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  height: 60px;
`;

const LabelText = styled(Text)`
  color: #676767;
  ${({ theme }) => theme.fontSet(15, 400, 21)};
`;

const InputModelName = styled(TextInput)`
  width: 120px;
  padding: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  ${({ theme }) => theme.fontSet(16, 400, 24)};
`;
