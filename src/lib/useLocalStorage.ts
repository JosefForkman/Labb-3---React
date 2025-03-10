import { useState } from "react";

export default function useLocalStorage<T>(
    key: string,
    initialValue: T,
): [T, (value: T) => void] {
    const items = localStorage.getItem(key);
    
    const [value, setValue] = useState<T>(
        items ? JSON.parse(items) : initialValue,
    );

    const setItem = (newValue: T) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, setItem];
}
