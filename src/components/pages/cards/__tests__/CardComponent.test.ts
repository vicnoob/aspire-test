/* eslint-disable @typescript-eslint/no-empty-function */
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { installPinia } from 'app/test/vitest/install-pinia';
import * as Quasar from 'quasar';
import { cards } from 'src/services/mockData';
import { describe, expect, it, vi } from 'vitest';
import CardComponent from '../CardComponent.vue';

installQuasarPlugin({
  plugins: {
    Dialog: Quasar.Dialog,
  },
});
installPinia({ stubActions: false, createSpy: vi.fn });

describe('CardComponent', () => {
  it('renders correctly', () => {
    const wrapper: VueWrapper<any> = mount(CardComponent, {});

    expect(wrapper.exists()).toBe(true);
  });

  it('change value isCardNumberVisible  when button show card number is clicked', async () => {
    const wrapper: VueWrapper<any> = mount(CardComponent, {
      props: {
        card: {
          ...cards[0],
        },
      },
    });
    wrapper.vm.isCardNumberVisible = false;
    expect(
      wrapper.find('.card-wrapper__card__show-card-number').text()
    ).toContain('Show card number');
    const originalIsCardNumberVisible = wrapper.vm.isCardNumberVisible;
    wrapper.find('.card-wrapper__card__show-card-number').trigger('click');

    expect(originalIsCardNumberVisible).toBe(!wrapper.vm.isCardNumberVisible);
    await wrapper.vm.$nextTick();
    expect(
      wrapper.find('.card-wrapper__card__show-card-number').text()
    ).toContain('Hide card number');
  });
});
