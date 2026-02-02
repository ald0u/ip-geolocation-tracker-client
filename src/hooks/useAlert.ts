import { useCallback, useEffect, useRef, useState } from 'react'
import type { AlertState, AlertType } from '../types'

export const useAlert = (defaultAutoClose = 5000) => {
  const [alert, setAlert] = useState<AlertState>({
    isOpen: false,
    type: 'info',
    message: '',
  })

  const timeoutRef = useRef<number | null>(null);

  const showAlert = useCallback(
    <T extends AlertType>(
      type: T,
      message: string,
      title?: string,
      autoClose?: number
    ): void => {
      setAlert({ isOpen: true, type, message, title, autoClose });
      const closeTime = autoClose ?? (autoClose === 0 ? 0 : defaultAutoClose);
      if (closeTime > 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
          setAlert((prev) => ({ ...prev, isOpen: false }));
        }, closeTime);
      }
    }, [defaultAutoClose])

  const hideAlert = useCallback((): void => {
    setAlert((prev) => ({ ...prev, isOpen: false }));
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { alert, showAlert, hideAlert };
}