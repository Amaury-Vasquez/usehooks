import { RefObject, useState } from "react";
import { useOnClickOutside } from "@/hooks";

/**
 * React hook to toggle a menu panel
 * @param ref React reference to the panel
 * @param initialIsOpen initial value of the boolean
 * @param timeout debounce time in milliseconds
 * @returns {isPanelOpen, togglePanel, isPanelClosing}
 */

export function useToggleMenu<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  initialIsOpen = false,
  timeout = 200
) {
  const [isPanelOpen, setIsPanelOpen] = useState(initialIsOpen);
  const [isPanelClosing, setIsPanelClosing] = useState(false);

  const openPanel = () => setIsPanelOpen(true);

  const closePanel = () => {
    setIsPanelClosing(true);
    /**
     * The animation takes Xms, so we wait X-10ms before setting the panel to closed
     * to avoid the panel flickering when the animation is almost done
     * */
    setTimeout(() => {
      setIsPanelClosing(false);
      setIsPanelOpen(false);
    }, timeout - 20);
  };

  const togglePanel = () => {
    if (isPanelOpen) {
      closePanel();
    } else {
      openPanel();
    }
  };

  useOnClickOutside(ref, closePanel);

  return { isPanelOpen, togglePanel, isPanelClosing };
}
