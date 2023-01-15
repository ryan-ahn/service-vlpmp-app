/**
 * Author : Ryan
 * Date : 2022-09-12
 * Desc : index
 */

import React, { useState, useCallback } from 'react';
import {
  Platform,
  Dimensions,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import styled from 'styled-components/native';
import { MYINFO_MENU_LIST, MYINFO_DATA } from '@containers/data';
import StackHeader from '@components/Common/Header/StackHeader';

export default function EditMyInfoScreen({ navigation, route }) {
  // State
  const [intro, setIntro] = useState('');
  // value
  const screenHeight = Dimensions.get('window').height;

  const onChangeToggleSwitch = useCallback(id => {
    // fetch
  }, []);

  const onPressUpdate = useCallback(id => {
    // fetch
  }, []);

  // Render Item
  const renderMenuItem = useCallback(
    item => {
      switch (item.type) {
        case 'input':
          return (
            <MenuItemWrapper>
              <LabelText>{item.label}</LabelText>
              <InputBox>
                <InputText>
                  {item.value === 'store_name' ? MYINFO_DATA.store.name : MYINFO_DATA[item.value]}
                </InputText>
                {item.edit ? (
                  <UpdateButtonBox onPress={() => onPressUpdate(item.id)}>
                    <UpdateButtonText>업데이트</UpdateButtonText>
                  </UpdateButtonBox>
                ) : null}
              </InputBox>
            </MenuItemWrapper>
          );
        case 'textarea':
          return (
            <MenuItemWrapper>
              <LabelText>{item.label}</LabelText>
              <TextAreaBox
                value={item.intro}
                multiline={true}
                numberOfLines={5}
                onChangeText={text => setIntro(text)}
              />
            </MenuItemWrapper>
          );
        case 'radio':
          return (
            <MenuItemWrapper>
              <LabelText>{item.label}</LabelText>
              <InputBox>
                <InputText>{item.description}</InputText>
                <Switch
                  value={MYINFO_DATA[item.value]}
                  thumbColor={'white'}
                  trackColor={{ true: '#557FE6', false: '#F3F3F3' }}
                  onValueChange={() => onChangeToggleSwitch(item.id)}
                ></Switch>
              </InputBox>
            </MenuItemWrapper>
          );
      }
    },
    [intro],
  );

  // Render List
  const renderMenuList = useCallback(() => {
    return MYINFO_MENU_LIST.map(item => <View key={item.id}>{renderMenuItem(item)}</View>);
  }, []);

  return (
    <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight : screenHeight - 24 }}>
      <HeaderBlock>
        <StackHeader type="step" title={'내 정보 수정'} navigation={navigation} route={route} />
      </HeaderBlock>
      <MenuBlock>{renderMenuList()}</MenuBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  background-color: white;
  padding-bottom: 50px;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
`;

const MenuBlock = styled(ScrollView)`
  padding: 25px;
`;

const MenuItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  margin-bottom: 25px;
`;

const LabelText = styled(Text)`
  ${({ theme }) => theme.fontSet(18, 500, 26)};
`;

const InputBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-end', 'row')};
  width: 100%;
  height: 45px;
  padding-bottom: 6px;
  border-bottom-width: 1px;
  border-bottom-color: #f6f6f7;
`;

const InputText = styled(Text)`
  color: #9b9b9b;
  ${({ theme }) => theme.fontSet(17, 300, 25)};
`;

const UpdateButtonBox = styled(TouchableOpacity)`
  background-color: #f2f4f6;
  padding: 8px 15px;
  border-radius: 6px;
`;

const UpdateButtonText = styled(Text)`
  color: #525864;
  ${({ theme }) => theme.fontSet(13, 700, 19)};
`;

const TextAreaBox = styled(TextInput)`
  width: 100%;
  height: 110px;
  padding: 20px;
  margin-top: 15px;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
`;
