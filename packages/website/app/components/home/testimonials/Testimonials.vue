<script setup lang="ts">
import TestimonialCarousel from '~/components/home/testimonials/TestimonialCarousel.vue';
import { useRemoteOrLocal } from '~/composables/use-remote-or-local';

const { fallbackToLocalOnError } = useRemoteOrLocal();
const { data: testimonials, pending } = useAsyncData('testimonials', () => fallbackToLocalOnError(
  async () => await queryCollection('testimonialsRemote').all(),
  async () => await queryCollection('testimonialsLocal').all(),
));

const visibleTestimonials = computed(() =>
  testimonials.value?.filter(testimonial => testimonial.visible) || [],
);

const { t } = useI18n({ useScope: 'global' });
</script>

<template>
  <div class="py-20 w-full overflow-x-hidden bg-rui-primary-lighter/[0.04]">
    <div class="container">
      <div class="text-rui-text font-bold text-h4 mb-4">
        {{ t('home.testimonials.title') }}
      </div>
      <div class="text-rui-text-secondary mb-16">
        {{ t('home.testimonials.detail') }}
      </div>

      <!-- Show loading skeleton while data loads -->
      <div
        v-if="pending"
        class="flex gap-6 overflow-hidden"
      >
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

      <!-- Show testimonials when loaded -->
      <TestimonialCarousel
        v-else-if="visibleTestimonials.length > 0"
        :testimonials="visibleTestimonials"
      />
    </div>
  </div>
</template>
