"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import Receipt from "@/components/receipt";

export default function HotelPage() {
  const [hotels, setHotels] = useState<Record<string, any>[]>([]);
  const [date, setDate] = useState<Record<string, any>[]>([]);
  const [summery, setSummery] = useState<Record<string, any>[]>([]);
  const [filter, setFilter] = useState<Record<string, any>>({});
  const [touristData, setTouristData] = useState<Record<string, any>[]>([]);
  const [openReceipt, setReceiptOpen] = useState(false);

  useEffect(() => {
    const hotels = localStorage.getItem("hotels");
    const filter = localStorage.getItem("filter");
    const selectDate = localStorage.getItem("date");
    const touristData = localStorage.getItem("touristData");

    try {
      setHotels(JSON.parse(hotels!));
      setFilter(JSON.parse(filter!));
      setDate(JSON.parse(selectDate!));
      setTouristData(JSON.parse(touristData!));
    } catch (error) {
      console.log("error ==> ", error);
    }
  }, []);

  const selectHotel = (tourist: string, hotel: Record<string, any>) => {
    setSummery((prev) => {
      const findObj = touristData.find((item: any) => item.name === tourist);
      const placeId = findObj?.place_id;
      const locationName = findObj?.name || "unknown location";

      if (!placeId || !date[placeId]) return prev;

      const mergedHotel = {
        touristSpot: locationName,
        ...hotel,
        ...date[placeId],
      };

      const filtered = prev.filter(
        (entry: any) => entry.bookingInfo?.touristSpot !== locationName,
      );

      return [...filtered, { bookingInfo: mergedHotel }];
    });
  };

  return (
    <div className="w-full">
      <Receipt
        data={summery}
        receiptOpen={openReceipt}
        onClose={() => setReceiptOpen(false)}
      />
      <Breadcrumbs size="lg">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/recommand">Place</BreadcrumbItem>
        <BreadcrumbItem>Hotel</BreadcrumbItem>
      </Breadcrumbs>

      <div className="hotel w-full flex flex-col justify-center items-center my-10 ">
        <div className="filter w-1/2 flex flex-col justify-center items-start my-10">
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
                    filter.age?.includes(age),
                  ) ? undefined : (
                    <>
                      <h1 className="text-base">เด็ก</h1>
                      <Input
                        isDisabled
                        className="max-w-xs"
                        defaultValue="0"
                        type="number"
                        value={filter.ageCount.child || 0}
                      />
                    </>
                  )}
                </div>
                <div>
                  <h1 className="text-base">ผู้ใหญ่</h1>
                  <Input
                    isDisabled
                    className="max-w-xs"
                    type="number"
                    value={filter.ageCount?.adult || 0}
                  />
                </div>
                <div>
                  {!["ผู้สูงอายุ", "ทุกวัย"].some((age) =>
                    filter.age?.includes(age),
                  ) ? undefined : (
                    <>
                      <h1 className="text-base">ผู้สูงอายุ</h1>
                      <Input
                        isDisabled
                        className="max-w-xs"
                        defaultValue="0"
                        type="number"
                        value={filter.ageCount.elderly || 0}
                      />
                    </>
                  )}
                </div>
                <Button
                  color="primary"
                  isDisabled={!(Object.keys(summery).length == hotels.length)}
                  onPress={() => {
                    console.log(summery);
                    setReceiptOpen(true);
                  }}
                >
                  ต่อไป
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        <section className="w-3/4">
          <h3 className="text-7xl font-bold text-center mb-5">
            ที่พักใกล้สถานที่ท่องเที่ยว
          </h3>

          <div className="recommand w-full flex flex-col mt-2 items-center">
            <Accordion className="w-full drop-shadow-lg" variant="splitted">
              {hotels &&
                hotels.map((item, index) => (
                  <AccordionItem
                    key={index}
                    aria-label={`Accordion ${index + 1}`}
                    startContent={
                      <Image
                        isBlurred
                        isZoomed
                        alt="HeroUI hero Image"
                        fallbackSrc="/no_image.jpg"
                        src={item.photos}
                        width={300}
                      />
                    }
                    title={item.name}
                  >
                    {item.hotels && item.hotels.length > 0 ? (
                      item.hotels.map((hotel: any, index: any) => (
                        <div
                          key={index}
                          className="flex ml-10 my-4 gap-5 items-center"
                        >
                          <Image
                            isBlurred
                            isZoomed
                            alt="HeroUI hero Image"
                            fallbackSrc="/no_image.jpg"
                            src={hotel.photos}
                            width={300}
                          />
                          <Card className="w-full">
                            <CardBody>
                              <div className="flex flex-col gap-3">
                                <p className="font-bold">{hotel.name}</p>
                                <div className="flex items-center gap-2">
                                  {Array.from({
                                    length: Math.round(hotel.rating / 2),
                                  }).map((_, index) => (
                                    <Star
                                      key={index}
                                      className="w-4 h-4 text-yellow-400"
                                    />
                                  ))}
                                </div>
                                <p>{hotel.description}</p>
                              </div>
                            </CardBody>
                            <CardFooter>
                              <div className="w-full flex justify-between">
                                <div className="text-xl flex gap-3">
                                  From{" "}
                                  <p className="text-[#FF6B6B]">
                                    ${hotel.price}
                                  </p>
                                </div>
                                <Button
                                  color={
                                    summery.find(
                                      (obj) =>
                                        obj.bookingInfo?.touristSpot ===
                                          item.name &&
                                        obj.bookingInfo?.name === hotel.name,
                                    )
                                      ? "secondary"
                                      : "primary"
                                  }
                                  onPress={() => {
                                    const obj = {
                                      name: hotel.name,
                                      price: hotel.price,
                                      image: hotel.photos,
                                    };

                                    selectHotel(item.name, obj);
                                    console.log(summery);
                                  }}
                                >
                                  {summery.find(
                                    (obj) =>
                                      obj.bookingInfo?.touristSpot ===
                                        item.name &&
                                      obj.bookingInfo?.name === hotel.name,
                                  )
                                    ? "เลือกแล้ว"
                                    : "เลือกที่นี่"}
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        </div>
                      ))
                    ) : (
                      <p className="ml-10 my-4 text-gray-500">ไม่พบโรงแรม</p>
                    )}
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  );
}
