/**
 * Author : Ryan
 * Date : 2022-09-17
 * Desc : useModalStore
 */

import create from 'zustand';

export const useModalStore = create(set => ({
  isOpen: false,
  modalType: 'UNSET',
  openModal: payload => set(() => ({ isOpen: true, modalType: payload })),
  closeModal: () => set(() => ({ isOpen: false, modalType: 'UNSET' })),
}));
