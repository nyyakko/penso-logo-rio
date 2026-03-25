import { easeOutElastic } from "../Utils/Easings";

import { Pressable } from "react-native";
import { ReactNode, useReducer } from "react";
import { MotiView } from "moti";
import Tilt from "react-parallax-tilt";

type FlipCardProps = {
    children: ReactNode[];
    tilt?: boolean;
    onFlip?: () => void;
    className?: string;
}

export default function FlipCard({ children, tilt, onFlip, className }: FlipCardProps)
{
    const [isRevealed, setRevealed] = useReducer((state) => !state, false);
    const [isPressed, setPressed] = useReducer((state) => !state, false);

    return (
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className={className} tiltEnable={tilt || false}>
            <Pressable
                onPress={() => {
                    setRevealed();
                    onFlip?.();
                }}
                onPressIn={setPressed}
                onPressOut={setPressed}
                className="w-full h-full"
            >
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
