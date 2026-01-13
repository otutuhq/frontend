<script setup lang="ts">
import { PricingPeriod } from '~/types/tiers';

const model = defineModel<PricingPeriod>({ required: true });

const { t } = useI18n({ useScope: 'global' });

const tabs = [
  { value: PricingPeriod.MONTHLY, label: t('home.plans.names.monthly_billing') },
  { value: PricingPeriod.YEARLY, label: t('home.plans.names.yearly_billing') },
];
</script>

<template>
  <div class="flex relative">
    <RuiTabs
      v-model="model"
      class="border border-rui-gray-200 bg-rui-grey-200 rounded-md [&>div]:p-1"
    >
      <RuiTab
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        class="bg-transparent rounded h-8 min-h-[2rem]"
        active-class="!bg-white shadow rounded after:hidden !text-black"
      >
        {{ tab.label }}
      </RuiTab>
    </RuiTabs>
  </div>
</template>
