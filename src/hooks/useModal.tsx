import { RefObject, useCallback, useRef } from "react";

export function useModal(): [
  RefObject<HTMLDialogElement>,
  () => void,
  () => void
] {
  const ref = useRef<HTMLDialogElement>(null);

  const openModal = useCallback(() => ref.current?.show(), [ref]);
  const closeModal = useCallback(() => ref.current?.close(), [ref]);

  return [ref, openModal, closeModal];
}
