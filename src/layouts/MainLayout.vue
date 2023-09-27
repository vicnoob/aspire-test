<template>
  <q-layout class="app-layout" view="lHh Lpr lFf">
    <!-- <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

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
          exact
          to="/home"
          class="app-layout__footer__tab"
          exact-active-class="app-layout__footer__tab--active"
          content-class="app-layout__footer__tab__content"
          :ripple="false"
        >
          <logo />
          <span class="app-layout__footer__tab__content__label"> Home </span>
        </q-route-tab>

        <q-route-tab
          exact
          to="/"
          class="app-layout__footer__tab"
          exact-active-class="app-layout__footer__tab--active"
          content-class="app-layout__footer__tab__content"
          :ripple="false"
        >
          <cards />
          <span class="app-layout__footer__tab__content__label"> Cards </span>
        </q-route-tab>

        <q-route-tab
          exact
          to="/payment"
          class="app-layout__footer__tab"
          exact-active-class="app-layout__footer__tab--active"
          content-class="app-layout__footer__tab__content"
          :ripple="false"
        >
          <payments />
          <span class="app-layout__footer__tab__content__label">
            Payments
          </span>
        </q-route-tab>

        <q-route-tab
          exact
          to="/credit"
          class="app-layout__footer__tab"
          exact-active-class="app-layout__footer__tab--active"
          content-class="app-layout__footer__tab__content"
          :ripple="false"
        >
          <credit />
          <span class="app-layout__footer__tab__content__label"> Credit </span>
        </q-route-tab>

        <q-route-tab
          exact
          to="/profile"
          class="app-layout__footer__tab"
          exact-active-class="app-layout__footer__tab--active"
          content-class="app-layout__footer__tab__content"
          :ripple="false"
        >
          <account />
          <span class="app-layout__footer__tab__content__label"> Profile </span>
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Logo from 'assets/Logo.svg';
import Account from 'assets/Account.svg';
import Cards from 'assets/Cards.svg';
import Credit from 'assets/Credit.svg';
import Payments from 'assets/Payments.svg';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style lang="scss" scoped>
.app-layout {
  &__footer {
    @apply bg-white;
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
