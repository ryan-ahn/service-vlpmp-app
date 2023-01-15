/**
 * Author : Ryan
 * Date : 2022-08-15
 * Desc : StackTab
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export default function StackTab({ list, focusedTab, onChangeFocusedTab }) {
  return (
    <Wrapper>
      {list.map(item => (
        <TabBox
          key={item.id}
          attrLength={100 / list.length - 4}
          attrFocused={item.tab === focusedTab}
          onPress={() => onChangeFocusedTab(item.tab)}
        >
          <TabText attrFocused={item.tab === focusedTab}>{item.text}</TabText>
        </TabBox>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
  height: 45px;
  background-color: white;
`;

const TabBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: ${props => props.attrLength + '%'};
  height: 100%;
  ${props =>
    props.attrFocused &&
    css`
      border-bottom-width: 4px;
      border-bottom-color: #557fe6;
    `}
`;

const TabText = styled(Text)`
  color: #b1b8bf;
  ${({ theme }) => theme.fontSet(16, 700, 20)};
  ${props =>
    props.attrFocused &&
    css`
      color: black;
    `}
`;
