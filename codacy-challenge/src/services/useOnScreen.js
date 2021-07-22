import { useState, useEffect } from 'react';

export const useOnScreen = (ref) => {

    const [isIntersecting, setIntersecting] = useState(false)

    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    )

    useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current);
            return () => { observer.disconnect() }
        }
    })

    return isIntersecting
}