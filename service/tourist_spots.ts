/* eslint-disable prettier/prettier */
// services/touristService.ts
export async function fetchTouristSpots(age_group:string,province:string) {
console.log("age_group ==> ", age_group);
  const response = await fetch(`http://127.0.0.1:5000/tourist_spots?age_group=${age_group}&province=${province}`);

  

  if (!response.ok) {
    throw new Error("Failed to fetch tourist spots");
  }

  return await response.json();
}

