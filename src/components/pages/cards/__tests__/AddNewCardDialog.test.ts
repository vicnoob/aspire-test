/* eslint-disable @typescript-eslint/no-empty-function */
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { installPinia } from 'app/test/vitest/install-pinia';
import * as Quasar from 'quasar';
import { useCardStore } from 'src/stores/cards';
import { describe, expect, it, vi } from 'vitest';
import AddNewCardDialog from '../AddNewCardDialog.vue';

installQuasarPlugin({
  plugins: {
    Dialog: Quasar.Dialog,
  },
});
installPinia({ stubActions: false, createSpy: vi.fn });

describe('AddNewCardDialog', () => {
  it('renders correctly', () => {
    const wrapper: VueWrapper<any> = mount(AddNewCardDialog, {});

    expect(wrapper.exists()).toBe(true);
  });

  it('dispatch store.addNewCard when addCard is called', async () => {
    const wrapper: VueWrapper<any> = mount(AddNewCardDialog, {});

    const cardStore = useCardStore();
    wrapper.vm.cardStore = cardStore;
    cardStore.getCards();
    await wrapper.vm.$nextTick();
    const originalLength = cardStore.cards.length;
    await wrapper.vm.addCard();

    expect(cardStore.addNewCard).toHaveBeenCalled();
    expect(wrapper.emitted('update:model-value')).toBeTruthy();
    expect(cardStore.cards.length).toBe(originalLength + 1);
  });

  it('should emit update:model-value when toggleDialog is called', () => {
    const wrapper: VueWrapper<any> = mount(AddNewCardDialog, {});

    wrapper.vm.toggleDialog();
    expect(wrapper.emitted('update:model-value')).toBeTruthy();
  });
});
