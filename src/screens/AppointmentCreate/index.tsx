import React from "react";

import {
    Text,
    View,
} from 'react-native';

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";

export function AppointmentCreate() {

    return (
        <Background>
            <Header title="Agendar partida" />
        </Background>
    );
} 