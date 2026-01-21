<script setup lang="ts">
import type { Swiper } from 'swiper/types';
import { set } from '@vueuse/core';
import { SwiperSlide } from 'swiper/vue';
import Carousel from '~/components/common/carousel/Carousel.vue';
import CarouselControls from '~/components/common/carousel/CarouselControls.vue';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

defineProps<{
  hideThumbnail?: boolean;
}>();

const swiperInstance = ref<Swiper>();
const swiperReady = ref<boolean>(false);
const activeIndex = ref<number>(1);

const images = ref<string[]>([
  '/img/screenshots/1.avif',
  '/img/screenshots/2.avif',
  '/img/screenshots/3.avif',
  '/img/screenshots/4.avif',
  '/img/screenshots/5.avif',
  '/img/screenshots/6.avif',
  '/img/screenshots/7.avif',
  '/img/screenshots/8.avif',
  '/img/screenshots/9.avif',
  '/img/screenshots/10.avif',
  '/img/screenshots/11.avif',
  '/img/screenshots/12.avif',
  '/img/screenshots/13.avif',
  '/img/screenshots/14.avif',
  '/img/screenshots/15.avif',
  '/img/screenshots/16.avif',
  '/img/screenshots/17.avif',
  '/img/screenshots/18.avif',
  '/img/screenshots/19.avif',
  '/img/screenshots/20.avif',
]);

function onSwiperUpdate(s: Swiper): void {
  set(swiperInstance, s);
  set(swiperReady, true);
  set(activeIndex, s.activeIndex + 1);
}

/**
 * Determines if an image should be eagerly loaded (first image is LCP element)
 */
function getLoadingStrategy(index: number): 'eager' | 'lazy' {
  return index === 0 ? 'eager' : 'lazy';
}
</script>

<template>
  <div class="container flex flex-col relative">
    <Carousel
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      auto-height
      class="rounded-lg md:rounded-2xl lg:rounded-3xl border border-black/[0.12]"
      @swiper="onSwiperUpdate($event)"
      @slide-change="onSwiperUpdate($event)"
    >
      <!-- Retain the height, so it's not jumping when the image first loaded -->
      <SwiperSlide
        v-for="(image, i) in images"
        :key="i"
        class="relative pt-[56.2%] bg-rui-grey-100"
      >
        <img
          :src="image"
          alt="Otutu application screenshot"
          :loading="getLoadingStrategy(i)"
          class="w-full absolute h-full top-0 left-0 object-cover"
        />
      </SwiperSlide>
    </Carousel>
    <div class="container relative">
      <div class="flex flex-col md:absolute top-0 mt-4 md:mt-0 transform md:translate-y-[calc(-50%-2.5rem)] md:-left-6 md:-right-6 items-center justify-center z-[1] md:px-0 px-4">
        <CarouselControls
          v-model:swiper="swiperInstance"
          :active-index="activeIndex"
          :pages="images.length"
          :class="{ 'pointer-events-none': !swiperReady }"
          arrow-buttons
        />
        <div
          v-if="!hideThumbnail"
          class="px-8 py-2 md:py-6 rounded-xl border border-black/[.12] bg-white shadow-[4px_32px_80px_0_rgba(191,194,203,0.24)]"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
