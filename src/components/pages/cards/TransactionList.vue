<template>
  <div class="transaction-list-wrapper">
    <TransactionItem
      v-for="item of transactions"
      :transaction="item"
      :key="item.id"
    />
    <div
      v-if="!transactions.length"
      class="transaction-list-wrapper__empty-section"
    >
      No transaction.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TransactionItem from './TransactionItem.vue';
import {
  ITransaction,
  TransactionCategory,
  TransactionType,
} from 'src/models/transaction';
import { useCardStore } from 'src/stores/cards';
const cardStore = useCardStore();
const transactions = computed(() => cardStore.transactions);
// const transactions = ref<ITransaction[]>([]);
defineExpose({
  transactions,
});
</script>

<style lang="scss">
.transaction-list-wrapper {
  &__content {
  }
  &__empty-section {
    @apply text-center;
  }
}
</style>
