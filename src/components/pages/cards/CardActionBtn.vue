<template>
  <div class="card-action-btns">
    <button
      id="freezeBtn"
      @click="$emit('freezeCard')"
      class="card-action-btns__btn"
    >
      <FreezeCard class="card-action-btns__icon" />
      <span>
        {{ currentCard?.status === 'active' ? 'Freeze Card' : 'Unfreeze Card' }}
      </span>
    </button>
    <button class="card-action-btns__btn">
      <SetSpendLimit class="card-action-btns__icon" />
      <span> Set Spend Limit </span>
    </button>
    <button class="card-action-btns__btn">
      <GPay class="card-action-btns__icon" />
      <span> Add to GPay </span>
    </button>
    <button class="card-action-btns__btn">
      <ReplaceCard class="card-action-btns__icon" />
      <span> Replace Card </span>
    </button>
    <button
      id="cancelBtn"
      @click="$emit('cancelCard')"
      class="card-action-btns__btn"
    >
      <DeactivateCard class="card-action-btns__icon" />
      <span> Cancel Card </span>
    </button>
  </div>
</template>

<script setup>
import FreezeCard from 'assets/FreezeCard.svg';
import SetSpendLimit from 'assets/SetSpendLimit.svg';
import ReplaceCard from 'assets/ReplaceCard.svg';
import DeactivateCard from 'assets/DeactivateCard.svg';
import GPay from 'assets/GPay.svg';

defineProps(['currentCard']);
</script>

<style lang="scss">
.card-action-btns {
  @apply bg-[#EDF3FF] text-[#0C365A] text-[13px] flex py-5 px-4 rounded-t-3xl lg:rounded-3xl lg:mt-10;

  &__btn {
    @apply flex-1 flex flex-col justify-start items-center px-1 text-center;
  }

  &__icon {
    @apply mb-2;
  }
}
</style>
