import { faClockRotateLeft, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { Text, View } from "react-native";
import { useAudioPlayer } from "expo-audio";
import { useState } from "react";

import Dock from "./Components/Dock";
import FlipCard from "./Components/FlipCard";
import { getRandomSound } from "./Utils/soundEffects";

import "./global.css"

const JOKES = [
    {
        question: "Por que o Platão não consegue passar em Filosofia?",
        answer: "Porque ele acha que as provas são só sombras na caverna e a nota real está em outro plano.",
        favorited: false,
        details: {
            field: "Metafísica",
        },
    },
] as const;

type Joke = {
    question: string;
    answer: string;
    favorited: boolean;
    date: Date;
    details: {
        field: string;
    }
};

type JokeOfTheDayProps = {
    joke: Joke;
    onFavorite?: () => void;
};

function JokeOfTheDay({ joke, onFavorite }: JokeOfTheDayProps)
{
    const player = useAudioPlayer(getRandomSound());

    return (
        <View className="flex-1 w-full items-center justify-evenly">
            <View className="flex items-center select-none">
                <Text className="font-bold text-4xl 2xl:text-5xl text-white">Piada do Dia</Text>
            </View>
            <FlipCard tilt onFlip={() => player.play()} onFavorite={onFavorite} className="w-[50%] h-[70%] drop-shadow-2xl">
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

type PreviousJokesProps = { jokes: Joke[] };

function PreviousJokes({ jokes }: PreviousJokesProps)
{
    const jokesTemplate = (joke: Joke) => {
        return (
            <View className="w-[50%] h-[70%] gap-4">
                <View className="flex select-none">
                    <Text className="text-lg 2xl:text-xl text-white">
                    {
                        joke.date.toLocaleString("pt-br", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })
                    }
                    </Text>
                </View>
                <FlipCard tilt className="flex-1 drop-shadow-2xl">
                {[
                    <View className="h-full p-8 bg-gradient-to-br from-red-400 to-red-600 rounded-3xl items-center justify-evenly border-red-500 border-2 select-none">
                        <Text className="rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-2 absolute text-white bottom-4 left-4 border-orange-500 border-2 text-lg 2xl:text-xl">
                            { joke.details.field }
                        </Text>
                        <Text className="text-6xl 2xl:text-6xl">🤔</Text>
                        <Text className="text-white text-center text-3xl 2xl:text-4xl">{joke.question}</Text>
                        <Text className="text-white text-lg 2xl:text-xl">Clique para ver a resposta</Text>
                    </View>,
                    <View className="h-full p-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl items-center justify-evenly border-orange-500 border-2 select-none">
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
    };

    return (
        <View className="flex-1 w-full items-center justify-evenly overflow-y-scroll gap-4">
            <View className="flex items-center select-none">
                <Text className="font-bold text-4xl 2xl:text-5xl text-white">Piadas Anteriores</Text>
            </View>
            { jokes.map(jokesTemplate) }
        </View>
    );
}

export default function App()
{
    const [currentWindowIndex, setWindowIndex] = useState(0);

    const [jokes, setJokes] = useState(JOKES.map((joke, i): Joke => {
        let date = new Date();
        date.setDate(date.getDate() - i);
        return { ...joke, date };
    }));

    const joke: Joke = jokes[0];

    return (
        <View className="flex-1 items-center justify-center p-4 gap-4">
            <View className="inset-0 absolute bg-gradient-to-br from-red-500 to-red-800 brightness-[70%]" />

            { currentWindowIndex === 0 && <JokeOfTheDay joke={joke} />}
            { currentWindowIndex === 1 && <PreviousJokes jokes={jokes} />}

            <Dock options={[
                { icon: faClockRotateLeft, action: () => setWindowIndex(0) },
                { icon: faHeart, action: () => setWindowIndex(1) },
                { icon: faShare, action: () => setWindowIndex(2) }
            ]}/>
        </View>
    );
}
