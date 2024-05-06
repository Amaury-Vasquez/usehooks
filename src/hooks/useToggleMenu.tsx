import { RefObject, useCallback, useState } from "react";
import { useOnClickOutside } from "@/hooks";

/**
 * React hook to toggle a menu panel
 * @param ref React reference to the panel
 * @param initialIsOpen initial value of the boolean
 * @param timeout debounce time in milliseconds, default 200ms
 * @returns {isPanelOpen, togglePanel, isPanelClosing, showMenu}
 */

export function useToggleMenu<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  initialIsOpen = false,
  timeout = 200
) {
  const [isPanelOpen, setIsPanelOpen] = useState(initialIsOpen);
  const [isPanelClosing, setIsPanelClosing] = useState(false);

  const openPanel = useCallback(() => {
    if (!isPanelOpen) {
      setIsPanelOpen(true);
    }
  }, [isPanelOpen]);

  const closePanel = useCallback(() => {
    if (isPanelOpen) {
      setIsPanelClosing(true);
      /**
       * The animation takes Xms, so we wait X-10ms before setting the panel to closed
       * to avoid the panel flickering when the animation is almost done
       * */
      setTimeout(() => {
        setIsPanelClosing(false);
        setIsPanelOpen(false);
      }, timeout - 20);
    }
  }, [isPanelOpen, timeout]);

  const togglePanel = useCallback(() => {
    if (isPanelOpen) {
      closePanel();
    } else {
      openPanel();
    }
  }, [isPanelOpen, openPanel, closePanel]);

  useOnClickOutside(ref, closePanel);

  return {
    showMenu: isPanelOpen || isPanelClosing,
    isPanelOpen,
    togglePanel,
    isPanelClosing,
  };
}
