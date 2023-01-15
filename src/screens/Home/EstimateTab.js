/**
 * Author : Ryan
 * Date : 2022-08-13
 * Desc : EstimateTab
 */

import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled, { css } from 'styled-components/native';
import { ESTIMATE_CHAT_TAB } from '@containers/data';
import PageHeader from '@components/Common/Header/PageHeader';
import GroupChannelListScreen from '@screens/GroupChannelListScreen';

export default function EstimateTabScreen({ navigation }) {
  // State
  const [focusedTab, setFocusedTab] = useState('ing');

  const onPressChangeTab = useCallback(
    tab => {
      setFocusedTab(tab);
    },
    [focusedTab],
  );

  return (
    <Wrapper>
      <HeaderBlock>
        <PageHeader tab="estimate" />
      </HeaderBlock>
      <TabBlock>
        {ESTIMATE_CHAT_TAB.map(item => (
          <TabBox
            key={item.id}
            attrFocused={item.tab === focusedTab}
            onPress={() => onPressChangeTab(item.tab)}
          >
            <TabText attrFocused={item.tab === focusedTab}>{item.name}</TabText>
          </TabBox>
        ))}
      </TabBlock>
      <ListBlock>{focusedTab === 'ing' ? <GroupChannelListScreen /> : null}</ListBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  flex: 1;
  background-color: white;
`;

const HeaderBlock = styled(View)`
  padding: 0 25px;
`;

const TabBlock = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  width: 100%;
  padding: 10px 25px 0 25px;
`;

const TabBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 30%;
  height: 45px;
  margin-right: 10px;
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

const ListBlock = styled(View)`
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;
