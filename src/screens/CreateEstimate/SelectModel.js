/**
 * Author : Ryan
 * Date : 2022-08-17
 * Desc : SelectModel
 */

import React, { useCallback } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useCreateEstimateStore, useCallStore } from '@libs/zustand';
import StackTitle from '@components/Common/Title/StackTitle';
import { VARIATION_MODEL_TYPE } from '@containers/type';

export default function SelectModel() {
  // Root State
  const { selectedModel, setSelectedModel } = useCreateEstimateStore();
  const { callDetail } = useCallStore();

  const onChangeModelNameText = useCallback(
    (id, value) => {
      let copiedSelectedModel = [...selectedModel];
      copiedSelectedModel.length !== 0 && copiedSelectedModel.some(item => item.id === id)
        ? (copiedSelectedModel.filter(item => item.id === id)[0].modelName = value)
        : copiedSelectedModel.push({ id: id, modelName: value, tags: [], memo: '' });
      setSelectedModel(copiedSelectedModel);
    },
    [selectedModel],
  );

  // Render Item
  const renderSpecDetailItem = useCallback(
    item => {
      if (item.modelName) {
        return (
          <SpecDetailItemWrapper>
            <ProductText>{VARIATION_MODEL_TYPE[item.id]}</ProductText>
            <ModelText>{item.modelName}</ModelText>
            <InputModelName
              placeholder="(혹은 대체 모델명을 입력해 주세요)"
              onChangeText={value => onChangeModelNameText(item.id, value)}
            />
          </SpecDetailItemWrapper>
        );
      } else {
        return (
          <SpecDetailItemWrapper>
            <ProductText>{VARIATION_MODEL_TYPE[item.id]}</ProductText>
            <ModelText>{item.tags.join(' / ')}</ModelText>
            <InputModelName
              placeholder="(모델명을 입력해 주세요)"
              onChangeText={value => onChangeModelNameText(item.id, value)}
            />
          </SpecDetailItemWrapper>
        );
      }
    },
    [selectedModel, callDetail],
  );

  // Render List
  const renderSpecDetailList = useCallback(
    data => {
      return data.map(item => <View key={item.id}>{renderSpecDetailItem(item)}</View>);
    },
    [selectedModel, callDetail],
  );

  return (
    <Wrapper>
      <StackTitle title={'요청에 맞는 모델명을\n추가해 주세요'} option={false} />
      <NoticeBlock>
        <NoticeBox>
          <NoticeText>{'🙌  모델명 입력시 성공 확률이 높아져요'}</NoticeText>
        </NoticeBox>
      </NoticeBlock>
      <ContentBlock>{renderSpecDetailList(callDetail.category)}</ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled(ScrollView)``;

const NoticeBlock = styled(View)`
  margin: 10px 25px;
`;

const NoticeBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  background-color: #f6f6f6;
  width: 100%;
  height: 65px;
  padding: 0 25px;
  border-radius: 13px;
`;

const NoticeText = styled(Text)`
  color: #393939;
  ${({ theme }) => theme.fontSet(16, 400, 24)};
`;

const ContentBlock = styled(View)`
  padding: 35px 35px 100px 35px;
`;

const SpecDetailItemWrapper = styled(View)`
  margin-bottom: 70px;
`;

const ProductText = styled(Text)`
  color: #353942;
  ${({ theme }) => theme.fontSet(16, 700, 24)};
`;

const ModelText = styled(Text)`
  margin-top: 15px;
  color: #353942;
  ${({ theme }) => theme.fontSet(16, 300, 24)};
`;

const MessageText = styled(Text)`
  margin-top: 3px;
  color: #828793;
  ${({ theme }) => theme.fontSet(16, 400, 24)};
`;
const InputModelName = styled(TextInput)`
  margin-top: 15px;
  padding: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eaeaea;
  ${({ theme }) => theme.fontSet(16, 400, 24)};
`;
