/**
 * Author : Ryan
 * Date : 2022-09-17
 * Desc : useEstimateStore
 */

import axios from 'axios';
import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCreateEstimateStore = create(set => ({
  estimateStep: 0,
  sequence: ['benefit', 'model', 'price', 'upload'],
  selectedBenefit: [],
  selectedModel: [],
  saletype: '',
  retailPrice: 0,
  price: 0,
  uploadImage: '',
  previewImage: '',
  selectedGift: ['', ''],
  initEstimateStep: () => set(() => ({ estimateStep: 0 })),
  setEstimateStep: payload => set({ estimateStep: payload }),
  nextEstimateStep: () => set(state => ({ estimateStep: state.step + 1 })),
  prevEstimateStep: () =>
    set(state => ({ estimateStep: state.estimateStep > 0 ? state.estimateStep - 1 : 0 })),
  setSelectedBenefit: payload => set({ selectedBenefit: payload }),
  setSelectedModel: (id, value) =>
    set(state =>
      state.selectedModel.length !== 0 && state.selectedModel.some(item => item.id === id)
        ? (state.selectedModel.filter(item => item.id === id)[0].modelName = value)
        : { selectedModel: state.selectedModel.concat({ id: id, modelName: value }) },
    ),
  setSaleType: payload => set({ saletype: payload }),
  setRetailPrice: payload => set({ retailPrice: payload }),
  setPrice: payload => set({ price: payload }),
  setUploadImage: payload => set({ uploadImage: payload }),
  setPreviewImage: payload => set({ previewImage: payload }),
  setSelectedGift: (index, value) => set(state => (state.selectedGift[index] = value)),
  addSelectedGift: () => set(state => state.selectedGift.push('')),
  deleteSelectedGift: payload =>
    set(state => ({
      selectedGift: state.selectedGift.filter((_, index) => index !== payload),
    })),
  // Fetch State
  isLoadingCreateEstimate: false,
  isFetchedCreateEstimate: false,
  hasErrorsCreateEstimate: false,
  // Fetch Function
  fetchCreateEstimate: async ({
    callId,
    gifts,
    card,
    giftCard,
    cashback,
    store,
    type,
    priceNormal,
    priceAvailable,
    products,
  }) => {
    set(() => ({ isLoadingCreateEstimate: true, isFetchedCreateEstimate: false }));
    const access = await AsyncStorage.getItem('access');
    try {
      const response = await axios.post(
        `https://api.vlpmcorp.com/dev/estimate`,
        {
          callId: callId,
          gifts: gifts,
          discounts: {
            card: card,
            giftcard: giftCard,
            cashback: cashback,
            store: store,
            type: type,
          },
          priceAvailable: priceAvailable,
          priceNormal: priceNormal,
          products: products,
        },
        {
          headers: {
            Authorization: access,
          },
        },
      );
      set(() => ({
        isLoadingCreateEstimate: false,
        isFetchedCreateEstimate: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        hasErrorsCreateEstimate: true,
        isLoadingCreateEstimate: false,
        isFetchedCreateEstimate: false,
      }));
    }
  },
  // Init
  initStore: () =>
    set({
      estimateStep: 0,
      sequence: ['benefit', 'model', 'price', 'upload'],
      selectedBenefit: [],
      selectedModel: [],
      saletype: '',
      retailPrice: 0,
      price: 0,
      uploadImage: '',
      previewImage: '',
      selectedGift: ['', ''],
      isLoadingCreateEstimate: false,
      isFetchedCreateEstimate: false,
      hasErrorsCreateEstimate: false,
    }),
  initEstimateError: () =>
    set({
      isLoadingCreateEstimate: false,
      isFetchedCreateEstimate: false,
      hasErrorsCreateEstimate: false,
    }),
}));

export const useUsingEstimateStore = create(set => ({
  // State
  id: null,
  tab: 'SENDED',
  // Set State
  setId: payload => set({ id: payload }),
  setTab: payload => set({ tab: payload }),
  // Async State
  usingEstimateList: null,
  isLoadingUsingEstimate: false,
  isFetchedUsingEstimate: false,
  hasErrorsUsingEstimate: false,
  errorMessage: null,
  // Fetch
  fetchUsingEstimate: async ({ type }) => {
    set(() => ({
      usingEstimateList: null,
      isLoadingUsingEstimate: true,
      isFetchedUsingEstimate: false,
    }));
    const access = await AsyncStorage.getItem('access');
    try {
      const response = await axios.get(`https://api.vlpmcorp.com/dev/estimate?state=${type}`, {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        usingEstimateList: response.data.result,
        isLoadingUsingEstimate: false,
        isFetchedUsingEstimate: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        hasErrorsUsingEstimate: true,
        isLoadingUsingEstimate: false,
        isFetchedUsingEstimate: false,
      }));
    }
  },
}));
