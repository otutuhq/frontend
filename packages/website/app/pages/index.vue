<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

// import DynamicMessageDisplay from '~/components/home/DynamicMessageDisplay.vue';

import FeatureList from '~/components/home/features/FeatureList.vue';
import FeaturesSection from '~/components/home/FeaturesSection.vue';
import HomeBanner from '~/components/home/HomeBanner.vue';
import PremiumFeatures from '~/components/home/PremiumFeatures.vue';
import Testimonials from '~/components/home/testimonials/Testimonials.vue';

// import { useDynamicMessages } from '~/composables/use-dynamic-messages';

import { commonAttrs, getMetadata } from '~/utils/metadata';

const description
  = 'Otutu is a powerful modern accounting platform with full double-entry accrual accounting, built for professional financial management.';

const keywords = `accounting,financial-management,double-entry-accounting,bookkeeping,business-finance,
invoicing,payables,receivables,financial-reporting,tax-compliance,professional-accounting`;

useHead({
  title: 'Otutu',
  meta: [
    {
      name: 'keywords',
      content: keywords,
    },
    ...getMetadata('Otutu', description, ''),
  ],
  ...commonAttrs(),
});

// const { fetchMessages, activeDashboardMessages } = useDynamicMessages();

// Critical optimization: Use requestIdleCallback for non-blocking data fetching
/*
onBeforeMount(() => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      fetchMessages();
    });
  }
  else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      fetchMessages();
    }, 0);
  }
});
*/

definePageMeta({
  layout: 'landing',
});

// Critical optimization: Lazy load heavy PricingSection component
const PricingSection = defineAsyncComponent(() => import('~/components/pricings/PricingSection.vue'));
</script>

<template>
  <!-- Critical optimization: Lazy load heavy components -->
  <!--
  <ClientOnly>
    <DynamicMessageDisplay
      v-if="activeDashboardMessages.length > 0"
      :messages="activeDashboardMessages"
    />
  </ClientOnly>
  -->

  <!-- Critical optimization: Load above-the-fold content first -->
  <HomeBanner />

  <ClientOnly>
    <FeaturesSection />
    <FeatureList />
    <Testimonials />
    <PremiumFeatures />

    <!-- Critical optimization: Lazy load pricing section with suspense -->
    <Suspense>
      <template #default>
        <PricingSection compact />
      </template>
      <template #fallback>
        <div class="container flex flex-col gap-12 pb-10 md:pb-20">
          <!-- Pricing skeleton for immediate feedback -->
          <div class="flex flex-col gap-8">
            <div class="flex gap-2 justify-center">
              <div class="h-10 w-24 bg-gray-200 rounded animate-pulse" />
              <div class="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
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
        </div>
      </template>
    </Suspense>
  </ClientOnly>
</template>
