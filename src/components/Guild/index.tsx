import React from "react";
import { TouchableOpacity, TouchableOpacityProps, View, Text } from "react-native";

import { styles } from "./styles";

import { GuildIcon } from "../GuildIcon";

export interface GuildProps {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
}

type Props = TouchableOpacityProps & {
    data: GuildProps;
}

export function Guild({ data, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            {...rest}
        >
            <GuildIcon />
            <View style={styles.content}>
                <View>
                    <Text>

                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

