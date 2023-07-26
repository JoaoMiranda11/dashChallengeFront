"use client"

import { useRef, useEffect, useState, ReactNode, forwardRef, useImperativeHandle, useCallback } from 'react'
import { createPortal } from 'react-dom'
import styles from "./style.module.css"
import Image from 'next/image'
import { ModalProps } from './types'

export type ModalFunctions = {
    switchVisibility: (newState?: boolean) => void;
}

export const Modal = forwardRef<ModalFunctions, ModalProps>(function ModalRef(props, ref) {
  const divRef = useRef<Element | null>(null)
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const switchVisibility = useCallback((newState?: boolean) => {
    setVisible(prev => newState === undefined ? !prev : newState)
  }, [])

  const closeFunc = useCallback(() => {
    props.onClose?.()
    switchVisibility(false)
  }, [props, switchVisibility])
  
  useEffect(() => {
    divRef.current = document.querySelector<HTMLElement>("#portal")
    setMounted(true)
  }, [])

  useImperativeHandle(ref, () => {
    return {
        switchVisibility
    };
  }, [switchVisibility]);

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
          {props.children}
        </div>
      </div>
    </div>
  )

  return (mounted && divRef.current && visible) ? createPortal(ModalComponent, divRef.current) : null
})