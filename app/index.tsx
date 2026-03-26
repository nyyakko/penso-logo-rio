import { faClockRotateLeft, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { Text, View } from "react-native";
import { useAudioPlayer } from "expo-audio";

import Dock from "./Components/Dock";
import FlipCard from "./Components/FlipCard";
import { getRandomSound } from "./Utils/soundEffects";

import "./global.css"

type JokeOfTheDayProps = {
    joke: {
        question: string;
        answer: string;
        details: {
            field: string;
            article: string;
        }
    };
};

function JokeOfTheDay({ joke }: JokeOfTheDayProps)
{
    const player = useAudioPlayer(getRandomSound());

    return (
        <View className="flex-1 w-full items-center justify-evenly">
            <View className="flex items-center select-none">
                <Text className="font-extrabold text-4xl 2xl:text-5xl text-white">Piada do Dia</Text>
            </View>
            <FlipCard tilt className="w-[50%] h-[70%] drop-shadow-2xl" onFlip={() => player.play()}>
            {[
                <View className="flex-1 p-8 bg-gradient-to-br from-red-400 to-red-600 rounded-3xl items-center justify-evenly border-red-500 border-2 select-none">
                    <Text className="rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-2 absolute text-white bottom-4 left-4 border-orange-500 border-2 text-lg 2xl:text-xl">
                        { joke.details.field }
                    </Text>
                    <Text className="text-6xl 2xl:text-6xl">🤔</Text>
                    <Text className="text-white text-center text-3xl 2xl:text-4xl">{joke.question}</Text>
                    <Text className="text-white text-lg 2xl:text-xl">Clique para ver a resposta</Text>
                </View>,
                <View className="flex-1 p-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl items-center justify-evenly border-orange-500 border-2 select-none">
                    <Text className="rounded-full bg-gradient-to-br from-red-400 to-red-600 p-2 absolute text-white bottom-4 left-4 border-red-500 border-2 text-lg 2xl:text-xl">
                        { joke.details.field }
                    </Text>
                    <Text className="text-6xl 2xl:text-6xl">😂</Text>
                    <Text className="text-white text-center text-3xl 2xl:text-4xl">{joke.answer}</Text>
                    <Text className="text-white text-lg 2xl:text-xl">Clique para voltar</Text>
                </View>
            ]}
            </FlipCard>
        </View>
    );
}

export default function App()
{
    const jokes =
    [
        {
            question: "Por que o Platão não consegue passar em Filosofia?",
            answer: "Porque ele acha que as provas são só sombras na caverna e a nota real está em outro plano.",
            details: {
                field: "Metafísica",
                article: "theory_of_forms"
            }
        },
    ];

    const joke = jokes[0];

    return (
        <View className="flex-1 items-center justify-center p-4">
            <View className="inset-0 absolute bg-gradient-to-br from-red-500 to-red-800 brightness-[70%]" />

            <JokeOfTheDay joke={joke} />

            <Dock options={[
                { icon: faClockRotateLeft, action: () => {} },
                { icon: faHeart, action: () => {} },
                { icon: faShare, action: () => {} }
            ]}/>
        </View>
    );
}
