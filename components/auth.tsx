/* eslint-disable prettier/prettier */
"use client";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { NavbarItem } from "@heroui/navbar";
import { Avatar } from "@heroui/avatar";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function AuthNav() {
  const [auth, setAuth] = useState<boolean>(false);
  const router = useRouter();
  const [loading,setLoading] = useState<boolean>(false);
  useEffect(() => {
    setAuth(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    
    router.push('/') 
    window.location.reload(); // หรือจะใช้ router.push('/') ก็ได้
  };

  // useEffect(() => {
  //   loading ? 
  // }
  // },[loading])
  return (
    <div className="flex gap-3">
      {auth ? (
        <div className="flex gap-3">
            <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold px-4 py-2 rounded"
        >
          ออกจากระบบ
        </button>
        <Link onClick={() => {
            setLoading(true)
        }}
        href="/profile">
        <Avatar showFallback className="cursor-pointer"  src="https://images.unsplash.com/broken" />

        </Link>
        </div>
        
      ) : (
        <>
          <NavbarItem key={"login"}>
            <NextLink
              className={clsx(
                "data-[active=true]:text-primary data-[active=true]:font-medium  font-bold",
              )}
              href={"/login"}
            >
              {"เข้าสู่ระบบ"}
            </NextLink>
          </NavbarItem>
          <NavbarItem key={"register"}>
            <NextLink
              className={clsx(
                "data-[active=true]:text-primary data-[active=true]:font-medium bg-[#3DCBFF]  font-bold",
              )}
              href={"/register"}
            >
              <p className="text-white">{"สมัครสมาชิก"}</p>
            </NextLink>
          </NavbarItem>
        </>
      )}
    </div>
  );
}
