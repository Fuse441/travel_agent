"use client";
import { title } from "@/components/primitives";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useState } from "react";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import Dialog from "@/components/dialog";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [action, setAction] = useState<Record<string, string>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<Record<string, string>>(
    {},
  );
  const route = useRouter()
  const login = async (data: Record<string, string>) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
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
          header: "เข้าสู่ระบบ",
          body: errorData.developerMessage,
          btnMessage: "ตกลง",
          icon: "Fail",
          route : "current"
        });
        setDialogOpen(true);
        return;
      }
      
      const result = await response.json();
      localStorage.setItem("token", JSON.stringify(result.result));
      route.push("/")
    } catch (error) {
      console.error("Unexpected error during login:", error);
      setDialogOpen(true);
    }
  };

  return (
    <div className="w-1/3">
      {/* แสดง Dialog ถ้ามี error */}
      <Dialog
        modal={{
          header: dialogMessage.header,
          body: dialogMessage.body,
          route : "current",
          btnMessage : "ตกลง",
          icon : "Fail"
        }}
        dialogOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />

      <Card className="p-10 relative">
        <Image
          src="/logo_location.png"
          alt="Logo"
          width={200}
          height={200}
          className="absolute top-[11.5rem] right-[-20.5rem]"
        />

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
              const data = Object.fromEntries(new FormData(e.currentTarget));
              login(data as Record<string, string>); 
            }}
          >
            <Input
              isRequired
              errorMessage="กรุณากรอกชื่อผู้ใช้ที่ถูกต้อง"
              label="ชื่อผู้ใช้"
              labelPlacement="outside"
              name="username"
              placeholder="กรอกชื่อผู้ใช้งาน"
              type="text"
            />

            <Input
              isRequired
              errorMessage="กรุณากรอกรหัสผ่านให้ถูกต้อง"
              label="รหัสผ่าน"
              labelPlacement="outside"
              name="password"
              placeholder="กรอกรหัสผ่าน"
              type="password"
            />

            <div className="flex flex-col w-full gap-2">
              <Button color="primary" type="submit">
                เข้าสู่ระบบ
              </Button>
              <p className="text-center">
                ยังไม่มีบัญชีผู้ใช้ใช่ไหม?{" "}
                <Link className="cursor-pointer" href="/register">
                  ลงทะเบียน
                </Link>
              </p>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
