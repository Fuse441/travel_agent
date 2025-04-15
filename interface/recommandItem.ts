/* eslint-disable prettier/prettier */
export interface RecommandItem {
  location: { lat: number; lng: number; };
    name: string;
    rating: number;
    review_count: number;
    photos: string[];
    place_id : string;
    recommended_age_group: string;
  address: string;
}
