<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' });

const features = [
  {
    title: t('home.otutu_features.features.automated_bookkeeping.title'),
    description: t('home.otutu_features.features.automated_bookkeeping.description'),
  },
  {
    title: t('home.otutu_features.features.real_time_reporting.title'),
    description: t('home.otutu_features.features.real_time_reporting.description'),
  },
  {
    title: t('home.otutu_features.features.multi_currency.title'),
    description: t('home.otutu_features.features.multi_currency.description'),
  },
  {
    title: t('home.otutu_features.features.tax_compliance.title'),
    description: t('home.otutu_features.features.tax_compliance.description'),
  },
  {
    title: t('home.otutu_features.features.audit_trails.title'),
    description: t('home.otutu_features.features.audit_trails.description'),
  },
];
</script>

<template>
  <div class="pt-4">
    <div class="font-bold pb-2">
      {{ t('home.otutu_features.key_features') }}
    </div>

    <ul class="list-disc pl-4 text-rui-text-secondary leading-7 flex flex-col gap-1">
      <li
        v-for="feature in features"
        :key="feature.title"
      >
        <b class="font-medium text-rui-text">{{ feature.title }}: </b>{{ feature.description }}
      </li>
    </ul>
  </div>
</template>
