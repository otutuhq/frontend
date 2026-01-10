<script setup lang="ts">
import PricingPeriodTab from '~/components/pricings/PricingPeriodTab.vue';
import PricingTierComparison from '~/components/pricings/PricingTierComparison.vue';
import { useGlobalPricingCache } from '~/composables/use-pricing-cache';
import { PricingPeriod } from '~/types/tiers';

defineProps<{
  compact?: boolean;
}>();

const selectedPricingPeriod = ref<PricingPeriod>(PricingPeriod.MONTHLY);

// Critical optimization: Use global cache instead of heavy composables
const pricingCache = useGlobalPricingCache();
const { isDataLoaded } = pricingCache;

// Get data with cache-first strategy
const availablePlans = computed(() => {
  const data = pricingCache.getPricingData();
  return data.availablePlans.tiers;
});

const tiersInformation = computed(() => {
  const data = pricingCache.getPricingData();
  return data.premiumTiersInfo;
});
</script>

<template>
  <div
    data-cy="pricing-section"
    class="w-full flex flex-col gap-12 px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-20 max-w-7xl mx-auto"
  >
    <!-- Critical optimization: Wrap in ClientOnly to prevent SSR hydration blocking -->
    <ClientOnly>
      <template v-if="isDataLoaded">
        <PricingPeriodTab
          v-model="selectedPricingPeriod"
          :data="availablePlans"
        />
        <PricingTierComparison
          :compact="compact"
          :selected-period="selectedPricingPeriod"
          :available-plans="availablePlans"
          :tiers-data="tiersInformation"
        />
      </template>

      <!-- Loading skeleton for immediate feedback -->
      <template #fallback>
        <div class="flex flex-col gap-8">
          <!-- Pricing period tab skeleton -->
          <div class="flex gap-2 justify-center">
            <div class="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            <div class="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          <!-- Pricing table skeleton -->
          <div class="space-y-4">
            <div class="h-16 bg-gray-200 rounded animate-pulse" />
            <div class="grid grid-cols-4 gap-4">
              <div
                v-for="i in 4"
                :key="i"
                class="h-32 bg-gray-200 rounded animate-pulse"
              />
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
