/* eslint-disable prettier/prettier */
// services/touristService.ts
export async function fetchTouristSpots() {
  const response = await fetch("/mock/tourist_spots.json");

  if (!response.ok) {
    throw new Error("Failed to fetch tourist spots");
  }

  return await response.json();
}
