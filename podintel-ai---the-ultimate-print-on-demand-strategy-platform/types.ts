
export enum Platform {
  ETSY = 'Etsy',
  AMAZON = 'Amazon',
  SHOPIFY = 'Shopify',
  REDBUBBLE = 'Redbubble',
  MERCH = 'Merch by Amazon'
}

export enum CompetitionLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface KeywordMetric {
  keyword: string;
  volume: number;
  competition: CompetitionLevel;
  intent: string;
  score: number;
}

export interface DesignConcept {
  type: 'Funny' | 'Emotional' | 'Minimal' | 'Trend-based';
  concept: string;
  slogan: string;
  targetAudience: string;
  saturation: number;
}

export interface ProductAnalysis {
  product: string;
  demandScore: number;
  bestColors: string[];
  priceRange: string;
  topPlatform: Platform;
}

export interface ListingCopy {
  title: string;
  description: string;
  tags: string[];
  platform: Platform;
}

export interface Trend {
  phrase: string;
  source: string;
  velocity: 'New' | 'Rising' | 'Saturated' | 'Dead';
  category: string;
}
