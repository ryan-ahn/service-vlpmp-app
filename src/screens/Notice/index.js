/**
 * Author : Ryan
 * Date : 2022-08-14
 * Desc : index
 */

import React, { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useMypageStore } from '@libs/zustand';
import { validationCreateAt } from '@libs/utils/validation';
import Icons from '@components/Common/Icons';
import StackHeader from '@components/Common/Header/StackHeader';

export default function NoticeScreen({ navigation, route }) {
  // Root State
  const { id, setId, noticeList, fetchNoticeList } = useMypageStore();

  const onPressSetId = useCallback(
    selectedId => {
      // selectedId로 디테일 데이터 패치
      setId(selectedId);
    },
    [id],
  );

  useEffect(() => {
    fetchNoticeList();
  }, []);

  // Render Item
  const renderTitleItem = useCallback(
    item => {
      return (
        <TitleItemWrapper onPress={() => onPressSetId(item.id)}>
          <TitleText numberOfLines={1} textBreakStrategy="simple">
            {item.title}
          </TitleText>
          <Icons icon={'arrowUpBlack'} width={16} height={10} />
        </TitleItemWrapper>
      );
    },
    [id],
  );

  const renderDetailItem = useCallback(
    item => {
      return (
        <>
          <TitleItemWrapper>
            <TitleText numberOfLines={1} textBreakStrategy="simple">
              {item.title}
            </TitleText>
            <Icons icon={'arrowDownBlack'} width={16} height={10} />
          </TitleItemWrapper>
          <ContentBox>
            <ContentText>{item.content}</ContentText>
            <CreateDate>{validationCreateAt(item.createdAt)}</CreateDate>
          </ContentBox>
        </>
      );
    },
    [id],
  );

  // Render List
  const renderList = useCallback(() => {
    if (noticeList !== null) {
      return noticeList.map(item =>
        item.id === id ? (
          <View key={item.id}>{renderDetailItem(item)}</View>
        ) : (
          <View key={item.id}>{renderTitleItem(item)}</View>
        ),
      );
    }
  }, [noticeList, id]);

  return (
    <Wrapper>
      <HeaderBlock>
        <StackHeader type="step" title="공지사항" navigation={navigation} route={route} />
      </HeaderBlock>
      <ListBlock>{renderList()}</ListBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const HeaderBlock = styled(View)`
  padding: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f2f3f4;
`;

const ListBlock = styled(View)``;

const TitleItemWrapper = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  width: 100%;
  height: 86px;
  padding: 0 25px;
  border-bottom-width: 1px;
  border-bottom-color: #f2f3f4;
`;

const TitleText = styled(Text)`
  width: 85%;
  ${({ theme }) => theme.fontSet(16, 400, 22)};
`;

const ContentBox = styled(View)`
  padding: 25px;
  background-color: #f2f3f4;
`;

const ContentText = styled(Text)`
  color: #474747;
  ${({ theme }) => theme.fontSet(13, 400, 18)};
`;

const CreateDate = styled(Text)`
  margin-top: 10px;
  color: #adadad ${({ theme }) => theme.fontSet(13, 400, 18)};
`;
