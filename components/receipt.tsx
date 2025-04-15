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
import { Calendar } from "lucide-react";
import Dialog from "./dialog";

export default function Receipt({
  data,
  receiptOpen,
  onClose,
}: {
  data: any;
  receiptOpen: boolean;
  onClose: () => void;
}) {
  const totalPrice = data.reduce((sum: number, item: any) => {
    const price = parseFloat(item.bookingInfo.price);

    return sum + (isNaN(price) ? 0 : price);
  }, 0);
  const [openDialog, setDialog] = useState(false);
  const message = {
    header: "จองสำเร็จแล้ว",
    body: "ระบบได้บันทึกข้อมูลของคุณเรียบร้อยแล้ว",
    buttonMessage: "กลับหน้าหลัก"
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
                {data.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex justify-between items-start border-b pb-3"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={item.bookingInfo.image}
                        alt="preview"
                        className="w-20 h-20 rounded object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">
                          สถานที่ท่องเที่ยว :{" "}
                          {item.bookingInfo.touristSpot || "สถานที่ท่องเที่ยว"}
                        </span>
                        <span className="">
                          โรงแรม : {item.bookingInfo.name || "โรงแรม"}
                        </span>
                        {item.bookingInfo.start && item.bookingInfo.end && (
                          <div className="flex items-center text-sm text-gray-500 gap-1">
                            <Calendar className="w-4 h-4" />
                            {item.bookingInfo.start} - {item.bookingInfo.end}
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

                <div className="flex justify-between pt-4 border-t text-xl font-bold">
                  <span>ค่าใช้จ่ายทั้งหมด</span>
                  <span className="text-indigo-500">
                    {totalPrice.toFixed(2)} บาท
                  </span>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="primary" className="w-full" onPress={() => {
                  onClose()
                  setDialog(true)
                }}>
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
