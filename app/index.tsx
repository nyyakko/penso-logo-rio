import { faClockRotateLeft, faHeart, faHome, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, View } from "react-native";
import { useAudioPlayer } from "expo-audio";
import { useState } from "react";

import Dock from "./Components/Dock";
import FlipCard from "./Components/FlipCard";

import { getRandomSound } from "./Utils/soundEffects";
import shuffleArray from "./Utils/shuffleArray";

import "./global.css"

const JOKES = [
    {
        question: "Como o solipsista terminou o namoro?",
        answer: "Não é você, sou eu.",
        details: {
            fields: ["Solipsismo"]
        }
    },
    {
        question: "Por que o filósofo não atravessou a rua?",
        answer: "Ele ficou ocupado discutindo a definição de 'atravessar'.",
        details: {
            fields: ["Filosofia da Linguagem"]
        }
    },
    {
        question: "O que dois behavioristas disseram um para o outro depois de comer um pastel?",
        answer: "Foi bom pra você, foi bom pra mim?",
        details: {
            fields: ["Behaviorismo"]
        }
    },
    {
        question: "O que dizem os filósofos quando não fizeram nada para o jantar?",
        answer: "Só sei que nada assei.",
        details: {
            fields: ["Epistemologia"]
        }
    },
    {
        question: "O que Marx disse para Engels quando estavam entediados?",
        answer: "Vamos passar um Trotsky?",
        details: {
            fields: ["Marxismo"]
        }
    },
    {
        question: "Qual o jogo favorito do filósofo?",
        answer: "É o 'Nietzsche for Speed'.",
            details: {
                fields: ["Filosofia de Nietzsche"]
            }
    },
    {
        question: "Por que Aristóteles tentou ser ator?",
        answer: "Pra mostrar que tinha potencial.",
        details: {
            fields: ["Metafísica", "Potencial e Ato"]
        }
    },
    {
        question: "Ofereceram cerveja a David Hume, o que ele disse?",
        answer: "Não tenho o hábito.",
        details: {
            fields: ["Empirismo", "Causalidade"]
        }
    },
    {
        question: "Perguntaram a Tomás de Aquino qual o melhor caminho pro cinema, o que ele disse?",
        answer: "Há 5 vias e um segredo.",
        details: {
            fields: ["Teologia", "Cinco Vias"]
        }
    },
    {
        question: "Como um positivista reage quando pego no flagra?",
        answer: "Não Conte pra ninguém, hein!?",
        details: {
            fields: ["Positivismo"]
        }
    }
];

type Joke = {
    question: string;
    answer: string;
    date: Date;
    details: {
        fields: string[];
    }
    favorited?: boolean;
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
            <FlipCard tilt onFlip={() => player.play() } onFavorite={onFavorite} className="w-[80%] lg:w-[50%] h-[70%] drop-shadow-2xl">
            {[
                <View className="w-full h-full p-8 bg-gradient-to-br from-red-400 to-red-600 rounded-3xl items-center justify-evenly border-red-500 border-2 select-none">
                    { joke.favorited &&
                        <View className="absolute top-4 right-4 text-4xl">
                            <FontAwesomeIcon color="red" icon={faHeart} />
                        </View>
                    }
                    <Text className="text-6xl 2xl:text-6xl">🤔</Text>
                    <Text className="text-white text-center text-3xl 2xl:text-4xl">{joke.question}</Text>
                    <Text className="text-white text-lg 2xl:text-xl">Clique para ver a resposta</Text>
                    <View className="flex-row absolute bottom-4 left-4 gap-2">
                    {
                        joke.details.fields.map((field, i) => {
                            return (
                                <Text key={i} className="rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white p-1 border-orange-500 border-2 2xl:text-lg">
                                    { field }
                                </Text>
                            );
                        })
                    }
                    </View>
                </View>,
                <View className="w-full h-full p-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl items-center justify-evenly border-orange-500 border-2 select-none">
                    { joke.favorited &&
                        <View className="absolute top-4 right-4 text-4xl">
                            <FontAwesomeIcon color="red" icon={faHeart} />
                        </View>
                    }
                    <Text className="text-6xl 2xl:text-6xl">😂</Text>
                    <Text className="text-white text-center text-3xl 2xl:text-4xl">{joke.answer}</Text>
                    <Text className="text-white text-lg 2xl:text-xl">Clique para voltar</Text>
                    <View className="flex-row absolute bottom-4 left-4 gap-2">
                    {
                        joke.details.fields.map((field, i) => {
                            return (
                                <Text key={i} className="rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white p-1 border-red-500 border-2 2xl:text-lg">
                                    { field }
                                </Text>
                            );
                        })
                    }
                    </View>
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
            <View className="w-[80%] lg:w-[50%] h-[70%] gap-4">
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
                        { joke.favorited &&
                            <View className="absolute top-4 right-4 text-4xl">
                                <FontAwesomeIcon color="red" icon={faHeart} />
                            </View>
                        }
                        <Text className="text-6xl 2xl:text-6xl">🤔</Text>
                        <Text className="text-white text-center text-3xl 2xl:text-4xl">{joke.question}</Text>
                        <Text className="text-white text-lg 2xl:text-xl">Clique para ver a resposta</Text>
                        <View className="flex-row absolute bottom-4 left-4 gap-2">
                        {
                            joke.details.fields.map((field, i) => {
                                return (
                                    <Text key={i} className="rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white p-1 border-orange-500 border-2 2xl:text-lg">
                                        { field }
                                    </Text>
                                );
                            })
                        }
                        </View>
                    </View>,
                    <View className="h-full p-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl items-center justify-evenly border-orange-500 border-2 select-none">
                        { joke.favorited &&
                            <View className="absolute top-4 right-4 text-4xl">
                                <FontAwesomeIcon color="red" icon={faHeart} />
                            </View>
                        }
                        <Text className="text-6xl 2xl:text-6xl">😂</Text>
                        <Text className="text-white text-center text-3xl 2xl:text-4xl">{joke.answer}</Text>
                        <Text className="text-white text-lg 2xl:text-xl">Clique para voltar</Text>
                        <View className="flex-row absolute bottom-4 left-4 gap-2">
                        {
                            joke.details.fields.map((field, i) => {
                                return (
                                    <Text key={i} className="rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white p-1 border-red-500 border-2 2xl:text-lg">
                                        { field }
                                    </Text>
                                );
                            })
                        }
                        </View>
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

    const [jokes, setJokes] = useState(shuffleArray(JOKES).map((joke, i): Joke => {
        let date = new Date();
        date.setDate(date.getDate() - i);
        return { ...joke, date };
    }));

    const [joke, setJoke] = useState<Joke>(jokes[0]);

    const onFavorite = () => {
        const favoritedJoke = { ...joke, favorited: !joke.favorited };
        setJoke(favoritedJoke);
        jokes[jokes.findIndex(joke => joke.date == favoritedJoke.date)] = favoritedJoke;
        setJokes(jokes);
    };

    return (
        <View className="flex-1 items-center justify-center p-4 gap-4">
            <View className="inset-0 absolute bg-gradient-to-br from-red-500 to-red-800 brightness-[70%]" />

            { currentWindowIndex === 0 && <JokeOfTheDay joke={joke} onFavorite={onFavorite} />}
            { currentWindowIndex === 1 && <PreviousJokes jokes={jokes} />}

            <Dock options={[
                { icon: faHome, action: () => setWindowIndex(0) },
                { icon: faClockRotateLeft, action: () => setWindowIndex(1) },
                { icon: faShare, action: () => setWindowIndex(2) }
            ]}/>
        </View>
    );
}
