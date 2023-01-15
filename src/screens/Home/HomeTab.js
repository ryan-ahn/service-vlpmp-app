/**
 * Author : Ryan
 * Date : 2022-08-13
 * Desc : HomeTab
 */

import React, { useCallback, useEffect } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { MAIN_SUMMARY_DATA, MAIN_ESTIMATE_RENDER_LIST } from '@containers/data';
import { useMypageStore, useUsingEstimateStore, useMainStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';
import PageHeader from '@components/Common/Header/PageHeader';

export default function HomeTab({ navigation }) {
  // Root State
  const { setId, noticeList, fetchNoticeList } = useMypageStore();
  const { callStatus, estimateStatus, fetchMainData } = useMainStore();
  const { setTab } = useUsingEstimateStore();
  // value
  const screenHeight = Dimensions.get('window').height;

  const onPressRouteToNewEstimate = useCallback(id => {
    setId(id);
    navigation.navigate('callList');
  }, []);

  const onPressRouteToNotice = useCallback(id => {
    setId(id);
    navigation.navigate('notice');
  }, []);

  const onPressRouteToResponseList = useCallback(tab => {
    setTab(tab);
    navigation.navigate('estimateList');
  }, []);

  useEffect(() => {
    fetchNoticeList();
    fetchMainData();
  }, []);

  // Render Item
  const renderSummaryItem = useCallback(() => {
    if (callStatus !== null) {
      return (
        <SummaryItemWrapper>
          <NewText>
            <NewData>{callStatus.total}</NewData>
            {` 명의 고객이\n견적을 기다리고 있어요`}
          </NewText>
          <FlexRowBox>
            <TodayText>
              {`오늘 신규 `}
              <TodayData>{callStatus.today}</TodayData>
              {`명`}
            </TodayText>
            <Icons icon={'arrowRightFF'} width={5} height={12} />
          </FlexRowBox>
        </SummaryItemWrapper>
      );
    } else {
      return (
        <SummaryItemWrapper>
          <ActivityIndicator size="large" color="#557FE6" />
        </SummaryItemWrapper>
      );
    }
  }, [callStatus]);

  const renderEstimateItem = useCallback(
    item => {
      if (estimateStatus !== null) {
        return (
          <EstimateItemWrapper
            attrborderBottom={item.borderBottom}
            onPress={() => onPressRouteToResponseList(item.tab)}
          >
            <FlexStartBox>
              <LabelImageBox>
                <LabelImage source={item.img} resizeMode="contain" />
              </LabelImageBox>
              <LabelText>{item.text}</LabelText>
            </FlexStartBox>
            <CountText>{`${estimateStatus[item.tab].count} 건`}</CountText>
          </EstimateItemWrapper>
        );
      } else {
        return (
          <EstimateItemWrapper>
            <ActivityIndicator size="large" color="#557FE6" />
          </EstimateItemWrapper>
        );
      }
    },
    [estimateStatus],
  );

  const renderNoticeItem = useCallback(
    item => {
      return (
        <NoticeItemWrapper>
          <NoticeTitleText numberOfLines={1} textBreakStrategy="simple">
            {item.title}
          </NoticeTitleText>
          <BottonBox onPress={() => onPressRouteToNotice(item.id)}>
            <ButtonText>보기</ButtonText>
          </BottonBox>
        </NoticeItemWrapper>
      );
    },
    [noticeList],
  );

  // Render List
  const renderEstimateList = useCallback(() => {
    return MAIN_ESTIMATE_RENDER_LIST.map(item => (
      <View key={item.id}>{renderEstimateItem(item)}</View>
    ));
  }, [estimateStatus]);

  const renderNoticeList = useCallback(() => {
    if (noticeList !== null) {
      return noticeList.map(item => <View key={item.id}>{renderNoticeItem(item)}</View>);
    }
  }, [noticeList]);

  return (
    <Wrapper style={{ height: Platform.OS === 'ios' ? screenHeight - 80 : screenHeight - 94 }}>
      <HeaderBlock>
        <PageHeader navigation={navigation} tab="home" />
      </HeaderBlock>
      <ContentBlock contentContainerStyle={{ paddingBottom: 20 }}>
        <SummaryBlock onPress={onPressRouteToNewEstimate}>{renderSummaryItem()}</SummaryBlock>
        <TitleBlock>
          <TitleText>진행중</TitleText>
        </TitleBlock>
        <MyEstimateBlock>{renderEstimateList()}</MyEstimateBlock>
        <TitleBlock>
          <TitleText>공지사항</TitleText>
        </TitleBlock>
        <NoticeBlock>{renderNoticeList()}</NoticeBlock>
      </ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  background-color: white;
`;

const HeaderBlock = styled(View)`
  padding: 0 25px;
  padding-bottom: 20px;
`;

const ContentBlock = styled(ScrollView)`
  padding: 0 25px 50px 25px;
`;

const SummaryItemWrapper = styled(View)`
  height: 110px;
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
`;
const FlexRowBox = styled(View)`
  margin-top: 30px;
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const SummaryBlock = styled(TouchableOpacity)`
  padding: 25px;
  border-radius: 13px;
  background-color: #3f6fcb;
`;

const NewText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(25, 700, 30)};
`;
const NewData = styled(Text)`
  color: #cbdcff;
  ${({ theme }) => theme.fontSet(25, 700, 30)};
`;

const TodayText = styled(Text)`
  margin-right: 15px;
  color: white;
  ${({ theme }) => theme.fontSet(14, 400, 20)};
`;
const TodayData = styled(Text)`
  color: #cbdcff;
  ${({ theme }) => theme.fontSet(14, 400, 20)};
`;

const TitleBlock = styled(View)`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 15px;
`;

const TitleText = styled(Text)`
  color: #525864;
  ${({ theme }) => theme.fontSet(22, 700, 30)};
`;

const MyEstimateBlock = styled(View)`
  border-radius: 13px;
  overflow: hidden;
`;

const EstimateItemWrapper = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  padding: 0 25px;
  border-bottom-color: #e5e5e5;
  background-color: #f7f7f7;
  height: 66px;
  ${props =>
    props.attrborderBottom &&
    css`
      border-bottom-width: 1px;
    `}
`;

const FlexStartBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const LabelImageBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 24px;
  height: 24px;
  margin-right: 15px;
  border-radius: 12px;
  background-color: #e5e5e5;
`;

const LabelImage = styled(Image)`
  width: 14px;
  height: 14px;
`;

const LabelText = styled(Text)`
  color: #393939;
  ${({ theme }) => theme.fontSet(15, 400, 20)};
`;

const CountText = styled(Text)`
  color: #393939;
  ${({ theme }) => theme.fontSet(15, 700, 20)};
`;

const NoticeBlock = styled(View)`
  padding-left: 10px;
`;

const NoticeItemWrapper = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  margin-bottom: 20px;
`;

const NoticeTitleText = styled(Text)`
  width: 77%;
  color: #adadad;
  ${({ theme }) => theme.fontSet(14, 400, 20)};
`;

const BottonBox = styled(TouchableOpacity)`
  padding: 8px 20px;
  border-radius: 6px;
  background-color: #f6f6f6;
`;

const ButtonText = styled(Text)`
  color: #525864;
  ${({ theme }) => theme.fontSet(13, 700, 20)};
`;
