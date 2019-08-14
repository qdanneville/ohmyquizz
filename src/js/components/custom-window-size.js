import useWindowSize from '@rehooks/window-size';
import { useDispatch } from 'react-redux'

export function useAppIsFullscreen(props) {
    const dispatch = useDispatch();
    const windowSize = useWindowSize();

    if (windowSize.innerWidth < 900) {
        return dispatch({ type: "SET_APP_FULLSCREEN" });
    }

    return dispatch({ type: "RESET_APP_FULLSCREEN" });
}