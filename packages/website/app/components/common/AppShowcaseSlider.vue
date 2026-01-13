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

const images = ref<{ webp: string; png: string }[]>([
  { webp: '/img/screenshots/1.webp', png: '/img/screenshots/1.png' },
  { webp: '/img/screenshots/2.webp', png: '/img/screenshots/2.png' },
  { webp: '/img/screenshots/3.webp', png: '/img/screenshots/3.png' },
  { webp: '/img/screenshots/4.webp', png: '/img/screenshots/4.png' },
  { webp: '/img/screenshots/5.webp', png: '/img/screenshots/5.png' },
  { webp: '/img/screenshots/6.webp', png: '/img/screenshots/6.png' },
  { webp: '/img/screenshots/7.webp', png: '/img/screenshots/7.png' },
  { webp: '/img/screenshots/8.webp', png: '/img/screenshots/8.png' },
  { webp: '/img/screenshots/9.webp', png: '/img/screenshots/9.png' },
  { webp: '/img/screenshots/10.webp', png: '/img/screenshots/10.png' },
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
        <picture class="w-full absolute h-full top-0 left-0">
          <source
            :srcset="image.webp"
            type="image/webp"
          />
          <img
            :src="image.png"
            alt="Otutu application screenshot"
            :loading="getLoadingStrategy(i)"
            class="w-full h-full object-cover"
          />
        </picture>
      </SwiperSlide>
    </Carousel>
    <div class="container relative !px-0">
      <div class="flex flex-col md:absolute top-0 mt-4 transform md:translate-y-[calc(-50%-2.5rem)] md:-left-6 md:-right-6 items-center justify-center z-[1]">
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
