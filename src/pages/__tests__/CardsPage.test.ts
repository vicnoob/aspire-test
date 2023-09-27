/* eslint-disable @typescript-eslint/no-empty-function */
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import BalanceComponent from 'components/pages/cards/BalanceComponent.vue';
import CardActionBtn from 'components/pages/cards/CardActionBtn.vue';
import * as Quasar from 'quasar';
import { cards } from 'src/services/mockData';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CardsPage from '../CardsPage.vue';
import { installPinia } from 'app/test/vitest/install-pinia';

installQuasarPlugin({
  plugins: {
    Dialog: Quasar.Dialog,
  },
});
installPinia({ stubActions: false, createSpy: vi.fn });

describe('CardsPage', () => {
  beforeEach(() => {
    vi.spyOn(Quasar, 'useQuasar').mockReturnValue({
      screen: {
        lt: {
          lg: true,
        },
        setSizes: () => {},
      },
    });
  });
  it('renders correctly mobile view', () => {
    const wrapper = mount(CardsPage, {});

    expect(wrapper.exists()).toBe(true);

    expect(wrapper.find('.card-page__overview-title-text').text()).toBe(
      'Account balance'
    );
    expect(wrapper.findComponent(BalanceComponent).exists()).toBe(true);
  });

  it('should trigger freeze card', async () => {
    const createSpy = vi.spyOn(Quasar.Dialog, 'create');

    const wrapper = mount(CardsPage);
    wrapper.vm.cardSliderRef = {
      currentCard: cards[0],
    };
    await wrapper.vm.$nextTick();

    wrapper.findComponent(CardActionBtn).vm.$emit('freezeCard');
    wrapper.vm.onFreezeChange();
    expect(wrapper.findComponent(CardActionBtn).emitted);

    expect(createSpy).toHaveBeenCalled();
  });

  it('shows a confirmation dialog when freeze card', async () => {
    vi.spyOn(Quasar.Dialog, 'create');

    const wrapper = mount(CardsPage, {});
    wrapper.vm.cardSliderRef = {
      currentCard: {
        ...cards[0],
      },
    };

    wrapper.vm.onFreezeChange();

    expect(Quasar.Dialog.create).toHaveBeenCalledWith({
      title: 'Confirmation',
      message: 'Are you sure you want to freeze this card?',
      ok: {
        label: 'OK',
        color: 'primary',
      },
      cancel: {
        label: 'Cancel',
        color: 'grey',
      },
    });
  });

  it('shows a confirmation dialog when unfreeze card', async () => {
    vi.spyOn(Quasar.Dialog, 'create');

    const wrapper = mount(CardsPage, {});
    wrapper.vm.cardSliderRef = {
      currentCard: {
        ...cards[0],
        status: 'inactive',
      },
    };

    wrapper.vm.onFreezeChange();

    expect(Quasar.Dialog.create).toHaveBeenCalledWith({
      title: 'Confirmation',
      message: 'Are you sure you want to unfreeze this card?',
      ok: {
        label: 'OK',
        color: 'primary',
      },
      cancel: {
        label: 'Cancel',
        color: 'grey',
      },
    });
  });

  it('shows a confirmation dialog when cancel card', async () => {
    vi.spyOn(Quasar.Dialog, 'create');

    const wrapper = mount(CardsPage, {});
    wrapper.vm.cardSliderRef = {
      currentCard: {
        ...cards[0],
        status: 'inactive',
      },
    };

    wrapper.vm.onCancelCard();

    expect(Quasar.Dialog.create).toHaveBeenCalledWith({
      title: 'Confirmation',
      message:
        'Are you sure you want to cancel this card? This can not be undone',
      ok: {
        label: 'OK',
        color: 'primary',
      },
      cancel: {
        label: 'Cancel',
        color: 'grey',
      },
    });
  });
});
