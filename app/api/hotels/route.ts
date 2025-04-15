/* eslint-disable prettier/prettier */

import { NextRequest, NextResponse } from "next/server";
import mockHotels from "@/public/mock/hotels.json";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Mock POST body =>", body);

  return NextResponse.json(mockHotels);
}
