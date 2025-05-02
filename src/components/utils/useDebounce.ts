import { useMemo, useState, useEffect } from "react";

export type UseDebounceReturn = string;

export function useDebounce(value: string, delay = 800): UseDebounceReturn {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  const memoizedValue = useMemo(() => debouncedValue, [debouncedValue]);

  return memoizedValue;
}
