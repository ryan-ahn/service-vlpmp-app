/**
 * Author : Ryan
 * Date : 2022-08-28
 * Desc : SelectBrand
 */

import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { SIGNUP_BRAND_LIST } from '@containers/data';
import { useSignUpStore } from '@libs/zustand';
import StackTitle from '@components/Common/Title/StackTitle';
import Icons from '@components/Common/Icons';

export default function SelectBrand({ onPressNextButton }) {
  // Root State
  const { setBrand } = useSignUpStore();

  const onPressSelectBrand = useCallback(brand => {
    setBrand(brand);
    onPressNextButton();
  }, []);

  // Render Item
  const renderBrandItem = useCallback(item => {
    return (
      <BrandItemWrapper key={item.id} onPress={() => onPressSelectBrand(item.brand)}>
        <BrandIconBox attrSvg={item.svg}>
          <Icons icon={item.svg} width={30} height={19} />
        </BrandIconBox>
        <BrandText>{item.name}</BrandText>
      </BrandItemWrapper>
    );
  }, []);

  // Render List
  const renderBrandList = useCallback(() => {
    return SIGNUP_BRAND_LIST.map(item => renderBrandItem(item));
  }, []);

  return (
    <Wrapper>
      <TitleBox>
        <PartnersText>파트너스</PartnersText>
        <StackTitle title={'지점 브랜드를 선택해 주세요'} />
      </TitleBox>
      <BrandListBox>{renderBrandList()}</BrandListBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const TitleBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
`;

const PartnersText = styled(Text)`
  margin-top: 10px;
  padding: 0 25px;
  color: #557fe6;
  ${({ theme }) => theme.fontSet(18, 700, 25)};
`;

const BrandListBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  flex-wrap: wrap;
  padding: 25px;
`;

const BrandItemWrapper = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  width: 48%;
  height: 200px;
  margin-bottom: 30px;
  border-radius: 22px;
  background-color: #f2f4f6;
`;

const BrandIconBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 42px;
  height: 42px;
  margin-bottom: 25px;
  border-radius: 21px;
  ${props =>
    props.attrSvg === 'samsung' &&
    css`
      background-color: #3a67bf;
    `}
  ${props =>
    props.attrSvg === 'lg' &&
    css`
      background-color: #f34e4e;
    `}
    ${props =>
    props.attrSvg === 'himart' &&
    css`
      background-color: #ff1c1c;
    `}
    ${props =>
    props.attrSvg === 'electronic' &&
    css`
      background-color: #2e2f3a;
    `}
`;

const BrandText = styled(Text)`
  ${({ theme }) => theme.fontSet(22, 400, 32)};
`;
