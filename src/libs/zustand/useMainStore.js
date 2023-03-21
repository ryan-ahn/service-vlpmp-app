/**
 * Author : Ryan
 * Date : 2022-09-17
 * Desc : useMainStore
 */

import create from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useMainStore = create(set => ({
  // Async State
  callStatus: null,
  mainNotice: null,
  estimateStatus: null,
  isLoadingMainData: false,
  isFetchedMainData: false,
  hasErrorsMainData: false,
  errorMessage: null,
  // Fetch Function
  fetchMainData: async () => {
    set(() => ({ isLoadingMainData: true, isFetchedMainData: false }));
    const access = await AsyncStorage.getItem('access');
    try {
      const response = await axios.get(`https://api.vlpmcorp.com/dev/main/partner`, {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        callStatus: response.data.callStatus,
        estimateStatus: response.data.estimateStatus,
        mainNotice: response.data.notice,
        isLoadingMainData: false,
        isFetchedMainData: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.Message,
        hasErrorsMainData: true,
        isLoadingMainData: false,
        isFetchedMainData: false,
      }));
    }
  },
}));
