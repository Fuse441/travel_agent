"use client";
import { title } from "@/components/primitives";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useState } from "react";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { DatePicker } from "@heroui/date-picker";
import Dialog from "@/components/dialog";
export default function RegisterPage() {
  const [action, setAction] = useState<Record<string, string>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<Record<string, string>>(
    {},
  );

  const register = async (data: Record<string, string>) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log("errorData ==> ", errorData);
  
        setDialogMessage({
          header: "สมัครสมาชิก",
          body: "เกิดข้อผิดพลาด",
          btnMessage: "ตกลง",
          icon: "Fail",
          route : "current"
        });
        setDialogOpen(true);
  
        return;
      }
      setDialogMessage({
        header: "สมัครสมาชิก",
        body: "สมัครสมาชิกสำเร็จ",
        btnMessage: "ตกลง",
        icon: "success",
        route : "/login"
      });
      setDialogOpen(true);
      const result = await response.json();
      // localStorage.setItem("token", result);
      console.log("Register success:", result);
  
    } catch (error) {
      console.error("Unexpected error during register:", error);
      setDialogOpen(true);
    }
  };
  

  return (
    <div className="w-1/3">
      <Dialog
        modal={{
          header: dialogMessage.header,
          body: dialogMessage.body,
          route: dialogMessage.route,
          btnMessage: dialogMessage.btnMessage,
          icon: dialogMessage.icon,

        }}
        dialogOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      <Card className="p-10 relative">
        {/* รูปภาพลอยอยู่มุมขวาล่าง */}
        {/* <Image
          src="/logo_location.png"
          alt="Logo"
          width={200}
          height={200}
          className="absolute top-[11.5rem] right-[-20.5rem] "
        /> */}

        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold">Welcome to</h1>
          <p className="text-3xl font-bold bg-gradient-to-r from-[#9C88FF] to-[#FF9EC8] bg-clip-text text-transparent">
            TripD
          </p>
        </div>
        <CardBody>
          <Form
            className="w-full flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              let data = Object.fromEntries(new FormData(e.currentTarget));

              register(data as Record<string, string>);
            }}
          >
            <Input
              isRequired
              errorMessage="กรุณากรอกชื่อจริงที่ถูกต้อง"
              label="ชื่อ"
              labelPlacement="outside"
              name="name"
              placeholder="กรอกชื่อจริง"
              type="text"
            />

            <Input
              isRequired
              errorMessage="กรุณากรอกนามสกุลให้ถูกต้อง"
              label="นามสกุล"
              labelPlacement="outside"
              name="last_name"
              placeholder="กรอกนามสกุล"
              type="text"
            />

            <Input
              isRequired
              errorMessage="กรุณากรอกชื่อผู้ใช้งานให้ถูกต้อง"
              label="ชื่อผู้ใช้งาน"
              labelPlacement="outside"
              name="username"
              placeholder="กรอกชื่อผู้ใช้งาน"
              type="text"
            />

            <DatePicker
              isRequired
              className=""
              label="วันเกิด"
              name="birth_day"
              labelPlacement="outside"
            />

            <Input
              isRequired
              errorMessage="กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"
              label="เบอร์โทรศัพท์"
              labelPlacement="outside"
              name="phone_number"
              placeholder="กรอกนามสกุล"
              type="number"
            />

            <Input
              isRequired
              errorMessage="กรุณากรอกพาสเวิร์ดให้ถูกต้อง"
              label="พาสเวิร์ด"
              labelPlacement="outside"
              name="password"
              placeholder="กรอกนามสกุล"
              type="password"
            />

            <Input
              isRequired
              errorMessage="กรุณากรอกพาสเวิร์ดให้ถูกต้อง"
              label="ยืนยันพาสเวิร์ด"
              labelPlacement="outside"
              name="confirm_password"
              placeholder="กรอกนามสกุล"
              type="password"
            />

            <div className="flex flex-col w-full gap-2">
              <Button className="" color="primary" type="submit" onPress={() => {
           
              }}>
                สมัครสมาชิก
              </Button>
              <p className="text-center ">
                คุณมีบัญชีผู้ใช้งานอยู่แล้วใช่ไหม?{" "}
                <Link className="cursor-pointer" href="/login">
                  เข้าสู่ระบบ
                </Link>
              </p>
            </div>

            {/* {
            (
              <div className="text-small text-default-500">
                Action: {action}
              </div>
            )} */}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
