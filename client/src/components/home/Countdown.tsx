import io from "socket.io-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
const Countdown = () => {
    // in seconds
    const [timer, setTimer] = useState(300);

    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    const { userId } = useAuth();

    const notifyTimerEnd = () => {
        toast.success("IT REACHED 00000");
        // const audio = new Audio(
        //     "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
        // );
        // audio.play();
    };

    useEffect(() => {
        const socket = io("ws://localhost:3001");
        socket.on("timer", (newTimer) => {
            setTimer(newTimer);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (timer === 0) notifyTimerEnd();
        setMinutes(Math.floor(timer / 60));
        setSeconds(timer % 60);
    }, [timer]);
    return (
        <section className="mx-auto w-fit text-center my-24">
            <div
                className={`countdown font-mono text-9xl ${
                    timer < 1240 ? "bg-orange-600" : "bg-red-600 "
                } p-10 rounded-lg text-zinc-300`}
            >
                {/* @ts-ignore */}
                <span style={{ "--value": 0 }}></span>:{/* @ts-ignore */}
                <span style={{ "--value": minutes }}></span>:{/* @ts-ignore */}
                <span style={{ "--value": seconds }}></span>
            </div>
        </section>
    );
};

export default Countdown;
