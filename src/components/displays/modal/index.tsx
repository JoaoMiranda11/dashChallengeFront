"use client"

import { useRef, useEffect, useState, useContext, forwardRef, useImperativeHandle, useCallback, createContext } from 'react'
import { createPortal } from 'react-dom'
import styles from "./style.module.css"
import Image from 'next/image'
import { ModalProps } from './types'

export type ModalFunctions<T> = {
  switchVisibility: (newState?: boolean) => void;
  setModalData: (data?: T) => void;
  getModalData: () => T;
}

export type ModalContextFunctions<T> = {
  switchVisibility: (newState?: boolean) => void;
  setModalData: (data?: T) => void;
  data: T | null;
}

const ModalContext = createContext<ModalContextFunctions<any>>({
  data: null,
  setModalData: (newState?: boolean | undefined) => {},
  switchVisibility: () => {}
});

export const Modal = forwardRef<ModalFunctions<any>, ModalProps>(function ModalRef(props, ref) {
  const divRef = useRef<Element | null>(null);
  const [data, setData] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const switchVisibility = useCallback((newState?: boolean) => {
    setVisible(prev => newState === undefined ? !prev : newState)
  }, [])

  const closeFunc = useCallback(() => {
    props.onClose?.()
    switchVisibility(false)
  }, [props, switchVisibility])

  const setModalData = useCallback((data: any) => {
    setData(data);
  }, [])

  const getModalData = useCallback(() => data, [data])
  
  useEffect(() => {
    divRef.current = document.querySelector<HTMLElement>("#portal")
    setMounted(true)
  }, [])

  useImperativeHandle(ref, () => {
    return {
        switchVisibility,
        setModalData,
        getModalData
    };
  }, [getModalData, setModalData, switchVisibility]);

  const ModalComponent = (
    <div className={styles.modalBg}>
      <div className={styles.modal} style={props.style} >
        <div className={styles.headerContainer} >
          <span>
            {props.title}
          </span>
          <Image onClick={closeFunc} style={{cursor: "pointer"}} width={30} height={30} src={"icons/close.svg"} alt="x" />
        </div>
        <div className={styles.bodyContainer} >
          <ModalContext.Provider value={{data, switchVisibility, setModalData}}>
            {props.children}
          </ModalContext.Provider>
        </div>
      </div>
    </div>
  )

  return (mounted && divRef.current && visible) ? createPortal(ModalComponent, divRef.current) : null
})

export function useModalContext<T>() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('ModalContext must be used within a ModalProvider');
  }
  return context as ModalContextFunctions<T>;
};