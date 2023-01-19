/**
 * Author : Ryan
 * Date : 2022-05-17
 * Desc : index
 */

import React from 'react';
import homeActive from '@asset/icons/navigation/home-active.svg';
import homeDeactive from '@asset/icons/navigation/home-deactive.svg';
import communityActive from '@asset/icons/navigation/community-active.svg';
import communityDeactive from '@asset/icons/navigation/community-deactive.svg';
import estimateActive from '@asset/icons/navigation/estimate-active.svg';
import estimateDeactive from '@asset/icons/navigation/estimate-deactive.svg';
import mypageActive from '@asset/icons/navigation/mypage-active.svg';
import mypageDeactive from '@asset/icons/navigation/mypage-deactive.svg';
import arrowRightFF from '@asset/icons/common/arrow-right-ff.svg';
import arrowRightBlack from '@asset/icons/common/arrow-right-black.svg';
import arrowLeftBlack from '@asset/icons/common/arrow-left-black.svg';
import arrowUpBlack from '@asset/icons/common/arrow-up-black.svg';
import arrowDownBlack from '@asset/icons/common/arrow-down-black.svg';
import closeXBlack from '@asset/icons/common/close-x-black.svg';
import headerSetting from '@asset/icons/common/header-setting.svg';
import check55 from '@asset/icons/common/check-55.svg';
import checkE1 from '@asset/icons/common/check-e1.svg';
import headerHomeAlert from '@asset/icons/home/header-home-alert.svg';
import uploadImage from '@asset/icons/createEstimate/upload-image.svg';
import estimatePreviewCheck from '@asset/icons/modal/estimate-preview-check.svg';
import estimatePreviewPercent from '@asset/icons/modal/estimate-preview-percent.svg';
import samsung from '@asset/icons/common/store-ss.svg';
import lg from '@asset/icons/common/store-lg.svg';
import electronic from '@asset/icons/common/store-el.svg';
import himart from '@asset/icons/common/store-hm.svg';
import permissionCamera from '@asset/icons/intro/permission-camera.svg';
import permissionGallery from '@asset/icons/intro/permission-gallery.svg';

const icons = {
  // 네비게이션 아이콘
  homeActive: homeActive,
  homeDeactive: homeDeactive,
  estimateActive: estimateActive,
  estimateDeactive: estimateDeactive,
  communityActive: communityActive,
  communityDeactive: communityDeactive,
  mypageActive: mypageActive,
  mypageDeactive: mypageDeactive,
  // common
  arrowRightFF: arrowRightFF,
  arrowRightBlack: arrowRightBlack,
  arrowLeftBlack: arrowLeftBlack,
  arrowUpBlack: arrowUpBlack,
  arrowDownBlack: arrowDownBlack,
  closeXBlack: closeXBlack,
  headerSetting: headerSetting,
  check55: check55,
  checkE1: checkE1,
  samsung: samsung,
  lg: lg,
  electronic: electronic,
  himart: himart,
  permissionCamera: permissionCamera,
  permissionGallery: permissionGallery,
  // Modal
  estimatePreviewCheck: estimatePreviewCheck,
  estimatePreviewPercent: estimatePreviewPercent,
  // Home
  headerHomeAlert: headerHomeAlert,
  // Create Estimate
  uploadImage: uploadImage,
};

export default function Icons({ icon, size, width, height, style, stroke }) {
  const Icon = icons[icon];
  if (Icon) {
    return <Icon width={width || size} height={height || size} style={style} stroke={stroke} />;
  }
  return null;
}
