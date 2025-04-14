/* eslint-disable prettier/prettier */
// components/RecommandCard.tsx
"use client";

import { RecommandItem } from "@/interface/recommandItem";
import { Card, CardBody } from "@heroui/card";
import { Star } from "lucide-react";
import { Image } from "@heroui/image";
import { Radio, RadioGroup } from "@heroui/radio";


export default function RecommandCard({
  data,
  selected,
  onSelect,
}: {
  data: RecommandItem;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className=""
    >
      {/* Left: radio and image */}
      <div className="flex flex-col items-center space-y-4">
  
        <RadioGroup label="Select your favorite city">
      <Radio value="buenos-aires">Buenos Aires</Radio>
    </RadioGroup>
        <div className="w-32 h-24 overflow-hidden rounded-lg">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={270}
        />
        </div>
      </div>

      {/* Right: content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg">{data.name}</h2>
          <span className="text-xs bg-pink-200 text-pink-800 px-2 py-0.5 rounded-full">
            {data.recommended_age_group}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{data.rating}</span>
          <span>({data.review_count} Reviews)</span>
        </div>
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
          {data.address}
        </p>
      </div>
    </div>
  );
}
