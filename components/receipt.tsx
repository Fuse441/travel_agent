/* eslint-disable prettier/prettier */

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Calendar, Radio } from "lucide-react";
import Dialog from "./dialog";
import { RadioGroup } from "@heroui/radio";

export default function Receipt({
  data,
  receiptOpen,
  onClose,
}: {
  data: any;
  receiptOpen: boolean;
  onClose: () => void;
}) {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: any }>({});
  const groupedByDate = data.reduce((acc: any, item: any) => {
    const key = `${item.bookingInfo.start}-${item.bookingInfo.end}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
  const handleRadioChange = (groupKey: string, item: any) => {
    setSelectedItems((prev) => ({ ...prev, [groupKey]: item }));
  };
  const uniqueDateKeys = Object.entries(groupedByDate)
    .filter(([_, items]:any) => items.length === 1)
    .map(([key]) => key);
  
  const filtered = data.filter((item: any) => {
    const key = `${item.bookingInfo.start}-${item.bookingInfo.end}`;
    return uniqueDateKeys.includes(key);
  });
  
  const totalPrice = [
    ...filtered,
    ...Object.values(selectedItems) // เฉพาะรายการที่ user เลือก
  ].reduce((sum: number, item: any) => {
    const price = parseFloat(item.bookingInfo.price);
    return sum + (isNaN(price) ? 0 : price);
  }, 0);
  const [openDialog, setDialog] = useState(false);
  const message = {
    header: "จองสำเร็จแล้ว",
    body: "ระบบได้บันทึกข้อมูลของคุณเรียบร้อยแล้ว",
    buttonMessage: "กลับหน้าหลัก",
  };

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={receiptOpen}
        size="2xl"
        onOpenChange={onClose}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-xl font-bold">
                สรุปค่าใช้จ่าย
              </ModalHeader>

              <ModalBody className="space-y-4">
                {Object.entries(groupedByDate).map(([key, items]: any) => (
                  <div key={key} className="space-y-4 border-b pb-4">
                    {items.length > 1 ? (
                      <p className="text-sm text-orange-600 mb-2">
                        * ระบบพบว่ามีรายการในช่วงวันที่เดียวกัน
                        กรุณาเลือกเพียงรายการเดียว
                      </p>
                    ) : undefined}
                    {items.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-start"
                      >
                        <div className="flex items-start gap-4">
                          {/* {JSON.stringify(items.length)} */}
                          {items.length > 1 ? (
                            <input
                              type="radio"
                              name={`radio-${key}`} // ทำให้เลือกได้แค่อันเดียวต่อ group
                              id={`radio-${key}-${index}`}
                              className="mt-2 w-4 h-4"
                              onChange={() => handleRadioChange(key, item)}

                              
                            />
                          ) : undefined}

                          <img
                            src={item.bookingInfo.image}
                            alt="preview"
                            className="w-20 h-20 rounded object-cover"
                          />
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold">
                              สถานที่ท่องเที่ยว :{" "}
                              {item.bookingInfo.touristSpot ||
                                "สถานที่ท่องเที่ยว"}
                            </span>
                            <span>
                              โรงแรม : {item.bookingInfo.name || "โรงแรม"}
                            </span>
                            {item.bookingInfo.start && item.bookingInfo.end && (
                              <div className="flex items-center text-sm text-gray-500 gap-1">
                                <Calendar className="w-4 h-4" />
                                {item.bookingInfo.start} -{" "}
                                {item.bookingInfo.end}
                              </div>
                            )}
                            <span className="text-sm text-gray-600">
                              {item.name}
                            </span>
                          </div>
                        </div>
                        <div className="text-right text-md font-semibold">
                          {parseFloat(item.bookingInfo.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="flex justify-between pt-4 border-t text-xl font-bold">
                  <span>ค่าใช้จ่ายทั้งหมด</span>
                  <span className="text-indigo-500">
                    {/* {JSON.stringify(filtered)} */}
                    {totalPrice.toFixed(2)} บาท
                  </span>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="primary"
                  className="w-full"
                  onPress={() => {
                    onClose();
                    setDialog(true);
                  }}
                >
                  ยืนยันแผนการเดินทาง
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Dialog
        dialogOpen={openDialog}
        modal={message}
        onClose={() => setDialog(false)}
      />
    </>
  );
}
