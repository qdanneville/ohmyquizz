import { useEffect } from "react"
import { useDispatch } from "react-redux"

export function useTitle(props) {
    const dispatch = useDispatch();

    if (!props) return

    useEffect(() => {
        dispatch({ type: "SET_TITLE", payload: props });
    }, [])

    return true
}