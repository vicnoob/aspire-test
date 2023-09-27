<template>
  <q-page class="card-page">
    <div class="card-page__overview">
      <div class="card-page__overview-title">
        <span class="card-page__overview-title-text"> Account balance </span>
        <logo class="card-page__overview-title-logo" />
      </div>
      <div class="card-page__overview-info">
        <BalanceCompoent />
        <button
          @click="newCardIsOpened = true"
          class="card-page__overview-info-btn"
        >
          <PlusCircle class="card-page__overview-info-btn-icon" />
          <span>New card</span>
        </button>
      </div>

      <q-tabs v-model="tab" inline-label class="card-page__overview-tabs">
        <q-tab name="myCards" label="My debit cards" />
        <q-tab disable name="allCards" label="All company cards" />
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        class="card-page__overview-tab-panels"
        animated
      >
        <q-tab-panel name="myCards" class="card-page__overview-tab-panel">
          <CardSlider ref="cardSliderRef" />
        </q-tab-panel>

        <q-tab-panel name="allCards" class="card-page__overview-tab-panel">
          <div class="text-h6">All Company Card</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div v-if="currentCard" class="card-page__card-detail">
      <CardActionBtn
        :currentCard="currentCard"
        @cancelCard="onCancelCard"
        @freezeCard="onFreezeChange"
      />

      <CardDetailExpansionZone />
    </div>
  </q-page>

  <AddNewCardDialog v-model="newCardIsOpened" />
</template>

<script setup lang="ts">
import Logo from 'assets/Logo.svg';
import PlusCircle from 'assets/PlusCircle.svg';
import BalanceCompoent from 'components/pages/cards/BalanceComponent.vue';
import CardDetailExpansionZone from 'components/pages/cards/CardDetailExpansionZone.vue';
import CardSlider from 'components/pages/cards/CardSlider.vue';
import { Dialog } from 'quasar';
import AddNewCardDialog from 'src/components/pages/cards/AddNewCardDialog.vue';
import CardActionBtn from 'src/components/pages/cards/CardActionBtn.vue';
import { CardStatus } from 'src/models/card';
import { useCardStore } from 'src/stores/cards';
import { computed, ref } from 'vue';

const { getCards, changeCardStatus, cancelCard } = useCardStore();
getCards();
const tab = ref('myCards');
const newCardIsOpened = ref(false);
const cardSliderRef = ref<InstanceType<typeof CardSlider>>();
const currentCard = computed(() => cardSliderRef.value?.currentCard);

const onFreezeChange = () => {
  Dialog.create({
    title: 'Confirmation',
    message: `Are you sure you want to ${
      currentCard.value?.status === CardStatus.Active ? 'freeze' : 'unfreeze'
    } this card?`,
    ok: {
      label: 'OK',
      color: 'primary',
    },
    cancel: {
      label: 'Cancel',
      color: 'grey',
    },
  }).onOk(() => {
    if (currentCard.value) {
      const newStatus =
        currentCard.value?.status === CardStatus.Active
          ? CardStatus.Inactive
          : CardStatus.Active;

      changeCardStatus(currentCard.value, newStatus);
    }
  });
};

const onCancelCard = () => {
  Dialog.create({
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
  }).onOk(() => {
    if (currentCard.value) {
      cancelCard(currentCard.value);
    }
  });
};
</script>

<style lang="scss" scoped>
.card-page {
  @apply bg-[#0C365A];
  &__overview {
    @apply px-6  pb-10 sticky top-0;
    &-title {
      @apply flex justify-between pt-8;
    }
    &-title-text {
      @apply font-semibold text-white;
    }

    &-title-logo {
      @apply text-brand relative top-[-12px];
    }

    &-info {
      @apply flex justify-between mt-4;

      &-btn {
        @apply flex items-center text-[13px] font-bold text-[#23CEFD];

        &-icon {
          @apply mr-2;
        }
      }
    }

    &-tabs {
      @apply text-white mt-6;

      .q-tab__indicator {
      }
    }

    &-tab-panels {
      @apply pt-8 bg-transparent;
    }

    &-tab-panel {
      @apply p-0;
    }
  }

  &__card-detail {
    @apply sticky z-10 bg-white rounded-t-3xl flex flex-col;
    min-height: calc(100vh - 160px);
    &__content {
      @apply p-6 pb-[86px] h-full overflow-auto;
      &__details-btn {
        @apply relative z-10;
        &:not(:first-child) {
          @apply mt-6;
        }
      }
      &__details-panel {
        @apply z-0 relative -top-2.5;
      }
    }
  }
}
</style>

<style lang="scss">
.card-page {
  &__overview-tabs {
    .q-tab__indicator {
      @apply bg-[#23CEFD];
    }
    .q-tab {
      @apply p-0 flex-grow-0 flex-shrink-0 h-6 min-h-[24px] mr-8;
      @apply normal-case #{!important};

      &__label {
        @apply text-[13px] leading-5 pb-1.5;
      }
    }
  }
}
</style>
