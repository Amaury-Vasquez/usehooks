import { useCallback, useState } from "react";

export type CopyToClipboard = (text: string) => Promise<boolean>;
export type CopiedText = string | null;

/**
 * React hook to copy a string to the clipboard
 * @returns {copyToClipboard}
 */
export function useCopyToClipboard(): [CopyToClipboard, CopiedText] {
  const [copiedText, setCopiedText] = useState<CopiedText>(null);
  /**
   * Handles copying a string to the clipboard
   * @returns copiedText: string | null
   */
  const copyToClipboard = useCallback(async (text: string) => {
    if (!navigator.clipboard) {
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (err) {
      console.error("Could not copy to clipboard", err);
      return false;
    }
  }, []);

  return [copyToClipboard, copiedText];
}
