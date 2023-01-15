/**
 * Author : Ryan
 * Date : 2022-08-16
 * Desc : StackTitle
 */

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export default function StackTitle({ title, description, option = false }) {
  return (
    <Wrapper>
      <TitleText>
        {title}
        {option ? <OptionText>{'  (선택)'}</OptionText> : null}
      </TitleText>
      {description ? <TitleDescription>{description}</TitleDescription> : null}
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  padding: 10px 25px;
  height: auto;
  background-color: white;
`;

const TitleText = styled(Text)`
  ${({ theme }) => theme.fontSet(25, 700, 35)};
`;

const OptionText = styled(Text)`
  color: #a8a8a8;
  ${({ theme }) => theme.fontSet(14, 300, 35)};
`;

const TitleDescription = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(15, 400, 26)};
`;
