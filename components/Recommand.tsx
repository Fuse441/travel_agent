/* eslint-disable prettier/prettier */
import { RecommandItem } from "@/interface/recommandItem";
import { Checkbox } from "@heroui/checkbox";
import { DateRangePicker } from "@heroui/date-picker";
import { today, getLocalTimeZone,parseDate, isEqualDay, DateValue } from "@internationalized/date";
import { Star } from "lucide-react";
import { Image } from "@heroui/image";

export default function RecommandCard({
  data,
  selected,
  onSelect,
  dateHasSelected,
  onDateChange, 
}: {
  data: RecommandItem;
  selected: boolean;
  onSelect: () => void;
  dateHasSelected: Record<string,any>
  onDateChange: (id: string, date: { start: string; end: string }) => void;
}) 
{
  
  const disabledRanges = Object.entries(dateHasSelected)
  .filter(([_, range]) => range.start) 
  .map(([key, range]) => ({
    key,
    start: parseDate(range.start),
    end: range.end ? parseDate(range.end) : null
  }));

const isDateUnavailable = (date: DateValue,currentKey: string) => {
 
  return disabledRanges.some(disabledDate => {
    if (disabledDate.key === currentKey || !disabledDate.start) {
      return false;
    }

    if (disabledDate.start && disabledDate.end) {
      // เช็คว่า date อยู่ในช่วง start ถึง end
      return date >= disabledDate.start && date <= disabledDate.end;
    }

    // ถ้ามีแค่ start อย่างเดียว
    return isEqualDay(date, disabledDate.start);
  });
};
  return (
    <div
      className="border-2 border-solid flex gap-5 rounded-xl"
      role="button"
      onClick={onSelect}
    >
   
      <div className="flex flex-row p-5 gap-5 justify-center items-center">
        <Checkbox aria-label="เลือกสถานที่แนะนำ" isSelected={selected} />
        {/* {JSON.stringify(dateHasSelected)} */}
        <div className="rounded-lg shrink-0">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            fallbackSrc="/no_image.jpg"
            height={200}
            src={`${data.photos[0]}`}
            width={200}
          />
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg">{data.name}</h2>
          <span className="text-xs bg-pink-200 text-pink-800 px-2 py-0.5 rounded-full">
            {data.recommended_age_group}
          </span>
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{data.rating}</span>
          <span>({data.review_count} Reviews)</span>
        </div>
        <p className="text-sm text-gray-700 mt-2 line-clamp-2 text-start">
          {data.address}
        </p>

        <div className="flex flex-col justify-start items-end mt-10">
          <h1 className="text-base">เช็คอิน / เช็คเอาท์</h1>
          <DateRangePicker
            aria-label="เลือกวัน"
            className="max-w-xs"
            minValue={today(getLocalTimeZone())}
            isDisabled={!selected}
            isDateUnavailable={(date) => isDateUnavailable(date, data.place_id)}
            onChange={(range) => {
              if (range?.start && range?.end) {
                onDateChange(data.place_id, {
                  start: range.start.toString(),
                  end: range.end.toString(),
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
