export type Language = 'ur' | 'en';

export type ViewTab = 'navigator' | 'resources' | 'helplines' | 'history';

export interface AssessmentRequest {
  situation: string;
  district?: string;
  province?: string;
  language: Language;
}

export interface AssessmentResponse {
  text: string;
  timestamp: string;
}

export interface SavedGuidance {
  id: string;
  situation: string;
  district?: string;
  province?: string;
  response: string;
  timestamp: string;
  language: Language;
}

export interface ResourceCategory {
  id: string;
  titleUr: string;
  titleEn: string;
  descUr: string;
  descEn: string;
  instructionUr: string;
  instructionEn: string;
  iconName: string;
  badgeUr: string;
  badgeEn: string;
}

export interface HelplineItem {
  nameUr: string;
  nameEn: string;
  number: string;
  descriptionUr: string;
  descriptionEn: string;
  category: 'emergency' | 'pdma' | 'bisp' | 'documents';
  urgent?: boolean;
}
