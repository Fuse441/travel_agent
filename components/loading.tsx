/* eslint-disable prettier/prettier */
import { Spinner } from '@heroui/spinner';
import React from 'react';


export default function Loading({
    status
}:{
    status:boolean
}) {
  return (
    <>
    {
        status ? (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/70">
            <Spinner size="lg" />
          </div>
        ) : (
            undefined
        )
    }
  </>
  );
}
