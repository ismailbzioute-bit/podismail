
export enum AppView {
  LANDING = 'landing',
  DASHBOARD = 'dashboard',
  KEYWORDS = 'keywords',
  COMPETITOR = 'competitor',
  OPTIMIZER = 'optimizer',
  TRENDS = 'trends',
  HEALTH = 'health'
}

export interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  intent: 'High' | 'Medium' | 'Low';
  competition: number;
  seasonality: number[];
  clusters: string[];
}

export interface CompetitorListing {
  url: string;
  title: string;
  tags: string[];
  categories: string[];
  attributes: Record<string, string>;
  gaps: string[];
  weaknesses: string[];
}

export interface AIListingOutput {
  title: string;
  tags: string[];
  description: string;
  seoScore: number;
}

export interface TrendNiche {
  name: string;
  growth: number;
  status: 'Rising' | 'Peak' | 'Dying';
  platforms: ('TikTok' | 'Pinterest' | 'Etsy')[];
  description: string;
}
