import { useEffect, useRef } from 'react';

export const useOutsideClick = (cb: any) => {
    const ref = useRef();

    useEffect(() => {
        const handleClick = (e:any) => {
            //@ts-ignore
            if (ref.current && !ref.current.contains(e.target)) {
                cb();
            }
        };
        document.addEventListener('click', handleClick, true);
        return () => {
            document.removeEventListener('click', handleClick, true);
        }

    }, [ref, cb]);
    return ref;
}