import React from "react";
import { RectButton } from 'react-native-gesture-handler'
import { View, Text } from "react-native";

import { styles } from "./styles";

export type GuildProps = {

}

export type AppointmentProps = {
    id: string;
    guild: GuildProps;
    category: string;
    date: string;
    description: string;
}

type Props = RectButton & {
    data: AppointmentProps;
}

export function Appointment({ data, ...rest }: Props) {

    return (
        <RectButton
            style={styles.container}
            {...rest}
        >

        </RectButton>
    );
}