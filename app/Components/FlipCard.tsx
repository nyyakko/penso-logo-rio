import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MotiView } from "moti";
import { Pressable, View } from "react-native";
import { ReactNode, useEffect, useReducer, useState } from "react";
import Tilt from "react-parallax-tilt";

import { easeOutElastic, easeOutExpo } from "../Utils/easings";

type FlipCardProps = {
    children: ReactNode[];
    tilt?: boolean;
    className?: string;
    onFlip?: () => void;
    onFavorite?: () => void;
}

export default function FlipCard({ children, tilt, className , onFlip, onFavorite }: FlipCardProps)
{
    const [isRevealed, setRevealed] = useReducer((state) => !state, false);
    const [isPressed, setPressed] = useReducer((state) => !state, false);

    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => setTimer(previous => previous - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} tiltEnable={tilt || false} className={className}>
            <Pressable
                onPress={() => {
                    setRevealed();
                    onFlip?.();
                }}
                onLongPress={() => {
                    setTimer(2);
                    onFavorite?.();
                }}
                onPressIn={setPressed}
                onPressOut={setPressed}
                className="w-full h-full justify-center items-center"
            >
                <View className="absolute z-10">
                    <MotiView
                        from={{ scale: 0 }}
                        animate={{
                            scale: timer > 0 ? 8 : 0,
                            opacity: timer > 0 ? 1 : 0
                        }}
                        transition={{
                            type: "timing",
                            duration: 1000,
                            easing: easeOutExpo
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} color="red" className="text-xl drop-shadow-xl" />
                    </MotiView>
                </View>
                <MotiView
                    style={{ flex: 1, width: "100%", height: "100%" }}
                    animate={{ scale: !isPressed ? 1 : 0.9 }}
                    transition={{
                        type: "spring",
                        damping: 1500,
                        mass: 10
                    }}
                >
                    <MotiView
                        style={{ flex: 1, width: "100%", height: "100%", backfaceVisibility: "hidden" }}
                        animate={{ rotateY: !isRevealed ? "0deg" : "180deg" }}
                        transition={{
                            type: "timing",
                            duration: 4000,
                            easing: easeOutElastic
                        }}
                    >
                        { children[0] }
                    </MotiView>
                    <MotiView
                        style={{ flex: 1, width: "100%", height: "100%", backfaceVisibility: "hidden", position: "absolute" }}
                        animate={{ rotateY: isRevealed ? "360deg" : "180deg" }}
                        transition={{
                            type: "timing",
                            duration: 4000,
                            easing: easeOutElastic
                        }}
                    >
                        { children[1] }
                    </MotiView>
                </MotiView>
            </Pressable>
        </Tilt>
    )
}
