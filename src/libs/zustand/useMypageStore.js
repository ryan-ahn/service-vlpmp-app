/**
 * Author : Ryan
 * Date : 2022-09-17
 * Desc : useMypageStore
 */

import create from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useMypageStore = create(set => ({
  id: null,
  setId: payload => set({ id: payload }),
  // Async State
  noticeList: null,
  isLoadingNoticeList: false,
  isFetchedNoticeList: false,
  hasErrorsNoticeList: false,
  errorMessage: null,
  // Fetch Function
  fetchNoticeList: async () => {
    set(() => ({ isLoadingNoticeList: true, isFetchedNoticeList: false }));
    const access = await AsyncStorage.getItem('access');
    try {
      const response = await axios.get(`https://api.vlpmcorp.com/dev/notice`, {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        noticeList: response.data.result,
        isLoadingNoticeList: false,
        isFetchedNoticeList: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.Message,
        hasErrorsNoticeList: true,
        isLoadingNoticeList: false,
        isFetchedNoticeList: false,
      }));
    }
  },
}));
