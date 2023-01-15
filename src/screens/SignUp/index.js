/**
 * Author : Ryan
 * Date : 2022-07-31
 * Desc : index
 */

import React, { useRef, useEffect, useCallback } from 'react';
import { Animated, Dimensions, View, Pressable, Text } from 'react-native';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { useToast } from 'react-native-toast-notifications';
import { useSignUpStore } from '@libs/zustand';
import {
  EMAIL_REGEX,
  PW_REGEX,
  NAME_REGEX,
  BIRTH_REGEX,
  MOBILE_REGEX,
} from '@libs/utils/verification';
import StackHeader from '@components/Common/Header/StackHeader';
import InputEmail from './InputEmail';
import InputName from './InputName';
import InputBirth from './InputBirth';
import InputNumber from './InputNumber';
import SelectBrand from './SelectBrand';
import InputStore from './InputStore';
import InputAddress from './InputAddress';
import InputTelNumber from './InputTelNumber';

export default function SignUpScreen({ navigation, route }) {
  // Root State
  const {
    signUpStep,
    prevSignUpStep,
    setSignUpStep,
    email,
    password,
    repassword,
    name,
    birth,
    number,
    brand,
    store,
    address,
    detailAddress,
    telNumber,
    fetchSignUp,
    errorMessage,
    isFetchedSignUp,
    hasErrorsSignUp,
    initSignUpStore,
    initSignUpError,
  } = useSignUpStore();
  // Value
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  // Hooks
  const toast = useToast();

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
      prevSignUpStep();
      fadeIn();
    }, 300);
  };

  const onPressNextStep = step => {
    fadeOut();
    setTimeout(() => {
      setSignUpStep(step);
      fadeIn();
    }, 300);
  };

  const onPressSignUp = useCallback(async () => {
    fetchSignUp({
      email: email,
      password: password,
      name: name,
      contact: number,
      birth: birth,
      brand: brand,
      store: store,
      address: address,
      telNumber: telNumber,
    });
  }, [email, password, name, number, brand, store, address, telNumber]);

  const onPressNextButton = useCallback(() => {
    switch (signUpStep) {
      case 0:
        onPressNextStep(1);
        break;
      case 1:
        onPressNextStep(2);
        break;
      case 2:
        onPressNextStep(3);
        break;
      case 3:
        onPressNextStep(4);
        break;
      case 4:
        onPressNextStep(5);
        break;
      case 5:
        onPressNextStep(6);
        break;
      case 6:
        onPressNextStep(7);
        break;
      case 7:
        onPressSignUp();
        break;
    }
  }, [
    signUpStep,
    email,
    password,
    name,
    birth,
    number,
    brand,
    store,
    address,
    detailAddress,
    telNumber,
  ]);

  useEffect(() => {
    if (hasErrorsSignUp) {
      toast.show(errorMessage);
      initSignUpError();
    }
  }, [hasErrorsSignUp, errorMessage]);

  useEffect(() => {
    if (isFetchedSignUp) {
      navigation.reset({ routes: [{ name: 'signUpComplete', params: name }] });
    }
  }, [isFetchedSignUp]);

  // Render Content
  const renderButtonContent = useCallback(() => {
    if (signUpStep === 7) {
      return '회원가입';
    } else {
      return '다음';
    }
  }, [
    signUpStep,
    email,
    password,
    name,
    birth,
    number,
    brand,
    store,
    address,
    detailAddress,
    telNumber,
  ]);

  // Render Item
  const renderContentItem = useCallback(() => {
    switch (signUpStep) {
      case 0:
        return <InputEmail />;
      case 1:
        return <InputName />;
      case 2:
        return <InputBirth />;
      case 3:
        return <InputNumber />;
      case 4:
        return <SelectBrand onPressNextButton={onPressNextButton} />;
      case 5:
        return <InputStore />;
      case 6:
        return <InputAddress navigation={navigation} />;
      case 7:
        return <InputTelNumber />;
    }
  }, [
    signUpStep,
    email,
    password,
    name,
    birth,
    number,
    brand,
    store,
    address,
    detailAddress,
    telNumber,
  ]);

  const renderButtonItem = useCallback(() => {
    switch (signUpStep) {
      case 0:
        return (
          <NextButtonBox
            style={{ width: screenWidth - 50 }}
            attrDisabled={
              EMAIL_REGEX.test(email) === false ||
              PW_REGEX.test(password) === false ||
              password !== repassword
            }
            disabled={
              EMAIL_REGEX.test(email) === false ||
              PW_REGEX.test(password) === false ||
              password !== repassword
            }
            onPress={onPressNextButton}
          >
            <NextButtonText textBreakStrategy="simple">{renderButtonContent()}</NextButtonText>
          </NextButtonBox>
        );
      case 1:
        return (
          <NextButtonBox
            style={{ width: screenWidth - 50 }}
            attrDisabled={NAME_REGEX.test(name) === false}
            disabled={NAME_REGEX.test(name) === false}
            onPress={onPressNextButton}
          >
            <NextButtonText textBreakStrategy="simple">{renderButtonContent()}</NextButtonText>
          </NextButtonBox>
        );
      case 2:
        return (
          <NextButtonBox
            style={{ width: screenWidth - 40 }}
            keyboardType="number-pad"
            attrDisabled={BIRTH_REGEX.test(birth) === false}
            disabled={BIRTH_REGEX.test(birth) === false}
            onPress={onPressNextButton}
          >
            <NextButtonText textBreakStrategy="simple">{renderButtonContent()}</NextButtonText>
          </NextButtonBox>
        );
      case 3:
        return (
          <NextButtonBox
            style={{ width: screenWidth - 40 }}
            keyboardType="number-pad"
            attrDisabled={MOBILE_REGEX.test(number) === false}
            disabled={MOBILE_REGEX.test(number) === false}
            onPress={onPressNextButton}
          >
            <NextButtonText textBreakStrategy="simple">{renderButtonContent()}</NextButtonText>
          </NextButtonBox>
        );
      case 5:
        return (
          <NextButtonBox
            style={{ width: screenWidth - 40 }}
            attrDisabled={store.length < 3}
            disabled={store.length < 3}
            onPress={onPressNextButton}
          >
            <NextButtonText textBreakStrategy="simple">{renderButtonContent()}</NextButtonText>
          </NextButtonBox>
        );
      case 6:
        return (
          <NextButtonBox
            style={{ width: screenWidth - 40 }}
            attrDisabled={address.length < 3}
            disabled={address.length < 3}
            onPress={onPressNextButton}
          >
            <NextButtonText textBreakStrategy="simple">{renderButtonContent()}</NextButtonText>
          </NextButtonBox>
        );
      case 7:
        return (
          <NextButtonBox
            style={{ width: screenWidth - 40 }}
            attrDisabled={telNumber.length < 9}
            disabled={telNumber.length < 9}
            onPress={onPressNextButton}
          >
            <NextButtonText textBreakStrategy="simple">{renderButtonContent()}</NextButtonText>
          </NextButtonBox>
        );
    }
  }, [
    signUpStep,
    email,
    password,
    repassword,
    name,
    birth,
    number,
    brand,
    store,
    address,
    detailAddress,
    telNumber,
  ]);

  return (
    <Wrapper>
      <HeaderBlock>
        <StackHeader
          type={'step'}
          navigation={navigation}
          route={route}
          prevStep={onPressPrevStep}
        />
      </HeaderBlock>
      <ContentBlock
        style={{
          opacity: fadeAnim,
          height: Platform.OS === 'ios' ? screenHeight - 97 : screenHeight - 98,
        }}
      >
        {renderContentItem()}
        {renderButtonItem()}
      </ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  position: relative;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
`;

const ContentBlock = styled(Animated.View)`
  position: relative;
`;

const NextButtonBox = styled(Pressable)`
  position: absolute;
  bottom: 30px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 60px;
  margin-left: 20px;
  border-radius: 14px;
  background-color: #557fe6;
  ${props =>
    props.attrDisabled &&
    css`
      background-color: #eeeeee;
    `}
`;

const NextButtonText = styled(Text)`
  width: 100%;
  height: 26px;
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
  text-align: center;
`;
