<template>
  <div class="card-detail__expansions">
    <q-expansion-item group="card-detail">
      <template v-slot:header>
        <q-item-section avatar>
          <CardDetail />
        </q-item-section>

        <q-item-section> Card Details </q-item-section>
      </template>

      <q-card>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius
          reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum
          officiis modi facere maiores architecto suscipit iste eveniet
          doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item group="card-detail" default-opened>
      <template v-slot:header>
        <q-item-section avatar>
          <RecentTransaction />
        </q-item-section>

        <q-item-section> Recent Transactions </q-item-section>

        <q-item-section side>
          <div class="row items-center"></div>
        </q-item-section>
      </template>

      <q-card>
        <q-card-section>
          <TransactionList ref="transactionListRef" />
        </q-card-section>
        <q-card-section
          v-if="transactionListRef?.transactions?.length"
          class="card-detail__expansions__view-all"
        >
          View all card transactions
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script setup lang="ts">
import RecentTransaction from 'assets/RecentTransaction.svg';
import CardDetail from 'assets/CardDetail.svg';
import TransactionList from 'src/components/pages/cards/TransactionList.vue';
import { ref } from 'vue';
const transactionListRef = ref<InstanceType<typeof TransactionList>>();
</script>

<style lang="scss">
.card-detail {
  &__expansions {
    @apply p-6;
    .q-item__section {
      .q-icon {
        @apply bg-[#DCE4F3] rounded-full text-[#FAFCFF];
      }
    }

    .q-item {
      @apply bg-[#F5F9FF] rounded-lg p-6 text-[#0C365A] font-semibold;
      filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.04));
    }

    .q-expansion-item__container {
      @apply border-[#F0F0F0] border border-solid mb-5 rounded-lg;
    }

    .q-expansion-item__content {
      @apply rounded-lg;
    }

    .q-card__section,
    .q-card {
      @apply rounded-b-lg #{!important};
    }

    .q-card__section {
      @apply px-6;
    }

    &__view-all {
      @apply bg-[#EDFFF5] text-brand text-[13px] text-center font-semibold;
    }
  }
}
</style>
