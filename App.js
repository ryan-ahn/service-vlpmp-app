/**
 * Author : Ryan
 * Date : 2022-08-13
 * Desc : App
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setCustomText } from 'react-native-global-props';
import { ToastProvider } from 'react-native-toast-notifications';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import {
  SendbirdUIKitContainer,
  createNativeClipboardService,
  createNativeFileService,
  createNativeMediaService,
  createNativeNotificationService,
} from '@sendbird/uikit-react-native';
import { LightUIKitTheme, createTheme } from '@sendbird/uikit-react-native-foundation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import CameraRoll from '@react-native-community/cameraroll';
import RNFBMessaging from '@react-native-firebase/messaging';
import Video from 'react-native-video';
import * as DocumentPicker from 'react-native-document-picker';
import * as FileAccess from 'react-native-file-access';
import * as ImagePicker from 'react-native-image-picker';
import * as Permissions from 'react-native-permissions';
import * as CreateThumbnail from 'react-native-create-thumbnail';
import RootStackNavigation from '@navigations/RootStackNavigation';
import AuthStackNavigation from '@navigations/AuthStackNavigation';
import { useUserStore } from '@libs/zustand';
import theme from '@styles/theme';

export default function App() {
  // Root State
  const { userLoggedIn, userDetail, isFetchedSignIn, setUserLoggedIn, fetchSessionCheck } =
    useUserStore();
  // Hooks
  const myCustomDarkTheme = createTheme({
    colors: palette => ({
      ...LightUIKitTheme.colors,
      primary: '#557FE6',
      secondary: palette.secondary200,
      error: palette.error200,
      background: 'white',
      text: palette.onBackgroundDark01,
    }),
  });
  const ClipboardService = createNativeClipboardService(Clipboard);
  const NotificationService = createNativeNotificationService({
    messagingModule: RNFBMessaging,
    permissionModule: Permissions,
  });
  const FileService = createNativeFileService({
    fsModule: FileAccess,
    permissionModule: Permissions,
    imagePickerModule: ImagePicker,
    mediaLibraryModule: CameraRoll,
    documentPickerModule: DocumentPicker,
  });
  const MediaService = createNativeMediaService({
    VideoComponent: Video,
    thumbnailModule: CreateThumbnail,
  });
  // Default Style
  const customTextProps = {
    style: {
      color: '#242830',
      fontSize: 14,
      letterSpacing: -0.1,
    },
  };
  setCustomText(customTextProps);

  const userSession = async () => {
    try {
      const value = await AsyncStorage.getItem('access');
      if (value !== null) {
        setUserLoggedIn(true);
        fetchSessionCheck();
      }
    } catch (e) {
      setUserLoggedIn(false);
    }
  };

  useEffect(() => {
    userSession();
  }, [isFetchedSignIn]);

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    } catch (e) {}
  }, []);

  return (
    <SendbirdUIKitContainer
      styles={{ theme: myCustomDarkTheme }}
      appId={'92262BE9-0B2F-41B8-8E54-9CEB7966D5F5'}
      chatOptions={{ localCacheStorage: AsyncStorage }}
      platformServices={{
        file: FileService,
        notification: NotificationService,
        clipboard: ClipboardService,
        media: MediaService,
      }}
    >
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <ToastProvider placement="top" offsetTop={50} duration={3000}>
            <StatusBar animated={true} barStyle="dark-content" />
            <NavigationContainer>
              {userLoggedIn ? <RootStackNavigation /> : <AuthStackNavigation />}
            </NavigationContainer>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </SendbirdUIKitContainer>
  );
}
