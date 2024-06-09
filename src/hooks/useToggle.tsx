import { Dispatch, SetStateAction, useCallback, useState } from "react";

/**
 * React hook to toggle a boolean value
 * @param initialValue initial value of the boolean, default is false
 * @returns [value, toggle]
 */
export function useToggle(
  initialValue = false
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setValue];
}
