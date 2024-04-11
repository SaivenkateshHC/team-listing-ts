import { useEffect, useState } from "react";

function useDebounce(value: string, delay: number) {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timeout
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [value, delay]); // Only re-run the effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;
