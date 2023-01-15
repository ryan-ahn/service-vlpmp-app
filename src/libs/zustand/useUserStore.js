/**
 * Author : Ryan
 * Date : 2022-09-17
 * Desc : useUserStore
 */

import axios from 'axios';
import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create(set => ({
  // State
  userDetail: null,
  userLoggedIn: false,
  // Set State
  setUserDetail: payload => set({ userDetail: payload }),
  setUserLoggedIn: payload => set({ userLoggedIn: payload }),
  // Async State
  errorMessage: '',
  isLoadingSignIn: false,
  isLoadingSessionCheck: false,
  isFetchedSignIn: false,
  isFetchedSessionCheck: false,
  hasErrorsSignIn: false,
  hasErrorsSessionCheck: false,
  // Fetch
  fetchSignIn: async ({ email, password }) => {
    set(() => ({ isLoadingSignIn: true, isFetchedSignIn: false }));
    try {
      const response = await axios.post('https://api.vlpmcorp.com/dev/auth/signin', {
        email: email,
        password: password,
      });
      await AsyncStorage.setItem('access', response.data.accessToken);
      set(() => ({
        userDetail: response.data.user,
        isLoadingSignIn: false,
        isFetchedSignIn: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        hasErrorsSignIn: true,
        isLoadingSignIn: false,
        isFetchedSignIn: false,
      }));
    }
  },
  fetchSessionCheck: async () => {
    set(() => ({ isLoadingSessionCheck: true, isFetchedSessionCheck: false }));
    const access = await AsyncStorage.getItem('access');
    try {
      const response = await axios.get('https://api.vlpmcorp.com/dev/auth/check', {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        userDetail: response.data.user,
        isLoadingSessionCheck: false,
        isFetchedSessionCheck: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        hasErrorsSessionCheck: true,
        isLoadingSessionCheck: false,
        isFetchedSessionCheck: false,
      }));
    }
  },
  // Init
  initSignInState: () =>
    set({
      userDetail: null,
      userLoggedIn: false,
      isLoadingSignIn: false,
      isFetchedSignIn: false,
      hasErrorsSignIn: false,
    }),
  initSignInError: () => {
    set({
      errorMessage: '',
      hasErrorsSignIn: false,
    });
  },
}));

export const useSignUpStore = create(set => ({
  signUpStep: 0,
  email: '',
  password: '',
  repassword: '',
  name: '',
  birth: '',
  number: '',
  brand: '',
  store: '',
  address: '',
  detailAddress: '',
  telNumber: '',
  initSignUpStep: () => set(() => ({ signUpStep: 0 })),
  setSignUpStep: payload => set({ signUpStep: payload }),
  prevSignUpStep: () =>
    set(state => ({ signUpStep: state.signUpStep > 0 ? state.signUpStep - 1 : 0 })),
  setEmail: payload => set({ email: payload }),
  setPassword: payload => set({ password: payload }),
  setRepassword: payload => set({ repassword: payload }),
  setName: payload => set({ name: payload }),
  setBirth: payload => set({ birth: payload }),
  setNumber: payload => set({ number: payload }),
  setBrand: payload => set({ brand: payload }),
  setStore: payload => set({ store: payload }),
  setAddress: payload => set({ address: payload }),
  setDetailAddress: payload => set({ detailAddress: payload }),
  setTelNumber: payload => set({ telNumber: payload }),
  // Async State
  checkedEmail: null,
  errorMessage: '',
  isLoadingSignUp: false,
  isLoadingCheckEmail: false,
  isFetchedSignUp: false,
  isFetchedCheckEmail: false,
  hasErrorsSignUp: false,
  hasErrorsCheckEmail: false,
  // Fetch
  fetchSignUp: async ({
    email,
    password,
    name,
    contact,
    birth,
    brand,
    store,
    address,
    telNumber,
  }) => {
    set(() => ({ isLoadingSignUp: true, isFetchedSignUp: false }));
    try {
      const response = await axios.post('https://api.vlpmcorp.com/dev/auth/signup', {
        type: 'partner',
        email: email,
        password: password,
        name: name,
        contact: contact,
        birth: birth,
        store: {
          brand: brand,
          name: store,
          address: address,
          contact: telNumber,
        },
      });
      set(() => ({
        isLoadingSignUp: false,
        isFetchedSignUp: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        hasErrorsSignUp: true,
        isLoadingSignUp: false,
        isFetchedSignUp: false,
      }));
    }
  },
  fetchCheckEmail: async ({ email }) => {
    set(() => ({ isLoadingCheckEmail: true, isFetchedCheckEmail: false }));
    try {
      const response = await axios.post('https://api.vlpmcorp.com/dev/auth/check-email', {
        email: email,
      });
      set(() => ({
        checkedEmail: response.data,
        isLoadingCheckEmail: false,
        isFetchedCheckEmail: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        hasErrorsCheckEmail: true,
        isLoadingCheckEmail: false,
        isFetchedCheckEmail: false,
      }));
    }
  },
  // Init
  initSignUpStore: () =>
    set({
      signUpStep: 0,
      email: '',
      password: '',
      repassword: '',
      name: '',
      birth: '',
      number: '',
      brand: '',
      store: '',
      address: '',
      detailAddress: '',
      telNumber: '',
      errorMessage: '',
      isLoadingSignUp: false,
      isFetchedSignUp: false,
      hasErrorsSignUp: false,
    }),
  initSignUpError: () => {
    set({
      errorMessage: '',
      hasErrorsSignUp: false,
    });
  },
  initCheckEmailError: () => {
    set({
      checkedEmail: null,
      errorMessage: '',
      hasErrorsCheckEmail: false,
    });
  },
}));
