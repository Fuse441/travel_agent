/* eslint-disable prettier/prettier */
import { Spinner } from '@heroui/spinner';
import React, { useEffect, useState } from 'react';

export default function Loading({
  status
}: {
  status: boolean
}) {
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (status) {
      setTimeoutReached(false); 
      timer = setTimeout(() => {
        setTimeoutReached(true);
      }, 15000);
    }

    return () => clearTimeout(timer); 
  }, [status]);

  return (
    <>
      {
        status ? (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/70">
            <div className='flex flex-col gap-y-3 text-center max-w-md p-4'>
              <Spinner size="lg" />
              {
                timeoutReached ? (
                  <p className="text-red-600 font-semibold">
                    ❗ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ในขณะนี้ โปรดลองใหม่อีกครั้งในภายหลัง
                  </p>
                ) : (
                  <p>
                    🧭 กำลังวิเคราะห์ข้อมูลสถานที่ท่องเที่ยวที่เหมาะกับคุณ...<br />
                    โปรดรอสักครู่
                  </p>
                )
              }
            </div>
          </div>
        ) : null
      }
    </>
  );
}
