/**
 * Author : Ryan
 * Date : 2022-08-15
 * Desc : index
 */

import React, { useState, useCallback } from 'react';
import { Dimensions, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { validationMillion } from '@libs/utils/validation';
import { useCreateEstimateStore, useCallStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';
import { CALL_DETAIL_LABEL, CALL_OPTION_LABEL, CALL_NOTICE_TEXT } from '@containers/data';
import { VARIATION_BRAND_TYPE, VARIATION_MODEL_TYPE } from '@containers/type';
import StackHeader from '@components/Common/Header/StackHeader';
import NewEstimateModal from '@components/Modal/NewEstimateModal';

export default function CallDetailScreen({ navigation, route }) {
  // Root State
  const { callDetail } = useCallStore();
  console.log(callDetail);
  const { initStore } = useCreateEstimateStore();
  // State
  const [openToggleId, setOpenToggleId] = useState(null);
  // value
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const onPressOpenToggle = useCallback(
    id => {
      if (openToggleId === id) {
        setOpenToggleId(null);
      } else {
        setOpenToggleId(id);
      }
    },
    [openToggleId],
  );

  const onPressRouteToStack = useCallback(() => {
    initStore();
    navigation.navigate('createEstimate');
  }, []);

  // Render Content
  const renderRequestTypeContent = useCallback(
    item => {
      switch (item.type) {
        case 'brand':
          return (
            <LegularText>
              {`😀 `}
              <BoldText>{`${VARIATION_BRAND_TYPE[item.brand]} 브랜드`}</BoldText>
              {`로 요청 주셨어요`}
            </LegularText>
          );
        case 'budget':
          return (
            <LegularText>
              {`😀 예산 `}
              <BoldText>{`${validationMillion(item.budget)}`}</BoldText>
              {`으로 요청 주셨어요`}
            </LegularText>
          );
        case 'model':
          return (
            <LegularText>
              {`😀 `}
              <BoldText>{`모델명`}</BoldText>
              {`으로 요청 주셨어요`}
            </LegularText>
          );
      }
    },
    [callDetail],
  );

  const renderValueContent = useCallback(
    item => {
      switch (item.labelType) {
        case 'category':
          return <ValueText>{`${callDetail.category.length} 품목`}</ValueText>;
        case 'budget':
          return <ValueText>{`${validationMillion(callDetail.budget)}`}</ValueText>;
        case 'purpose':
          return <ValueText>{`${callDetail.purpose}`}</ValueText>;
        case 'address':
          return <ValueText>{`${callDetail.address}`}</ValueText>;
        case 'upload':
          return <ValueText>{`${callDetail.uploadImage ? '있음' : '없음'}`}</ValueText>;
        case 'message':
          return <ValueText numberOfLines={1}>{`${callDetail.memo ? '있음' : '없음'}`}</ValueText>;
      }
    },
    [callDetail],
  );

  // Render Item
  const renderSpecItem = useCallback(
    item => {
      return (
        <SpecItemWrapper>
          {item.toggle ? (
            <>
              <LabelTouchableBox onPress={() => onPressOpenToggle(item.id)}>
                <LabelText>{item.label}</LabelText>
                {openToggleId === item.id ? (
                  <Icons icon={'arrowUpBlack'} size={10} />
                ) : (
                  <Icons icon={'arrowDownBlack'} size={10} />
                )}
              </LabelTouchableBox>
            </>
          ) : (
            <LabelBox>
              <LabelText>{item.label}</LabelText>
            </LabelBox>
          )}
          <ValueBox>{renderValueContent(item)}</ValueBox>
        </SpecItemWrapper>
      );
    },
    [openToggleId],
  );

  const renderSpecDetailItem = useCallback(item => {
    if (item.modelName) {
      return (
        <SpecDetailItemWrapper>
          <LabelText>{VARIATION_MODEL_TYPE[item.id]}</LabelText>
          <NameText>{item.modelName}</NameText>
        </SpecDetailItemWrapper>
      );
    } else {
      return (
        <SpecDetailItemWrapper>
          <LabelText>{VARIATION_MODEL_TYPE[item.id]}</LabelText>
          <FlexColumnBox>
            <FlexRowBox>
              {item.tags.map((tagItem, index) => (
                <TagText key={index}>{`${tagItem}${
                  index !== item.tags.length - 1 ? ' / ' : ''
                }`}</TagText>
              ))}
            </FlexRowBox>
            <TagMessageText>{item.tags.memo ? item.tags.memo : '(메세지가 없음)'}</TagMessageText>
          </FlexColumnBox>
        </SpecDetailItemWrapper>
      );
    }
  }, []);

  const renderOptionItem = useCallback(
    item => {
      return (
        <OptionItemWrapper>
          <LabelBox>
            {callDetail.etc[item.labelType] ? (
              <Icons icon={'check55'} size={14} />
            ) : (
              <Icons icon={'checkE1'} size={14} />
            )}
            <LabelText style={{ marginLeft: 10 }}>{item.label}</LabelText>
          </LabelBox>
        </OptionItemWrapper>
      );
    },
    [callDetail],
  );

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
  const renderSpecList = useCallback(
    data => {
      return data.map(item =>
        item.id === openToggleId ? (
          <View key={item.id}>
            <LMarginBox>{renderSpecItem(item)}</LMarginBox>
            <DetailBox>{renderSpecDetailList(callDetail)}</DetailBox>
          </View>
        ) : (
          <View key={item.id}>
            <LMarginBox>{renderSpecItem(item)}</LMarginBox>
          </View>
        ),
      );
    },
    [openToggleId],
  );

  const renderSpecDetailList = useCallback(
    data => {
      switch (openToggleId) {
        case 0:
          return data.category.map(item => <View key={item.id}>{renderSpecDetailItem(item)}</View>);
        case 4:
          if (data.fileUrl) {
            return (
              <DetailImage
                style={{ width: '100%', minHeight: 150 }}
                resizeMode="contain"
                source={{
                  uri: fileUrl,
                }}
              />
            );
          } else {
            return <DetailText>첨부한 견적서가 없습니다.</DetailText>;
          }
        case 5:
          if (data.memo) {
            return <DetailText>{data.memo}</DetailText>;
          } else {
            return <DetailText>입력한 메모가 없습니다.</DetailText>;
          }
      }
    },
    [openToggleId],
  );

  const renderOptionList = useCallback(
    data => {
      return data.map(item => <View key={item.id}>{renderOptionItem(item)}</View>);
    },
    [callDetail],
  );

  const renderNoticeList = useCallback(data => {
    return data.map(item => <View key={item.id}>{renderNoticeItem(item)}</View>);
  }, []);

  return (
    <>
      <NewEstimateModal navigation={navigation} />
      <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight : screenHeight - 24 }}>
        <HeaderBlock>
          <StackHeader
            type="popup"
            title="견적 요청서 상세"
            navigation={navigation}
            route={route}
          />
        </HeaderBlock>
        <ContentBlock>
          <SMarginBox>
            <RequestTypeBox>{renderRequestTypeContent(callDetail)}</RequestTypeBox>
          </SMarginBox>
          <RequestSpecBox>{renderSpecList(CALL_DETAIL_LABEL)}</RequestSpecBox>
          <LMarginBox>
            <OptionArea>{renderOptionList(CALL_OPTION_LABEL)}</OptionArea>
          </LMarginBox>
          <NoticeBlock>{renderNoticeList(CALL_NOTICE_TEXT)}</NoticeBlock>
        </ContentBlock>
        <ButtonBlock
          style={{ width: screenWidth }}
          disabled={callDetail.tags === []}
          attrDisabled={callDetail.tags === []}
          onPress={onPressRouteToStack}
        >
          <ButtonText>{callDetail.tags !== [] ? '견적서 작성하기' : '이미 작성한 견적'}</ButtonText>
        </ButtonBlock>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(View)``;

const HeaderBlock = styled(View)`
  padding: 0 20px;
`;

const ContentBlock = styled(ScrollView)`
  padding: 25px 0 50px 0;
`;

const RequestTypeBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  background-color: #f6f6f6;
  width: 100%;
  height: 65px;
  padding: 0 25px;
  border-radius: 13px;
`;

const RequestSpecBox = styled(View)`
  padding: 15px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f6f6f6;
`;

const OptionArea = styled(View)`
  padding: 15px 0px 50px 0;
`;

const SMarginBox = styled(View)`
  padding: 0 25px;
`;

const LMarginBox = styled(View)`
  padding: 0 35px;
`;

const DetailBox = styled(View)`
  height: auto;
  padding: 20px 35px;
  background-color: #f6f6f6;
`;

const DetailImage = styled(Image)``;

const DetailText = styled(Text)`
  color: #828793;
  ${({ theme }) => theme.fontSet(14, 400, 25)};
`;

const LegularText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 400, 20)};
`;

const BoldText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 700, 20)};
`;

const ValueText = styled(Text)`
  width: 150px;
  ${({ theme }) => theme.fontSet(16, 500, 24)};
  text-align: right;
`;

const SpecItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  height: 55px;
`;

const LabelTouchableBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const LabelBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const LabelText = styled(Text)`
  margin-right: 8px;
  ${({ theme }) => theme.fontSet(16, 400, 20)};
`;

const ValueBox = styled(View)``;

const SpecDetailItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'row')};
  padding: 10px 0px;
`;

const FlexColumnBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-end', 'column')};
  width: 70%;
`;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-end', 'flex-start', 'row')};
  width: 100%;
`;

const NameText = styled(Text)`
  ${({ theme }) => theme.fontSet(16, 400, 24)};
`;

const TagText = styled(Text)`
  color: #353942;
  ${({ theme }) => theme.fontSet(16, 400, 24)};
`;

const TagMessageText = styled(Text)`
  color: #828793;
  ${({ theme }) => theme.fontSet(14, 400, 26)};
  text-align: right;
`;

const OptionItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  height: 55px;
`;

const NoticeBlock = styled(View)`
  background-color: #f6f6f6;
  padding: 45px 35px 150px 35px;
  text-align: left;
`;

const NoticetItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  margin-bottom: 20px;
`;

const NoticeTitleText = styled(Text)`
  margin-bottom: 10px;
  color: #9b9ea8;
  ${({ theme }) => theme.fontSet(14, 500, 20)};
`;

const FlexRowStartBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'row')};
`;

const NoticeContentText = styled(Text)`
  color: #9b9ea8;
  ${({ theme }) => theme.fontSet(13, 400, 18)};
`;

const ButtonBlock = styled(TouchableOpacity)`
  position: absolute;
  bottom: 0;
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'row')};
  height: 95px;
  padding-top: 20px;
  border-top-left-radius: 26px;
  border-top-right-radius: 26px;
  background-color: #557fe6;
  ${props =>
    props.attrDisabled &&
    css`
      background-color: #eeeeee;
    `}
`;

const ButtonText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(18, 500, 26)};
`;
