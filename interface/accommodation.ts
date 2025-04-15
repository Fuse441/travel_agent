/* eslint-disable prettier/prettier */
import { RecommandItem } from "./recommandItem";

export interface IAccommodationRequest {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  adults_number: number;
  children_number: number;
  checkin_date: string;
  checkout_date: string;
  room_type: string;
}

export interface RecommandItemExtended extends RecommandItem {
  adults_number: number;
  children_number: number;
  checkin_date: string;
  checkout_date: string;
  room_type: string;
}