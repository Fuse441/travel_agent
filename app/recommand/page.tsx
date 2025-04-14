"use client";

import RecommandCard from "@/components/Recommand";
import { RecommandItem } from "@/interface/recommandItem";
import { Card, CardBody } from "@heroui/card";
import { DateRangePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useEffect, useState } from "react";
export default function RecommandPage() {
  const [dataRecommand, setRecommand] = useState<RecommandItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const data = localStorage.getItem("touristData");

    if (data) {
      try {
        const parsed = JSON.parse(data); // แปลง string เป็น array

        setRecommand(parsed);
      } catch (error) {
        console.error("Error parsing touristData:", error);
      }
    }
  }, []);

  return (
    <div className="w-full">
      <div className="filter w-1/2 flex flex-col justify-center items-center my-10">
        <Card>
          <CardBody>
            <div className="flex flex-row gap-3">
              <div>
                <h1 className="text-base">จังหวัด</h1>
                <Input
                  isDisabled
                  className="max-w-xs"
                  defaultValue=""
                  type=""
                />
              </div>
              <div>
                <h1 className="text-base">เช็คอิน / เช็คเอาท์</h1>
                <DateRangePicker
                  className="max-w-xs"
                  minValue={today(getLocalTimeZone())}
                />
              </div>
              <div>
                <h1 className="text-base">เด็ก</h1>
                <Input className="max-w-xs" defaultValue="" type="number" />
              </div>
              <div>
                <h1 className="text-base">ผู้ใหญ่</h1>
                <Input className="max-w-xs" defaultValue="" type="number" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <section className="">
        <h3 className="text-xl font-bold text-start">สถานที่ท่องเที่ยวแนะนำ</h3>

        <div className="recommand w-1/2 mt-2">
          {dataRecommand.map((item, index) => (
            <RecommandCard
              key={index}
              data={item}
              selected={selectedIndex === index}
              onSelect={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
