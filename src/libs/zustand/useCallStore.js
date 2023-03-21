/**
 * Author : Ryan
 * Date : 2022-09-17
 * Desc : useRequestStore
 */

import create from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCallStore = create(set => ({
  callDetail: null,
  setCallDetail: payload => set({ callDetail: payload }),
  // Fetch State
  callList: null,
  isLoadingCall: false,
  isFetchedCall: false,
  hasErrorsCall: false,
  // Fetch Function
  fetchCallList: async day => {
    set(() => ({ isLoadingCall: true, isFetchedCall: false }));
    const access = await AsyncStorage.getItem('access');
    try {
      const response = await axios.get(`https://api.vlpmcorp.com/dev/call?day=1`, {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        callList: response.data.result,
        isLoadingCall: false,
        isFetchedCall: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.Message,
        hasErrorsCall: true,
        isLoadingCall: false,
        isFetchedCall: false,
      }));
    }
  },
}));
