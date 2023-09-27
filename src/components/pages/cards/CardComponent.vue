<template>
  <div class="card-wrapper">
    <button
      :class="[
        'card-wrapper__card__show-card-number',
        {
          'card-wrapper__card__show-card-number--visible':
            isActive && !isFrozen,
        },
      ]"
      @click="isCardNumberVisible = !isCardNumberVisible"
    >
      <Eye
        v-if="!isCardNumberVisible"
        class="card-wrapper__card__show-card-number__eye"
      />
      {{ isCardNumberVisible ? 'Hide' : 'Show' }} card number
    </button>
    <div
      class="card-wrapper__card"
      :class="{
        'card-wrapper__card--active': isActive,
      }"
    >
      <div v-if="isFrozen" class="card-wrapper__card__overlay">
        This card has been frozen
      </div>

      <div class="card-wrapper__card__info">
        <div class="card-wrapper__card__info__logo-wrapper">
          <FullLogo class="card-wrapper__card__info__aspire-logo" />
        </div>
        <div class="card-wrapper__card__info__holder">
          {{ card?.cardHolder }}
        </div>
        <div class="card-wrapper__card__info__number">
          {{ formattedCardNumber }}
        </div>
        <div class="card-wrapper__card__info__bottom-section">
          <span class="card-wrapper__card__info__bottom-section__expiry-date"
            >Thru: {{ card?.expiryDate }}</span
          >
          <span class="card-wrapper__card__info__bottom-section__cvv">
            <span>CVV:</span>
            <span class="card-wrapper__card__info__bottom-section__cvv__number">
              {{ isCardNumberVisible ? card?.cvv : '***' }}
            </span>
          </span>
        </div>
        <div class="card-wrapper__card__info-visa-logo">
          <Visa />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Eye from 'assets/Eye.svg';
import FullLogo from 'assets/FullLogo.svg';
import Visa from 'assets/Visa.svg';
import { ICard } from 'src/models/card';
import { PropType, computed, ref } from 'vue';

const props = defineProps({
  card: {
    type: Object as PropType<ICard>,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const isCardNumberVisible = ref(false);
const formattedCardNumber = computed(() =>
  isCardNumberVisible.value
    ? props.card?.cardNumber
    : props.card?.cardNumber.replace(/[\w](?=.{4})/g, '●')
);
const isFrozen = computed(() => props.card?.status === 'inactive');
</script>

<style lang="scss">
.card-wrapper {
  &__card {
    &__overlay {
      @apply h-full w-full absolute top-0 left-0 opacity-50 bg-black rounded-xl  flex justify-center items-center;
      @apply text-white #{!important};
    }
    @apply scale-75 origin-left z-10 relative p-6 mt-5 bg-[#536DFF] transition-all duration-300 w-full rounded-xl text-white font-bold;

    &--active {
      @apply bg-brand scale-100;
    }

    &--frozen {
      @apply opacity-50;
    }

    &__show-card-number {
      @apply flex pt-2 opacity-0  absolute -top-[0.5rem] right-0 bg-white text-brand h-10 px-4 pb-2 text-xs font-semibold rounded-xl rounded-b-none;

      &--visible {
        @apply opacity-100  transition-all duration-500;
      }

      &__eye {
        @apply mr-2;
      }
    }

    &__info {
      &__logo-wrapper {
        @apply flex justify-end;
      }

      &__holder {
        @apply my-6 text-2xl font-bold;
      }

      &__number {
        @apply mb-2.5 tracking-[3.5px];
        word-spacing: 0.75rem;
      }

      &__bottom-section {
        @apply text-[13px] tracking-[1.5px] font-bold flex;
        &__expiry-date {
          @apply mr-[30px];
        }

        &__cvv {
          @apply flex;
        }

        &__cvv__number {
          @apply ml-1 text-2xl tracking-[2.88px] leading-7;
        }
      }

      &-visa-logo {
        @apply w-full flex justify-end;
      }
    }
  }
}
</style>
