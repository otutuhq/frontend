import type { AvailablePlansResponse, PriceBreakdown } from '@rotki/card-payment-common/schemas/plans';
import type { PremiumTiersInfo } from '~/types/tiers';

// Import optimized JSON data for instant access
import pricingData from './pricing.json';

/**
 * Cached static pricing data for performance optimization
 * JSON import provides instant access without TypeScript compilation overhead
 */
let cachedPricingData: {
  availablePlans: AvailablePlansResponse;
  premiumTiersInfo: PremiumTiersInfo;
} | null = null;

let cachedPriceBreakdowns: Record<number, PriceBreakdown> | null = null;

/**
 * Get cached static pricing data
 * Uses in-memory caching to prevent redundant processing
 */
export function getStaticPricingData() {
  if (!cachedPricingData) {
    cachedPricingData = {
      availablePlans: pricingData.availablePlans as AvailablePlansResponse,
      premiumTiersInfo: pricingData.premiumTiersInfo as PremiumTiersInfo,
    };
  }
  return cachedPricingData;
}

/**
 * Get cached static price breakdown for a specific plan
 * Optimized for repeated access patterns
 */
export function getStaticPriceBreakdown(planId: number): PriceBreakdown | undefined {
  if (!cachedPriceBreakdowns) {
    cachedPriceBreakdowns = pricingData.priceBreakdowns as Record<number, PriceBreakdown>;
  }
  return cachedPriceBreakdowns[planId];
}

/**
 * Preload static pricing data for immediate access
 * Call this early in the application lifecycle for optimal performance
 */
export function preloadStaticPricingData(): void {
  // Trigger data caching in background
  getStaticPricingData();
  getStaticPriceBreakdown(1); // Preload first plan breakdown
}
