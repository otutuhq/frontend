<script setup lang="ts">
import type { ContextColorsType } from '@rotki/ui-library';
import ButtonLink from '~/components/common/ButtonLink.vue';

withDefaults(
  defineProps<{
    color?: ContextColorsType;
    onlyPremium?: boolean;
  }>(),
  {
    onlyPremium: false,
  },
);

const { t } = useI18n({ useScope: 'global' });
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <ButtonLink
      v-if="!onlyPremium"
      variant="outlined"
      to="https://app.otutu.co/company/login"
      external
      size="lg"
      :color="color"
      :class="{ '!outline-white !text-rui-dark-text': !color }"
    >
      {{ t('actions.get_started_for_free') }}
    </ButtonLink>

    <ButtonLink
      to="https://calendly.com/otutu/30min"
      external
      size="lg"
      variant="filled"
      :color="color"
    >
      {{ t('actions.get_premium') }}
    </ButtonLink>
  </div>
</template>
