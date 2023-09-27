<template>
  <q-layout class="app-layout" view="lHh Lpr lFf">
    <q-drawer :width="340" class="app-layout__drawer" show-if-above bordered>
      <FullLogo class="app-layout__drawer__logo" />
      <div class="app-layout__drawer__description">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </div>
      <q-list>
        <q-item
          v-for="tab of tabs"
          :key="tab.id"
          class="app-layout__drawer__item"
          exact-active-class="app-layout__footer__tab--active"
          content-class="app-layout__footer__tab__content"
          exact
          :to="tab.to"
        >
          <component
            class="app-layout__drawer__item__logo"
            :is="tab.logo"
          ></component>
          {{ tab.label }}
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="app-layout__footer">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        active-bg-color="white"
        class="app-layout__footer__tabs"
      >
        <q-route-tab
          v-for="tab of tabs"
          :key="tab.id"
          exact
          :to="tab.to"
          class="app-layout__footer__tab"
          exact-active-class="app-layout__footer__tab--active"
          content-class="app-layout__footer__tab__content"
          :ripple="false"
        >
          <component :is="tab.logo" />
          <span class="app-layout__footer__tab__content__label">
            {{ tab.label }}
          </span>
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import Logo from 'assets/Logo.svg';
import Account from 'assets/Account.svg';
import Cards from 'assets/Cards.svg';
import Credit from 'assets/Credit.svg';
import Payments from 'assets/Payments.svg';
import FullLogo from 'assets/FullLogo.svg';
import { ref } from 'vue';

const tabs = ref([
  {
    id: 1,
    to: '/home',
    label: 'Home',
    logo: Logo,
  },
  {
    id: 2,
    to: '/',
    label: 'Cards',
    logo: Cards,
  },
  {
    id: 3,
    to: '/payment',
    label: 'Payments',
    logo: Payments,
  },
  {
    id: 4,
    to: '/credit',
    label: 'Credit',
    logo: Credit,
  },
  {
    id: 5,
    to: '/profile',
    label: 'Profile',
    logo: Account,
  },
]);
</script>

<style lang="scss">
.app-layout {
  &__drawer {
    @apply p-12 bg-[#0C365A] w-[340px];
    @apply hidden lg:block #{!important};

    &__logo {
      @apply h-[35px] w-[125px] text-brand mb-5;
    }

    &__description {
      @apply text-[15px] leading-5 text-[#FFFFFF] mb-20 opacity-30;
    }

    &__item {
      @apply p-0 mb-10 text-white;

      &__logo {
        @apply mr-4;
      }
    }
  }

  &__footer {
    @apply bg-white;
    @apply block lg:hidden #{!important};
    &__tabs {
      @apply text-[#dddddd] py-2 pt-1;
    }

    &__tab {
      &__content__label {
        @apply text-[9px] leading-tight pt-1;
      }

      &--active {
        @apply text-[#01d167] #{!important};
      }
    }
  }
}
</style>
