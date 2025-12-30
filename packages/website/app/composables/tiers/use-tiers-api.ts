import { type AvailablePlansResponse, AvailablePlansResponseSchema, type PriceBreakdown, PriceBreakdownSchema } from '@rotki/card-payment-common/schemas/plans';
import { useFetchWithCsrf } from '~/composables/use-fetch-with-csrf';
import { useGlobalPricingCache } from '~/composables/use-pricing-cache';
import { type PremiumTiersInfo, PremiumTiersInfo as PremiumTiersInfoSchema } from '~/types/tiers';
import { logger } from '~/utils/use-logger';

export function useTiersApi() {
  const { fetchWithCsrf } = useFetchWithCsrf();
  const pricingCache = useGlobalPricingCache();

  // Check if we should use static data (can be controlled by environment variable)
  const config = useRuntimeConfig();

  function shouldUseStaticPricing(): boolean {
    // Use static pricing if explicitly enabled via environment variable
    // or if we're in SSR mode (server-side rendering)
    return config.public.useStaticPricing === true || (typeof window === 'undefined');
  }

  async function fetchAvailablePlans(): Promise<AvailablePlansResponse> {
    if (shouldUseStaticPricing()) {
      logger.info('Using cached static pricing data for available plans');
      // Use optimized cache for instant access
      const data = pricingCache.getPricingData();
      return data.availablePlans;
    }

    try {
      const response = await fetchWithCsrf<AvailablePlansResponse>(
        '/webapi/2/available-tiers',
        { method: 'GET' },
      );
      const parsed = AvailablePlansResponseSchema.safeParse(response);
      if (!parsed.success) {
        logger.error('Failed to parse AvailablePlansResponse', {
          error: parsed.error,
          rawData: response,
        });
        // Fallback to static data if API fails
        logger.info('Falling back to cached static pricing data due to parse error');
        const data = pricingCache.getPricingData();
        return data.availablePlans;
      }
      return parsed.data;
    }
    catch (error: any) {
      logger.error(`Failed to fetch available plans: ${error?.message ?? String(error)}`);
      // Fallback to static data if API fails
      logger.info('Falling back to cached static pricing data due to network error');
      const data = pricingCache.getPricingData();
      return data.availablePlans;
    }
  }

  async function fetchPremiumTiersInfo(): Promise<PremiumTiersInfo> {
    if (shouldUseStaticPricing()) {
      logger.info('Using cached static pricing data for premium tiers info');
      // Use optimized cache for instant access
      const data = pricingCache.getPricingData();
      return data.premiumTiersInfo;
    }

    try {
      const response = await fetchWithCsrf<PremiumTiersInfo>(
        '/webapi/2/tiers/info',
      );
      const parsed = PremiumTiersInfoSchema.safeParse(response);
      if (!parsed.success) {
        logger.error('Failed to parse PremiumTiersInfo', {
          error: parsed.error,
          rawData: response,
        });
        // Fallback to static data if API fails
        logger.info('Falling back to cached static pricing data due to parse error');
        const data = pricingCache.getPricingData();
        return data.premiumTiersInfo;
      }
      return parsed.data;
    }
    catch (error: any) {
      logger.error(`Failed to fetch premium tiers info: ${error?.message ?? String(error)}`);
      // Fallback to static data if API fails
      logger.info('Falling back to cached static pricing data due to network error');
      const data = pricingCache.getPricingData();
      return data.premiumTiersInfo;
    }
  }

  async function fetchPriceBreakdown(planId: number): Promise<PriceBreakdown | undefined> {
    if (shouldUseStaticPricing()) {
      logger.info(`Using cached static pricing data for price breakdown of plan ${planId}`);
      // Use optimized cache for instant access
      return pricingCache.getPriceBreakdown(planId);
    }

    try {
      const response = await fetchWithCsrf<PriceBreakdown>(
        `/webapi/2/plans/${planId}/price-breakdown`,
        { method: 'GET' },
      );
      const parsed = PriceBreakdownSchema.safeParse(response);
      if (!parsed.success) {
        logger.error('Failed to parse PriceBreakdown:', {
          error: parsed.error,
          rawData: response,
        });
        // Fallback to static data if API fails
        logger.info('Falling back to cached static pricing data due to parse error');
        return pricingCache.getPriceBreakdown(planId);
      }
      return parsed.data;
    }
    catch (error: any) {
      logger.error(`Failed to fetch price breakdown: ${error.message}`);
      // Fallback to static data if API fails
      logger.info('Falling back to cached static pricing data due to network error');
      return pricingCache.getPriceBreakdown(planId);
    }
  }

  return {
    fetchAvailablePlans,
    fetchPremiumTiersInfo,
    fetchPriceBreakdown,
  };
}
