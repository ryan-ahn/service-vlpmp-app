/**
 * Author : Ryan
 * Date : 2022-11-05
 * Desc : index
 */

import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSendbirdChat, createGroupChannelFragment } from '@sendbird/uikit-react-native';

const GroupChannelFragment = createGroupChannelFragment();

export default function GroupChannelScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { sdk } = useSendbirdChat();
  const channel = sdk.groupChannel.buildGroupChannelFromSerializedData(params.serializedChannel);

  return (
    <GroupChannelFragment
      channel={channel}
      onChannelDeleted={() => {
        // Navigate to GroupChannelList function.
        navigation.navigate('groupChannelList');
      }}
      onPressHeaderLeft={() => {
        // Go back to the previous screen.
        navigation.goBack();
      }}
      // onPressHeaderRight={() => {
      //   // Navigate to GroupChannelSettings function.
      //   navigation.navigate('groupChannelSettings', {
      //     serializedChannel: params.serializedChannel,
      //   });
      // }}
    />
  );
}
