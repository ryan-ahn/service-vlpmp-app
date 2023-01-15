/**
 * Author : Ryan
 * Date : 2022-05-22
 * Desc : SmallBanner
 */

import React from 'react';
import { AppRegistry, Image, View } from 'react-native';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';
import mainBanner1 from '@asset/dummy/dummy1.png';

export default function SmallBanner() {
  return (
    <Swiper
      autoplay={true}
      autoplayTimeout={7}
      showsPagination={true}
      paginationStyle={{ bottom: 5 }}
      dotColor={'#999'}
      dotStyle={{ width: 5, height: 5 }}
      activeDotColor={'white'}
      activeDotStyle={{ width: 5, height: 5 }}
    >
      <SwiperImageBox>
        <SwiperImage source={mainBanner1} />
      </SwiperImageBox>
      <SwiperImageBox>
        <SwiperImage source={mainBanner1} />
      </SwiperImageBox>
      <SwiperImageBox>
        <SwiperImage source={mainBanner1} />
      </SwiperImageBox>
    </Swiper>
  );
}

const SwiperImageBox = styled(View)`
  width: 100%;
  height: 100%;
  background-color: #3a66bf;
`;
const SwiperImage = styled(Image)`
  width: 356px;
  height: 100px;
`;
