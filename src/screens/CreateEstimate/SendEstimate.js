/**
 * Author : Ryan
 * Date : 2022-08-24
 * Desc : SendEstimate
 */

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export default function SendEstimate() {
  return (
    <Wrapper>
      <ContentBlock>
        <IconText>📨</IconText>
        <DescriptionText>견적서가 전송되었습니다.</DescriptionText>
        <NoticeBox>
          <NoticeText>{'고객의 연락처는 대화 진행시\n견적상담 탭에서 확인 가능합니다.'}</NoticeText>
        </NoticeBox>
      </ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ContentBlock = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  height: 90%;
  padding: 0 25px;
`;
const IconText = styled(Text)`
  margin-bottom: 20px;
  ${({ theme }) => theme.fontSet(61, 400, 75)};
`;

const DescriptionText = styled(Text)`
  margin-bottom: 30px;
  ${({ theme }) => theme.fontSet(21, 700, 31)};
`;
const NoticeBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  padding: 25px;
  border-radius: 13px;
  background-color: #f6f6f6;
`;

const NoticeText = styled(Text)`
  text-align: center;
`;
