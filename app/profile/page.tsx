/* eslint-disable prettier/prettier */
"use client";

import React, { useEffect, useState } from "react";
import { title } from "@/components/primitives";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profile,setProfile] = useState<any>(null)
  useEffect(() => {
    const stored = localStorage.getItem("token");
    setProfile(JSON.parse(stored!))
    const token = stored ? JSON.parse(stored).username : null;

    if (!token) return;

    fetch(`http://127.0.0.1:5000/api/users/details?username=${token}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">กำลังโหลดข้อมูล...</div>;
  if (!userData) return <div className="p-4">ไม่พบข้อมูลผู้ใช้</div>;

  return (
    <div className="flex flex-col items-start justify-start p-6 w-full">
      <h1 className={title()}>หน้าโปรไฟล์</h1>

      <div className="text-start mt-4 p-4">
        <h2 className="text-lg font-semibold mb-2">ข้อมูลผู้ใช้</h2>
        <p>ชื่อผู้ใช้: <strong>{profile.username}</strong></p>
        <p>ชื่อนามสกุล: <strong>{profile.name} {profile.last_name}</strong></p>
        {/* เพิ่มข้อมูลอื่น ๆ ตามต้องการ */}
      </div>

      <div className="mt-6 w-full">
        <h2 className="text-2xl font-semibold mb-3">ประวัติการจอง</h2>

        <Table >
          <TableHeader>
            <TableColumn className="text-lg">รูปภาพ</TableColumn>
            <TableColumn className="text-lg">สถานที่ท่องเที่ยว</TableColumn>
            <TableColumn className="text-lg">โรงแรม</TableColumn>
            <TableColumn className="text-lg">ระยะเวลา</TableColumn>
            <TableColumn className="text-lg" >ราคา</TableColumn>
          </TableHeader>
          <TableBody>
  {!userData.result ? (
    <TableRow>
      <TableCell colSpan={5} className="text-center text-gray-500">
        ไม่พบข้อมูล
      </TableCell>
    </TableRow>
  ) : (
    userData.result.map((item: any, idx: number) => (
      <TableRow key={idx}>
        <TableCell>
          <img
            src={item.image}
            alt="preview"
            className="w-20 h-16 rounded object-cover"
          />
        </TableCell>
        <TableCell>{item.touristSpot}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>
          {item.start} - {item.end}
        </TableCell>
        <TableCell>{parseFloat(item.price).toFixed(2)} บาท</TableCell>
      </TableRow>
    ))
  )}
</TableBody>

        </Table>
      </div>
    </div>
  );
}
