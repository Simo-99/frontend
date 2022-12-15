import { useEffect, useCallback } from 'react';

function useBind(key, tag) {

    const cb = useCallback(() => document.getElementsByClassName(tag)[0].click(), [tag])

    useEffect(() => {

        const handle = (event) => { if (event.keyCode === key) cb() }

        document.addEventListener("keydown", handle)
        return () => document.removeEventListener("keydown", handle)

    }, [key])

}
export default useBind