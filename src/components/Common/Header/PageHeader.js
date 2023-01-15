/**
 * Author : Ryan
 * Date : 2022-05-21
 * Desc : Page
 */

import React, { useCallback } from 'react';
import { View, Platform, Text } from 'react-native';
import styled, { css } from 'styled-components';
import Icons from '@components/Common/Icons';

export default function Page({ navigation, tab }) {
  const renderLeftItem = useCallback(() => {
    switch (tab) {
      case 'home':
        return (
          <TitleText attrFontSize={tab === 'home'}>
            VLPM<TitleTextLight>partners</TitleTextLight>
          </TitleText>
        );
      case 'estimate':
        return <TitleText>견적상담</TitleText>;
      case 'mypage':
        return <TitleText>마이페이지</TitleText>;
    }
  }, [tab]);

  const renderRightItem = useCallback(() => {
    switch (tab) {
      case 'home':
        return <Icons icon={'headerHomeAlert'} size={22} />;
      case 'estimate':
        return <></>;
      case 'mypate':
        return <></>;
    }
  }, [tab]);

  return (
    <Wrapper ios={Platform.OS === 'ios'}>
      <LeftTitleBox>{renderLeftItem()}</LeftTitleBox>
      <RightIconBox>{renderRightItem()}</RightIconBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-end', 'row')};
  height: 65px;
  ${props =>
    props.ios &&
    css`
      height: 100px;
    `}
`;

const LeftTitleBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  height: 30px;
`;

const RightIconBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  height: 30px;
`;

const TitleText = styled(Text)`
  width: 250px;
  color: #b1b8bf;
  ${({ theme }) => theme.fontSet(25, 700, 30)};
  ${props =>
    props.attrFontSize &&
    css`
      ${({ theme }) => theme.fontSet(27, 700, 32)};
    `}
`;

const TitleTextLight = styled(Text)`
  color: #b1b8bf;
  ${({ theme }) => theme.fontSet(21, 300, 30)};
`;
