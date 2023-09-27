/* eslint-disable @typescript-eslint/no-empty-function */
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { installPinia } from 'app/test/vitest/install-pinia';
import * as Quasar from 'quasar';
import { cards } from 'src/services/mockData';
import { describe, expect, it, vi } from 'vitest';
import CardActionBtn from '../CardActionBtn.vue';

installQuasarPlugin({
  plugins: {
    Dialog: Quasar.Dialog,
  },
});
installPinia({ stubActions: false, createSpy: vi.fn });

describe('CardActionBtn', () => {
  it('renders correctly', () => {
    const wrapper: VueWrapper<any> = mount(CardActionBtn, {
      props: {
        currentCard: {
          ...cards[0],
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Freeze Card');
    expect(wrapper.text()).toContain('Set Spend Limit');
    expect(wrapper.text()).toContain('Add to GPay');
    expect(wrapper.text()).toContain('Replace Card');
    expect(wrapper.text()).toContain('Cancel Card');
  });

  it('should emit event when button is clicked', async () => {
    const wrapper: VueWrapper<any> = mount(CardActionBtn, {
      props: {
        currentCard: {
          ...cards[0],
        },
      },
    });
    await wrapper.find('#freezeBtn').trigger('click');
    expect(wrapper.emitted('freezeCard')).toBeTruthy();
    await wrapper.find('#cancelBtn').trigger('click');
    expect(wrapper.emitted('cancelCard')).toBeTruthy();
  });
});
