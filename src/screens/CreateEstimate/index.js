/**
 * Author : Ryan
 * Date : 2022-08-16
 * Desc : index
 */

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Dimensions, Animated, View, Text, Pressable, ActivityIndicator } from 'react-native';
import styled, { css } from 'styled-components/native';
import * as Progress from 'react-native-progress';
import { useModalStore, useCreateEstimateStore } from '@libs/zustand';
import StackHeader from '@components/Common/Header/StackHeader';
import ContinueModal from '@components/Modal/ContinueModal';
import SelectBenefit from './SelectBenefit';
import SelectModel from './SelectModel';
import SelectPrice from './SelectPrice';
import UploadImage from './UploadImage';
import SendEstimate from './SendEstimate';

export default function CreateEstimateScreen({ navigation, route }) {
  // Root State
  const { openModal } = useModalStore();
  const {
    estimateStep,
    sequence,
    selectedModel,
    setEstimateStep,
    prevEstimateStep,
    saletype,
    isLoadingCreateEstimate,
  } = useCreateEstimateStore();
  // State
  const [progress, setProgress] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // value
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onPressPrevStep = () => {
    fadeOut();
    setTimeout(() => {
      prevEstimateStep();
      fadeIn();
    }, 300);
  };

  const onPressNextStep = step => {
    fadeOut();
    setTimeout(() => {
      setEstimateStep(step);
      fadeIn();
    }, 300);
  };

  const onPressNextButton = useCallback(() => {
    switch (sequence[estimateStep]) {
      case 'benefit':
        onPressNextStep(1);
        break;
      case 'model':
        onPressNextStep(2);
        break;
      case 'price':
        onPressNextStep(3);
        break;
      case 'upload':
        openModal('ESTIMATE_PREVIEW');
        break;
    }
  }, [estimateStep, sequence]);

  useEffect(() => {
    setProgress(((estimateStep + 1) / sequence.length).toFixed(1));
  }, [progress, estimateStep]);

  useEffect(() => {
    switch (sequence[estimateStep]) {
      case 'benefit':
        if (saletype !== '') {
          setButtonDisabled(false);
          break;
        } else {
          setButtonDisabled(true);
          break;
        }
      case 'model':
        if (selectedModel[0]) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
    }
  }, [buttonDisabled, sequence, estimateStep, saletype, selectedModel]);

  // Render Content
  const renderButtonContent = useCallback(() => {
    switch (sequence[estimateStep]) {
      case 'benefit':
        return '다음';
      case 'model':
        return '다음';
      case 'price':
        return '다음';
      case 'upload':
        if (isLoadingCreateEstimate) {
          return <ActivityIndicator size="small" color="#557FE6" />;
        } else {
          return '완료';
        }
    }
  }, [estimateStep, sequence, isLoadingCreateEstimate]);

  // Render Item
  const renderContentItem = useCallback(() => {
    switch (sequence[estimateStep]) {
      case 'benefit':
        return <SelectBenefit />;
      case 'model':
        return <SelectModel />;
      case 'price':
        return <SelectPrice />;
      case 'upload':
        return <UploadImage navigation={navigation} />;
      case 'complete':
        return <SendEstimate />;
    }
  }, [estimateStep, sequence]);

  const renderButtonItem = useCallback(() => {
    return (
      <NextButtonBox
        style={{ width: screenWidth - 50 }}
        disabled={buttonDisabled}
        attrDisabled={buttonDisabled}
        onPress={onPressNextButton}
      >
        <NextButtonText textBreakStrategy="simple">{renderButtonContent()}</NextButtonText>
      </NextButtonBox>
    );
  }, [estimateStep, sequence, buttonDisabled, isLoadingCreateEstimate]);

  return (
    <>
      <ContinueModal navigation={navigation} />
      <Wrapper>
        <HeaderBlock>
          <StackHeader
            type="stack"
            navigation={navigation}
            route={route}
            prevStep={onPressPrevStep}
          />
        </HeaderBlock>
        <ProgressBlock>
          <Progress.Bar
            progress={Number(progress)}
            width={screenWidth - 40}
            height={4}
            borderWidth={0}
            animated={true}
            useNativeDriver={true}
            color={'#557FE6'}
            unfilledColor={'#F2F4F6'}
          />
        </ProgressBlock>
        <ContentBlock
          style={{
            opacity: fadeAnim,
            height: Platform.OS === 'ios' ? screenHeight - 131 : screenHeight - 132,
          }}
        >
          {renderContentItem()}
          {renderButtonItem()}
        </ContentBlock>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(View)`
  position: relative;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
`;

const ProgressBlock = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ContentBlock = styled(Animated.View)`
  position: relative;
`;

const NextButtonBox = styled(Pressable)`
  position: absolute;
  bottom: 30px;
  left: 5px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 60px;
  margin-left: 20px;
  border-radius: 14px;
  background-color: #557fe6;
  ${props =>
    props.attrDisabled &&
    css`
      background-color: #eee;
    `}
`;

const NextButtonText = styled(Text)`
  width: 100%;
  height: 26px;
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
  text-align: center;
`;
