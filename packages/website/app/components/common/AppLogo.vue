<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  text?: boolean;
  size?: string | number;
}>(), {
  text: false,
  size: undefined,
});

/**
 * Converts size prop to pixel value for image dimensions
 * Default size is 3rem = 48px (assuming 16px base)
 */
function getSizeInPixels(): number {
  const sizeValue = props.size;
  if (!sizeValue)
    return 48; // 3rem default

  if (typeof sizeValue === 'number')
    return sizeValue * 16; // Assume rem, convert to px

  // Parse string value
  const num = Number.parseFloat(sizeValue);
  if (sizeValue.includes('rem'))
    return num * 16;
  if (sizeValue.includes('px'))
    return num;
  return num * 16; // Default to rem conversion
}

const name = 'OTUTU';
</script>

<template>
  <!-- Unified logo for both staging and production -->
  <div class="flex items-center gap-x-2">
    <img
      src="/img/single-logo.svg"
      :alt="text ? name : `${name} logo`"
      :width="getSizeInPixels()"
      :height="getSizeInPixels()"
      :style="{ width: `${getSizeInPixels()}px`, height: `${getSizeInPixels()}px` }"
      v-bind="$attrs"
    />
    <div
      v-if="text"
      class="text-h4 text-rui-primary dark:text-white"
    >
      {{ name }}
    </div>
  </div>
</template>
