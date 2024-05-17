import {useState, useEffect} from "react";

function useCurrentTime() {
    const [currentTime, setCurrentTime] = useState();
    useEffect(() => {
        setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    })
    return currentTime;
};

export default useCurrentTime;