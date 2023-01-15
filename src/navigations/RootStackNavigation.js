/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : stackNavigation
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeBottomNavigation from '@navigations/HomeBottomNavigation';
import Intro from '@screens/Intro';
import Notice from '@screens/Notice';
import CallList from '@screens/CallList';
import CallDetail from '@screens/CallDetail';
import EstimateList from '@screens/EstimateList';
import CreateEstimate from '@screens/CreateEstimate';
import EditMyInfo from '@screens/EditMyInfo';
import EstimateComplete from '@screens/Complete/EstimateComplete';
import GroupChannelCreateScreen from '@screens/GroupChannelCreateScreen';
import GroupChannelListScreen from '@screens/GroupChannelListScreen';
import GroupChannelScreen from '@screens/GroupChannelScreen';

export default function RootStackNavigation() {
  // Hooks
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'home'}>
      <Stack.Screen
        name={'home'}
        component={HomeBottomNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'intro'}
        component={Intro}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'notice'}
        component={Notice}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'callList'}
        component={CallList}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'callDetail'}
        component={CallDetail}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'estimateList'}
        component={EstimateList}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'createEstimate'}
        component={CreateEstimate}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'editMyInfo'}
        component={EditMyInfo}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'estimateComplete'}
        component={EstimateComplete}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'groupChannelCreate'}
        component={GroupChannelCreateScreen}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'groupChannelList'}
        component={GroupChannelListScreen}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
      <Stack.Screen
        name={'groupChannel'}
        component={GroupChannelScreen}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
    </Stack.Navigator>
  );
}
