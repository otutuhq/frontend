<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

// import DynamicMessageDisplay from '~/components/home/DynamicMessageDisplay.vue';

import FeatureList from '~/components/home/features/FeatureList.vue';
import FeaturesSection from '~/components/home/FeaturesSection.vue';
import HomeBanner from '~/components/home/HomeBanner.vue';
import PremiumFeatures from '~/components/home/PremiumFeatures.vue';

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

// Critical optimization: Lazy load heavy components
const PricingSection = defineAsyncComponent(() => import('~/components/pricings/PricingSection.vue'));
const Testimonials = defineAsyncComponent(() => import('~/components/home/testimonials/Testimonials.vue'));
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

    <!-- Critical optimization: Lazy load testimonials with suspense -->
    <Suspense>
      <template #default>
        <Testimonials />
      </template>
      <template #fallback>
        <div class="py-20 w-full overflow-x-hidden bg-rui-primary-lighter/[0.04]">
          <div class="container">
            <div class="text-rui-text font-bold text-h4 mb-4">
              {{ $t('home.testimonials.title') }}
            </div>
            <div class="text-rui-text-secondary mb-16">
              {{ $t('home.testimonials.detail') }}
            </div>
            <!-- Testimonials skeleton -->
            <div class="flex gap-6 overflow-hidden">
              <div
                v-for="i in 3"
                :key="i"
                class="flex-1 min-w-80 bg-white rounded-lg p-6 shadow-sm animate-pulse"
              >
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 bg-gray-200 rounded-full" />
                  <div>
                    <div class="h-4 bg-gray-200 rounded w-20 mb-2" />
                    <div class="h-3 bg-gray-200 rounded w-16" />
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="h-4 bg-gray-200 rounded" />
                  <div class="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Suspense>

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
