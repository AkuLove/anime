import { useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement> | null,
  callback: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      ref &&
      ref.current &&
      !ref.current.contains(e.target)
    ) {
      e.stopPropagation();
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClick, true);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};
