import React from "react";
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
    ImageBackground,
    Text
} from 'react-native';

import { theme } from "../../global/styles/theme";
import BannerImg from '../../assets/banner.png';

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";

import { styles } from "./styles";

export function AppointmentDetails() {
    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    <BorderlessButton>
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <Text style={styles.title}>
                    Lendários
                </Text>
                <Text style={styles.subtitle}>
                    É hoje que vamos chegar ao challenger sem perder uma partida da md10
                </Text>
            </ImageBackground>
        </Background>
    );
} 