/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { tripService } from "@/config/tripService";
import { populaar } from "@/config/popularProvince";
import { MailIcon } from "@/components/icons";
import { fetchTouristSpots } from "@/service/tourist_spots";
import Loading from "@/components/loading";

export default function Home() {
  const [province, setProvince] = useState<string[]>([]);
  const [selectProvince, setSelectProvince] = useState<string>("");
  const [selectAge, setSelectAge] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData,setUserData] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    
    const checkToken = () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      setUserData(JSON.parse(token!))
      setLoading(false);
    };

    const fetchProvinces = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json",
        );
        const data = await response.json();
        const provinceNames = data.map((item: any) => item.name_th);

        setProvince(provinceNames);
      } catch (error) {
        // console.error("Fetch error:", error);
      }
    };

    fetchProvinces();
    checkToken();
  }, []);

  return (
    <div className="flex flex-col ">
      <Loading status={loading} />
      <section className="flex flex-row items-center justify-center gap-x-[25rem] py-8 md:py-10">
        <div className="flex flex-col ">
          {
            userData.age >= 60 ? (
                <div>
                        <Chip className="bg-[#AAE8FF] text-[#000] text-[18px]">
                        สำรวจสถานที่สำหรับการพักผ่อนของผู้สูงวัย
          </Chip>
          <h3 className="whitespace-pre-line text-[48px] font-bold">
            {`เริ่มต้นช่วงเวลาดี ๆ\nเพื่อสุขภาพกายใจ...วันนี้เลย`}
          </h3>
          <p>เก็บเกี่ยวความทรงจำดี ๆ ให้ทุกการเดินทางเป็นความทรงจำที่ไม่ลืม</p>
                </div>
            ) : (
                <div>
                    <Chip className="bg-[#FCC2DB] text-[#000] text-[16px]">
            Explore Thailand
          </Chip>
          <h3 className="whitespace-pre-line text-[48px]">
            {`Experience\nmemorable moments\ntoday`}
          </h3>
          <p>เก็บเกี่ยวความทรงจำดี ๆ ให้ทุกการเดินทางเป็นความทรงจำที่ไม่ลืม</p>

                </div>
            )
          }
          </div>
        
        <div className="">
          <Image alt="" src={userData.age >= 60 ? "landing/logo_landing_page2.png" : "landing/logo_landing_page.png"} width={300} />
        </div>
      </section>

      <section className="">
        <div
          className="w-full h-[218px] flex items-center justify-center text-black "
          style={{
            background: "linear-gradient(to right, #A2E3FF, #FFFFFF)",
            borderRadius: "15px",
          }}
        >
          <div className="flex flex-row w-full justify-between">
            <div className="flex w-1/3">

              <Select
                size="lg"
                isVirtualized
                className="mx-10 text-[#0000]"
                label="เลือกจุดหมายปลายทางของคุณ"
                placeholder="เลือกจังหวัด"
                labelPlacement="outside"

                onSelectionChange={(key: any) =>
                  setSelectProvince(Array.from(key)[0] as string)
                }
              >
                {province.map((item, index) => (
                  <SelectItem key={item}>{item}</SelectItem>
                ))}
              </Select>
              <div className="w-[400px]">
                <p className="mb-2">เลือกช่วงอายุ</p>
                <CheckboxGroup
                  className=""
                  label=""
                  onValueChange={(value: any) => setSelectAge(value)}
                >
                  <div className="flex flex-row gap-3">
                    <Checkbox value="เด็ก">เด็ก</Checkbox>
                    <Checkbox value="ผู้สูงอายุ">ผู้สูงอายุ</Checkbox>
                  </div>
                </CheckboxGroup>
              </div>
            </div>
            <Button
              className={`${userData.age >= 60 ? "bg-[#FEBC9D] text-[#000]" : "bg-[#FF73AF] text-[#ffff]"}  w-[206px] text-2xl font-bold`}
              isDisabled={!selectProvince}
              size="lg"
              onPress={async () => {
                setLoading(true);
                const filter = {
                  age:
                    selectAge.length == 2 || selectAge.length == 0
                      ? ["ทุกวัย"]
                      : selectAge,
                  province: selectProvince,
                };
                let paramAge = selectAge.length == 2 ? "เด็กและผู้สูงอายุ" : ""
                if(selectAge.length != 2){
                    paramAge = selectAge[0];
                }  
                console.log("paramAge ==> ", paramAge,selectAge.length);
                const data = await fetchTouristSpots(paramAge, selectProvince);

                localStorage.setItem("touristData", JSON.stringify(data));
                localStorage.setItem("filter", JSON.stringify(filter));
                router.push("/recommand");
                setLoading(false);
                //  console.log(selectAge,selectProvince);
              }}
            >
              ค้นหา
            </Button>
          </div>
        </div>
      </section>

      <section className="service px-8 py-12">
        <div className="title mb-10">
          <p className="text-[#F85E9F] text-sm font-medium">บริการของเรา</p>
          <h3 className="text-2xl font-bold">We Offer The Best Service</h3>
        </div>
        <div className="body grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {tripService.map((item, index) => (
            <Card key={index} className="">
              <CardBody className="bg-transparent">
                <div className="flex flex-col justify-center items-center ">
                  <div className="flex justify-center items-center h-[150px]">
                    <Image
                      isBlurred
                      alt="HeroUI Album Cover"
                      className="h-full"
                      src={item.image}
                      width={100}
                    />
                  </div>

                  <p className="whitespace-pre-line text-center">{item.body}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="service px-8 py-12">
        <div className="title mb-10">
          <p className="text-[#F85E9F] text-sm font-medium">
            จุดหมายปลายทางยอดนิยม
          </p>
          <h3 className="text-2xl font-bold">Popular Destination</h3>
        </div>
        <div className="body grid grid-cols-3 gap-6">
          {populaar.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex">
                <Image
                  isBlurred
                  isZoomed
                  alt={`Image of ${item.name}`}
                  height={250}
                  src={item.image}
                  width={350}
                />
              </div>
              <p className="text-start mt-2">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact px-8 py-12">
        <Card>
          <CardBody className={`h-[323px] flex justify-center items-center gap-y-10 bg-[url(/bg_contact.png)]  ${userData.age >= 60 ? "bg-[#FFE2D5]" : "bg-[#FACD49]"}`}>
            <div className="">
              <h3 className="text-5xl font-bold">รับข่าวสารและโปรโมชั่น</h3>
            </div>
            <Input
              className="w-[300px]"
              labelPlacement="outside"
              placeholder="Enter your email"
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="email"
            />
          </CardBody>
        </Card>
      </section>

      <section className="footer px-8 py-12">
        <div className="flex justify-between items-end text-end">
          <div className="text-start">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-[#9C88FF] to-[#FF9EC8] bg-clip-text text-transparent">
              TripD
            </h3>
            <p className="text-[#71C9D3]">Get out and discover</p>
          </div>

          <h3 className="text-4xl ">ขอบคุณที่ไว้วางใจให้เราดูแลทริปของคุณ</h3>
          <Image height={150} src="logo_location.png" width={150} />
        </div>
      </section>
      <Divider className="" />
    </div>
  );
}
