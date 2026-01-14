<script setup lang="ts">
import AppShowcaseSlider from '~/components/common/AppShowcaseSlider.vue';
import ButtonLink from '~/components/common/ButtonLink.vue';

const { t } = useI18n({ useScope: 'global' });
</script>

<template>
  <div class="container pt-16 md:pt-20">
    <div class="text-center flex flex-col gap-6 items-center">
      <h3 class="text-h4 md:text-h3 !font-bold max-w-[800px]">
        {{ t('home.hero.title') }}
      </h3>
      <h5
        class="text-h6 md:text-h5 text-rui-text-secondary !font-normal max-w-[630px]"
      >
        {{ t('home.hero.motto') }}
      </h5>
      <ButtonLink
        to="https://calendly.com/otutu/30min"
        external
        size="lg"
        color="primary"
        rounded
        variant="default"
      >
        {{ t('actions.download_for_free') }}
      </ButtonLink>
    </div>
  </div>
  <AppShowcaseSlider
    class="mt-16 mb-12"
    hide-thumbnail
  />
</template>
