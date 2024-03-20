import { Dispatch, SetStateAction, useState } from "react";

/**
 * React hook to toggle a boolean value
 * @param initialValue initial value of the boolean
 * @param debounce debounce time in milliseconds
 * @returns [value, toggle]
 */
export function useToggle(
  initialValue = false
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  return [value, toggle, setValue];
}
