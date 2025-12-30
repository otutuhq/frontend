<script setup lang="ts">
import { useGlobalPricingCache } from '~/composables/use-pricing-cache';
import { useStagingBranding } from '~/composables/use-staging-branding';
import { commonAttrs } from '~/utils/metadata';

useStagingBranding();

// Preload pricing data early for optimal performance
const pricingCache = useGlobalPricingCache();
onMounted(() => {
  pricingCache.preloadData();
});

const { public: { baseUrl } } = useRuntimeConfig();

// Global fallback for OG image.
const ogImageUrl = `${baseUrl}/img/og/share.png`;

useHead(() => ({
  meta: [
    { property: 'og:image', content: ogImageUrl },
    { property: 'twitter:image', content: ogImageUrl },
  ],
  ...commonAttrs(),
}));
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
