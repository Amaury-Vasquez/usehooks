import { useState } from "react";

/**
 * React hook to toggle a boolean value
 * @param initialValue initial value of the boolean
 * @param debounce debounce time in milliseconds
 * @returns [value, toggle]
 */
export function useToggle(initialValue = false, debounce = 0) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  return { value, toggle };
}
