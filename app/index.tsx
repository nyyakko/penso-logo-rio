import { Button, Text, View } from "react-native";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faChartLine, faChessKnight, faClockRotateLeft, faHeart, faIndustry, faShare, faWallet } from "@fortawesome/free-solid-svg-icons";

import "./global.css"

export default function App()
{
    return (
        <View className="flex-1 items-center justify-center p-4">
            <View className="inset-0 absolute bg-gradient-to-br from-blue-500 to-blue-800 brightness-[70%]" />

            <View className="flex-1 w-full items-center justify-evenly">
                <View className="flex items-center">
                    <Text className="font-extrabold text-4xl text-white">Piada do Dia</Text>
                    <Text className="text-lg text-white">{new Date().toLocaleString("pt-BR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })}</Text>
                </View>
                <View className="flex w-[50%] h-[70%] p-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl items-center justify-evenly">
                    <Text className="text-6xl">🤔</Text>
                    <Text className="text-white text-center text-3xl">Por que Descartes não confia em elevadores?</Text>
                    <Text className="text-sm text-white">Clique para ver a resposta</Text>
                </View>
            </View>

            <View className="flex flex-row p-4 gap-4 rounded-xl bg-blue-500">
                <View className="flex-1 p-4 bg-yellow-400 rounded-xl">
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                </View>
                <View className="flex-1 p-4 bg-yellow-400 rounded-xl">
                    <FontAwesomeIcon icon={faHeart} />
                </View>
                <View className="flex-1 p-4 bg-yellow-400 rounded-xl">
                    <FontAwesomeIcon icon={faShare} />
                </View>
            </View>
        </View>
    );
}
