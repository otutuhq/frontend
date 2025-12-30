<script setup lang="ts">
import type { RuiIcons } from '@rotki/ui-library';

const { t } = useI18n({ useScope: 'global' });

interface Feature {
  icon: RuiIcons;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: 'lu-code-xml',
    title: t('home.advantages.open_source.title'),
    description: t('home.advantages.open_source.description'),
  },
  {
    icon: 'lu-laptop-minimal',
    title: t('home.advantages.local_app.title'),
    description: t('home.advantages.local_app.description'),
  },
  {
    icon: 'lu-database',
    title: t('home.advantages.own_your_data.title'),
    description: t('home.advantages.own_your_data.description'),
  },
  {
    icon: 'lu-shield-check',
    title: t('home.advantages.secure_platform.title'),
    description: t('home.advantages.secure_platform.description'),
  },
];
</script>

<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col items-center text-center p-6 rounded-xl border border-rui-grey-200 hover:border-rui-primary transition-colors duration-300 hover:shadow-lg"
        >
          <div class="flex items-center justify-center w-16 h-16 bg-rui-primary/10 rounded-full mb-6">
            <RuiIcon
              :name="feature.icon"
              size="32"
              class="text-rui-primary"
            />
          </div>
          <h3 class="text-h6 md:text-h5 !font-semibold mb-4 text-rui-text">
            {{ feature.title }}
          </h3>
          <p class="text-body-2 text-rui-text-secondary leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
