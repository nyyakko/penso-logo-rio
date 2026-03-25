import { Pressable, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type DockProps = {
    options: {
        icon: IconDefinition;
        action: () => void;
    }[];
};

export default function Dock({ options }: DockProps)
{
    return (
        <View className="flex flex-row p-4 gap-4 text-xl 2xl:text-2xl rounded-xl bg-red-500 text-orange-800 drop-shadow-2xl border-red-500 border-2">
        {
            options.map(option => {
                return (
                    <Pressable onPress={option.action} className="flex-1 p-4 bg-orange-400 rounded-xl transition hover:scale-[1.2]">
                        <FontAwesomeIcon icon={option.icon} />
                    </Pressable>
                )
            })
        }
        </View>
    );
}
