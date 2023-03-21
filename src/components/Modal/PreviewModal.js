/**
 * Author : Ryan
 * Date : 2022-06-10
 * Desc : EstimateUpload
 */

import React, { useCallback, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useToast } from 'react-native-toast-notifications';
import { useModalStore, useCallStore, useCreateEstimateStore } from '@libs/zustand';
import { validationMillion } from '@libs/utils/validation';
import { ESTIMATE_PREVIEW_DATA, ESTIMATE_PREVIEW_LABEL, MODEL_TYPE } from '@containers/data';
import Icons from '@components/Common/Icons';

export default function PreviewModal({ navigation }) {
  // Root State
  const { isOpen, modalType, closeModal } = useModalStore();
  const { callDetail } = useCallStore();
  const {
    estimateStep,
    selectedModel,
    selectedBenefit,
    saletype,
    selectedGift,
    retailPrice,
    price,
    fetchCreateEstimate,
    isFetchedCreateEstimate,
    errorMessage,
    hasErrorsCreateEstimate,
    initEstimateError,
  } = useCreateEstimateStore();
  // Value
  const cardSale = selectedBenefit.some(item => item === 0);
  const giftCard = selectedBenefit.some(item => item === 1);
  const point = selectedBenefit.some(item => item === 2);
  const storeSale = selectedBenefit.some(item => item === 3);
  // Hooks
  const toast = useToast();

  const onPressSendEstimate = useCallback(() => {
    console.log(
      callDetail.id,
      selectedGift,
      cardSale,
      giftCard,
      point,
      storeSale,
      saletype,
      price,
      retailPrice,
      selectedModel,
    );
    fetchCreateEstimate({
      callId: callDetail.id,
      gifts: selectedGift,
      card: cardSale,
      giftCard: giftCard,
      cashback: point,
      store: storeSale,
      type: saletype,
      priceAvailable: price,
      priceNormal: retailPrice,
      products: selectedModel,
    });
  }, [
    estimateStep,
    callDetail,
    selectedGift,
    cardSale,
    giftCard,
    point,
    storeSale,
    saletype,
    price,
    retailPrice,
    selectedModel,
  ]);

  useEffect(() => {
    if (hasErrorsCreateEstimate) {
      toast.show(errorMessage);
      initEstimateError();
    }
  }, [hasErrorsCreateEstimate, errorMessage]);

  useEffect(() => {
    if (isFetchedCreateEstimate) {
      navigation.reset({ routes: [{ name: 'estimateComplete' }] });
    }
  }, [isFetchedCreateEstimate]);

  // Render Content
  const renderEstimateValue = useCallback(
    item => {
      switch (item) {
        case 'productList':
          return (
            <ValueRegularText>
              {selectedModel.length > 1
                ? `${MODEL_TYPE.filter(item => item.id === selectedModel[0].id)[0].name} 외 ${
                    selectedModel.length - 1
                  }종`
                : MODEL_TYPE.filter(item => item.id === selectedModel[0].id)[0].name}
            </ValueRegularText>
          );
        case 'cardSale':
          return <ValueRegularText>{cardSale ? '적용' : '미적용'}</ValueRegularText>;
        case 'giftCard':
          return <ValueRegularText>{giftCard ? '적용' : '미적용'}</ValueRegularText>;
        case 'point':
          return <ValueRegularText>{point ? '적용' : '미적용'}</ValueRegularText>;
        case 'saleType':
          return <ValueRegularText>{saletype ? saletype : '미적용'}</ValueRegularText>;
        case 'storeSale':
          return <ValueRegularText>{storeSale ? '적용' : '없음'}</ValueRegularText>;
        case 'price':
          return <ValueBoldText>{validationMillion(price)}</ValueBoldText>;
      }
    },
    [price, selectedBenefit, selectedModel, saletype],
  );

  // Render Item
  const renderEstimateItem = useCallback(item => {
    if (item.value !== 'price') {
      return (
        <RowBox>
          <LabelText>{item.label}</LabelText>
          <ValueBox>{renderEstimateValue(item.value)}</ValueBox>
        </RowBox>
      );
    } else {
      return (
        <RowBox>
          <LabelBox>
            <LabelLargeText>최대 혜택가</LabelLargeText>
            <Icons icon={'estimatePreviewPercent'} width={12} height={11} />
          </LabelBox>
          <ValueBox>{renderEstimateValue(item.value)}</ValueBox>
        </RowBox>
      );
    }
  });

  // Render List
  const renderEstimateList = useCallback(() => {
    return ESTIMATE_PREVIEW_LABEL.map(item => (
      <View key={item.id}>{renderEstimateItem(item)}</View>
    ));
  }, []);

  return (
    <Wrapper>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={isOpen && modalType === 'ESTIMATE_PREVIEW'}
      >
        <ModalView onTouchEnd={() => closeModal()}>
          <ContentBlock>
            <TitleTextBox>
              <TitleBoldText>{'견적서 미리보기'}</TitleBoldText>
            </TitleTextBox>
            <StoreInfoBox>
              <StoreText>{ESTIMATE_PREVIEW_DATA.store}</StoreText>
              <SalesPersonBox>
                <Icons icon={'estimatePreviewCheck'} width={14} height={14} />
                <SalesPersonText>{`인증 딜러 : ${ESTIMATE_PREVIEW_DATA.salesperson.name}`}</SalesPersonText>
                <SalesPersonRateText>{`${ESTIMATE_PREVIEW_DATA.salesperson.rate}(${ESTIMATE_PREVIEW_DATA.salesperson.deal})`}</SalesPersonRateText>
              </SalesPersonBox>
            </StoreInfoBox>
            <PreviewListBox>{renderEstimateList()}</PreviewListBox>
            <ButtonBox onPress={onPressSendEstimate}>
              <ButtonText>발송하기</ButtonText>
            </ButtonBox>
          </ContentBlock>
        </ModalView>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ModalView = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-end', 'row')};
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ContentBlock = styled(View)`
  width: 100%;
  padding: 10px 25px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const TitleTextBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e5;
`;

const TitleBoldText = styled(Text)`
  ${({ theme }) => theme.fontSet(22, 700, 33)};
`;

const StoreInfoBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
  padding: 15px 0;
  margin-bottom: 10px;
  background-color: white;
`;

const StoreText = styled(Text)`
  ${({ theme }) => theme.fontSet(21, 700, 31)};
`;

const SalesPersonBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  margin-top: 10px;
`;

const SalesPersonText = styled(Text)`
  margin-left: 5px;
  color: #adadad;
  ${({ theme }) => theme.fontSet(12, 400, 17)};
`;

const SalesPersonRateText = styled(Text)`
  margin-left: 5px;
  color: #adadad;
  ${({ theme }) => theme.fontSet(12, 700, 17)};
`;

const PreviewListBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  background-color: white;
`;

const RowBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
  margin-bottom: 20px;
`;

const ValueBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-end', 'center', 'row')};
`;

const LabelText = styled(Text)`
  color: #676767;
  ${({ theme }) => theme.fontSet(15, 400, 21)};
`;

const ValueRegularText = styled(Text)`
  ${({ theme }) => theme.fontSet(15, 400, 21)};
`;

const ValueBoldText = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(15, 700, 21)};
`;

const DividingLine = styled(View)`
  margin: 25px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ededed;
`;

const LabelBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
`;

const LabelLargeText = styled(Text)`
  margin-right: 5px;
  color: #676767;
  ${({ theme }) => theme.fontSet(15, 700, 21)};
`;

const ButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 60px;
  margin: 10px 0 20px 0;
  border-radius: 14px;
  background-color: #557fe6;
`;
const ButtonText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;
