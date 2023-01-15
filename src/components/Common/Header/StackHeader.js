/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : Stack Header
 */

import React, { useCallback } from 'react';
import { Platform, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useModalStore, useCreateEstimateStore, useSignUpStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';

export default function StackHeader({ type, navigation, route, title = null, prevStep }) {
  // Root State
  const { openModal } = useModalStore();
  const { estimateStep } = useCreateEstimateStore();
  const { signUpStep } = useSignUpStore();
  // Value
  const StatusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  const onPressGoBack = useCallback(() => {
    if (
      (route.name === 'createEstimate' && estimateStep !== 0) ||
      (route.name === 'signUp' && signUpStep !== 0)
    ) {
      prevStep();
    } else {
      navigation.goBack();
    }
  }, [route, estimateStep, signUpStep]);

  const onPressClose = useCallback(() => {
    if (route.name === 'createEstimate') {
      openModal('ESTIMATE_CONTINUE');
    } else {
      navigation.goBack();
    }
  }, [route]);

  return (
    <Wrapper>
      <EmptyStatusBar style={{ height: StatusBarHeight }} />
      <ContentBlock>
        {type === 'stack' || type === 'step' || type === 'setting' ? (
          <HeaderIconBox onPress={onPressGoBack}>
            <Icons icon={'arrowLeftBlack'} width={11} height={18} />
          </HeaderIconBox>
        ) : (
          <View style={{ width: 25 }} />
        )}
        {title !== null ? <TitleText>{title}</TitleText> : null}
        {type === 'stack' || type === 'popup' ? (
          <HeaderIconBox onPress={onPressClose}>
            <Icons icon={'closeXBlack'} size={18} />
          </HeaderIconBox>
        ) : type === 'setting' ? (
          <HeaderIconBox onPress={onPressClose}>
            <Icons icon={'headerSetting'} size={18} />
          </HeaderIconBox>
        ) : (
          <View style={{ width: 25 }} />
        )}
      </ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ContentBlock = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  height: 50px;
`;

const TitleText = styled(Text)`
  width: 70%;
  height: 30px;
  color: #474747;
  ${({ theme }) => theme.fontSet(20, 700, 29)};
  text-align: center;
`;

const HeaderIconBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 25px;
  height: 25px;
`;

const EmptyStatusBar = styled(View)`
  height: 40px;
`;
