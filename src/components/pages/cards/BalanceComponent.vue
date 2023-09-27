<template>
  <div class="balance">
    <span class="balance__currency">S$</span>
    <span class="balance__amount">3,000</span>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.balance {
  @apply flex items-center;
  &__currency {
    @apply bg-brand rounded px-[14px] py-[3px] mr-2.5 text-xs font-bold text-white;
  }

  &__amount {
    @apply text-white lg:text-black text-xl font-bold;
  }
}
</style>
