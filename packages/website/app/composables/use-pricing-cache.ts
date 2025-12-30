import type { AvailablePlansResponse, PriceBreakdown } from '@rotki/card-payment-common/schemas/plans';
import type { PremiumTiersInfo } from '~/types/tiers';
import { getStaticPriceBreakdown, getStaticPricingData, preloadStaticPricingData } from '~/data/static-pricing';

/**
 * Optimized pricing data cache with preloading
 * Provides instant access to pricing data with minimal overhead
 */
export function usePricingCache() {
  const isDataLoaded = ref(false);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  /**
   * Preload pricing data for immediate access
   * Should be called during app initialization
   */
  const preloadData = async (): Promise<void> => {
    if (isLoading.value || isDataLoaded.value) {
      return;
    }

    try {
      isLoading.value = true;
      error.value = null;

      // Use requestIdleCallback for non-blocking preloading
      const preload = async (): Promise<void> => new Promise<void>((resolve) => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => {
            preloadStaticPricingData();
            resolve();
          });
        }
        else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(() => {
            preloadStaticPricingData();
            resolve();
          }, 0);
        }
      });

      await preload();
      isDataLoaded.value = true;
    }
    catch (error_) {
      error.value = error_ as Error;
      console.error('Failed to preload pricing data:', error_);
    }
    finally {
      isLoading.value = false;
    }
  };

  /**
   * Get pricing data with cache-first strategy
   */
  const getPricingData = (): {
    availablePlans: AvailablePlansResponse;
    premiumTiersInfo: PremiumTiersInfo;
  } => {
    if (!isDataLoaded.value) {
      // Sync preload if data hasn't been loaded yet
      preloadStaticPricingData();
      isDataLoaded.value = true;
    }
    return getStaticPricingData();
  };

  /**
   * Get price breakdown with cache-first strategy
   */
  const getPriceBreakdown = (planId: number): PriceBreakdown | undefined => {
    if (!isDataLoaded.value) {
      // Sync preload if data hasn't been loaded yet
      preloadStaticPricingData();
      isDataLoaded.value = true;
    }
    return getStaticPriceBreakdown(planId);
  };

  /**
   * Clear cache (useful for testing or memory management)
   */
  const clearCache = (): void => {
    isDataLoaded.value = false;
    error.value = null;
    // Note: The underlying cached data in static-pricing.ts will persist
    // until the page is refreshed, which is desired for performance
  };

  return {
    // State
    isDataLoaded: readonly(isDataLoaded),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Actions
    preloadData,
    getPricingData,
    getPriceBreakdown,
    clearCache,
  };
}

/**
 * Global pricing cache instance for shared access
 * Ensures consistent data across all components
 */
let globalPricingCache: ReturnType<typeof usePricingCache> | null = null;

export function useGlobalPricingCache() {
  if (!globalPricingCache) {
    globalPricingCache = usePricingCache();
  }
  return globalPricingCache;
}
