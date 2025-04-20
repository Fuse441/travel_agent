/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";

// import { RecommandItem } from "@/interface/recommandItem";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { useRouter } from "next/navigation";

import RecommandCard from "@/components/Recommand";
import {
  IAccommodationRequest,
  RecommandItemExtended,
} from "@/interface/accommodation";
import Loading from "@/components/loading";
export default function RecommandPage() {
  const [dataRecommand, setRecommand] = useState<RecommandItemExtended[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<string[]>([]);
  const router = useRouter();
  const [childCount, setChildCount] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const [elderlyCount, setElderlyCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<Record<string, any>>({});

  const [selectedDates, setSelectedDates] = useState<{
    [placeId: string]: { start: string; end: string } | null;
  }>({});
  const toggleSelect = (id: string) => {
    setSelectedIndexes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setSelectedDates((prev) => {
      const newDates = { ...prev };

      if (newDates[id]) {
        delete newDates[id];
      } else {
        newDates[id] = { start: "", end: "" };
      }

      return newDates;
    });
  };
  const handleDateChange = (
    id: string,
    date: { start: string; end: string }
  ) => {
    setSelectedDates((prev) => ({
      ...prev,
      [id]: date,
    }));
   
  };

  useEffect(() => {
    const data = localStorage.getItem("touristData");
    const filter = localStorage.getItem("filter");

    try {
      const parsed = JSON.parse(data!);
      const parsedFilter = JSON.parse(filter!);
      setRecommand(parsed);
      setFilter(parsedFilter);
    } catch (error) {
      console.error("Error parsing touristData:", error);
    }
  }, []);

  const selectRecommand = async () => {
    setLoading(true)
    filter.age?.reduce(
      (total: any, item: { count: any }) => total + item.count,
      0
    ) ?? 0;
    const data: IAccommodationRequest[] = dataRecommand
      .filter((item) => selectedIndexes.includes(item.place_id))
      .map((item) => ({
        name: item.name,
        location: item.location,
        adults_number: adultCount + elderlyCount,
        children_number: childCount,
        checkin_date: selectedDates[item.place_id]?.start || "",
        checkout_date: selectedDates[item.place_id]?.end || "",
        room_type:
          childCount && adultCount && !elderlyCount
            ? "ครอบครัวที่มีเด็ก"
            : "ทุกวัย",
      }));

    try {
      const response = await fetch("http://127.0.0.1:5000/hotels_near", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json(); // ✅ ดึง JSON ออกมาก่อน

        console.log("Hotel result ==>", result);
      
        const disabledDates = Object.values(selectedDates)
        // console.log("selectedDates ==>",disabledDates)
        localStorage.setItem("hotels", JSON.stringify(result)); 
        router.push("/hotels");
      } else {
        console.warn("Fetch failed with status:", response.status);
      }
    } catch (error) {
      console.log("error ==> ", error);
    }
  };



  return (
    <div className="w-full">
      <Loading status={loading}/>
      <Breadcrumbs size="lg">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Place</BreadcrumbItem>
      </Breadcrumbs>
      <div className="filter w-full flex flex-col justify-center items-center my-10">
        <Card>
          <CardBody>
            <div className="flex flex-row gap-3 justify-center items-end">
              <div>
                <h1 className="text-base">จังหวัด</h1>
                <Input
                  isDisabled
                  className="max-w-xs"
                  defaultValue={filter.province}
                  type=""
                  value={filter.province}
                />
              </div>
              {/* <div>
                <h1 className="text-base">เช็คอิน / เช็คเอาท์</h1>
                <DateRangePicker
                  aria-label="เลือกวัน"
                  className="max-w-xs"
                  minValue={today(getLocalTimeZone())}
                />
              </div> */}
              <div>
                {!["เด็ก", "ทุกวัย"].some((age) =>
                  filter.age?.includes(age)
                ) ? undefined : (
                  <>
                    <h1 className="text-base">เด็ก</h1>
                    <Input
                      className="max-w-xs"
                      defaultValue="0"
                      type="number"
                      onValueChange={(value: any) =>
                        setChildCount(Number(value))
                      }
                    />
                  </>
                )}
              </div>
              <div>
                <h1 className="text-base">ผู้ใหญ่</h1>
                <Input
                  className="max-w-xs"
                  defaultValue="0"
                  type="number"
                  onValueChange={(value: any) => setAdultCount(Number(value))}
                />
              </div>
              <div>
                {!["ผู้สูงอายุ", "ทุกวัย"].some((age) =>
                  filter.age?.includes(age)
                ) ? undefined : (
                  <>
                    <h1 className="text-base">ผู้สูงอายุ</h1>
                    <Input
                      className="max-w-xs"
                      defaultValue="0"
                      maxLength={1}
                      type="number"
                      onValueChange={(value: any) =>
                        setElderlyCount(Number(value))
                      }
                    />
                  </>
                )}
              </div>

              <Button
                color="primary"
                isDisabled={childCount || (adultCount || elderlyCount) ? false : true}
                onPress={() => {
                  const tempObj = {
                    child: childCount || 0,
                    adult: adultCount || 0,
                    elderly: elderlyCount || 0,
                  };
                  const newObj = { ...filter, ageCount: tempObj };
                  localStorage.setItem("filter", JSON.stringify(newObj));
                  localStorage.setItem("date", JSON.stringify(selectedDates));
                  selectRecommand();
                }}
              >
                ต่อไป
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <section className="">
      <h3 className="text-7xl font-bold text-center">
            สถานที่ท่องเที่ยวแนะนำ
          </h3>
        <div className="flex justify-center">
        
                
        <div className="recommand w-2/3 flex flex-col mt-2">
  {dataRecommand.length === 0 ? (
    <div>ไม่พบสถานที่ท่องเที่ยว</div>
  ) : (
    dataRecommand.map((item) => (
      <div key={item.place_id} className="mb-5">
        <RecommandCard
          data={item}
          selected={selectedIndexes.includes(item.place_id)}
          onDateChange={handleDateChange}
          onSelect={() => toggleSelect(item.place_id)}
        />
      </div>
    ))
  )}
</div>

        </div>
      </section>
    </div>
  );
}
