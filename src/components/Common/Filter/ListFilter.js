/**
 * Author : Ryan
 * Date : 2022-08-15
 * Desc : ListFilter
 */

import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useModalStore, useFilterStore } from '@libs/zustand';

export default function ListFilter() {
  // Root State
  const { isOpen, modalType } = useModalStore();
  const { currentValue } = useFilterStore();

  const onPressDropDownBox = useCallback(() => {}, [isOpen, modalType]);

  const renderItem = useCallback(() => {
    switch (currentValue) {
      case 0:
        return <CurrentText>거리 순 ▼</CurrentText>;
      case 1:
        return <CurrentText>정확도 순 ▼</CurrentText>;
    }
  }, [currentValue]);

  return (
    <Wrapper>
      <ButtonBox onPress={onPressDropDownBox}>{renderItem()}</ButtonBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ButtonBox = styled(TouchableOpacity)``;

const CurrentText = styled(Text)`
  color: #949494;
`;
