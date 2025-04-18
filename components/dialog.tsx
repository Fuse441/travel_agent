/* eslint-disable prettier/prettier */
import React from 'react'
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, useDisclosure} from "@heroui/modal";
import { Button } from '@heroui/button';
import { FailIcon, SuccessIcon } from './icons';
import { useRouter } from 'next/navigation';
export default function Dialog({
    modal,
    dialogOpen,
    onClose,
  }: {
    modal : any
    dialogOpen: boolean;
    onClose: () => void;
  }
    
  ) {
    const route = useRouter();

  return (
    <>
    <Modal isOpen={dialogOpen} onOpenChange={onClose} size='xl'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{modal.header}</ModalHeader>
            <ModalBody>
                <div className='flex justify-center flex-col items-center gap-5'>
                  {modal.icon == "Fail" ? (
                    <div>
                           <FailIcon size={150} className="text-green-500"/>
                    </div>
                   ) :<div>
                   <SuccessIcon size={150} className="text-green-500"/>
            </div>}
                <p className='font-bold'>{ modal.body || "ดำเนินการสำเร็จ"}</p>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className='flex justify-center items-center w-full'>
                <Button color="primary" onPress={() => {
                     modal.route == "current" ? onClose() : route.push(modal.route || "/")
                }}>
                {modal.btnMessage || "กลับหน้าหลัก"}
              </Button>
                </div>
            
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>
  )
}
