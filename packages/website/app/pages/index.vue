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
  = 'rotki is an open source portfolio tracker, accounting and analytics tool that protects your privacy.';

const keywords = `portfolio,portfolio-tracking,cryptocurrency-portfolio-tracker,cryptocurrency,bitcoin,ethereum,
privacy,opensource,accounting,asset-management,taxes,tax-reporting`;

useHead({
  title: 'rotki',
  meta: [
    {
      name: 'keywords',
      content: keywords,
    },
    ...getMetadata('rotki', description, ''),
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
