/**
 * Author : Ryan
 * Date : 2022-08-17
 * Desc : UploadImage
 */

import React, { useCallback } from 'react';
import { View, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useModalStore, useCreateEstimateStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';
import StackTitle from '@components/Common/Title/StackTitle';
import UploadModal from '@components/Modal/UploadModal';
import PreviewModal from '@components/Modal/PreviewModal';

export default function UploadImage({ navigation }) {
  // Root State
  const { openModal } = useModalStore();
  const { previewImage, selectedGift, setSelectedGift, addSelectedGift, deleteSelectedGift } =
    useCreateEstimateStore();

  const onPressImageUpload = useCallback(() => {
    openModal('ESTIMATE_UPLOAD');
  }, []);

  const onChangeGiftNameText = useCallback(
    (text, index) => {
      setSelectedGift(index, text);
    },
    [selectedGift],
  );

  const onPressAddGift = useCallback(() => {
    addSelectedGift();
  }, [selectedGift]);

  const onPressDeleteGift = useCallback(
    index => {
      deleteSelectedGift(index);
    },
    [selectedGift],
  );

  // Render Item
  const renderGiftItem = useCallback(
    (_, index) => {
      return (
        <GiftItemWrapper>
          <GiftTextInput
            placeholder="(예: 전자레인지)"
            onChangeText={text => onChangeGiftNameText(text, index)}
          />
          <DeleteButtonBox onPress={() => onPressDeleteGift(index)}>
            <DeleteButtonText>-</DeleteButtonText>
          </DeleteButtonBox>
        </GiftItemWrapper>
      );
    },
    [selectedGift],
  );

  // Render List
  const renderGiftList = useCallback(
    data => {
      return data.map((item, index) => <View key={index}>{renderGiftItem(item, index)}</View>);
    },
    [selectedGift],
  );

  return (
    <Wrapper>
      <UploadModal />
      <PreviewModal navigation={navigation} />
      {/* <StackTitle title={'견적서 업로드'} option={true} /> */}
      {/* <ImageBlock>
        <IconBox onPress={onPressImageUpload}>
          <Icons icon={'uploadImage'} size={58} />
        </IconBox>
        {previewImage ? (
          <PreviewImage
            source={{
              uri: previewImage,
            }}
          />
        ) : null}
      </ImageBlock> */}
      <StackTitle title={'사은품 추가'} option={true} />
      <GiftBlock>{renderGiftList(selectedGift)}</GiftBlock>
      <ButtonBlock>
        <AddButtonBox onPress={onPressAddGift}>
          <AddButtonText>+</AddButtonText>
        </AddButtonBox>
      </ButtonBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ImageBlock = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  padding: 10px 25px 50px 25px;
`;

const IconBox = styled(TouchableOpacity)`
  margin-right: 10px;
`;

const PreviewImage = styled(Image)`
  width: 58px;
  height: 58px;
  margin-right: 10px;
  border-radius: 10px;
`;

const GiftBlock = styled(View)`
  padding: 0 25px;
`;

const GiftItemWrapper = styled(View)`
  position: relative;
`;

const GiftTextInput = styled(TextInput)`
  margin-top: 15px;
  padding: 5px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eaeaea;
  ${({ theme }) => theme.fontSet(16, 400, 24)};
`;

const ButtonBlock = styled(View)`
  padding: 25px;
`;

const AddButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 50px;
  background-color: #eaeaea;
  border-radius: 6px;
`;

const AddButtonText = styled(Text)`
  ${({ theme }) => theme.fontSet(40, 100, 50)};
`;

const DeleteButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('flex-end', 'center', 'row')};
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
`;

const DeleteButtonText = styled(Text)`
  ${({ theme }) => theme.fontSet(50, 100, 50)};
  text-align: center;
`;
