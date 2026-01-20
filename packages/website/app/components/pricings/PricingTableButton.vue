<script setup lang="ts">
import type { MappedPlan } from '~/components/pricings/type';
import type { PricingPeriod } from '~/types/tiers';
import ButtonLink from '~/components/common/ButtonLink.vue';
import { isFreePlan } from '~/components/pricings/utils';
import { toTitleCase } from '~/utils/text';

defineProps<{
  plan: MappedPlan;
  selectedPeriod: PricingPeriod;
}>();

const { t } = useI18n({ useScope: 'global' });
</script>

<template>
  <ButtonLink
    v-if="isFreePlan(plan)"
    class="w-full py-2 xl:text-[1rem]"
    to="https://demo.otutu.co/company/login"
    external
    color="primary"
    variant="outlined"
  >
    {{ t('actions.start_now_for_free') }}
  </ButtonLink>

  <ButtonLink
    v-else
    class="w-full py-2 xl:text-[1rem]"
    to="https://calendly.com/otutu/30min"
    external
    variant="default"
    color="primary"
  >
    {{ t('actions.get_plan', { plan: toTitleCase(plan.name) }) }}
  </ButtonLink>
</template>
