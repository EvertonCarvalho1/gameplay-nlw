import React from "react";
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
    ImageBackground,
    Text,
    View,
    FlatList
} from 'react-native';

import { theme } from "../../global/styles/theme";
import BannerImg from '../../assets/banner.png';

import { Background } from "../../components/Background";
import { ListHeader } from "../../components/ListHeader";
import { Header } from "../../components/Header";

import { styles } from "./styles";
import { Members } from "../../components/Members";

export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            username: 'Jolielton',
            avatar_url: 'https://avatars.githubusercontent.com/u/87612078?v=4',
            status: 'online'
        },
        {
            id: '2',
            username: 'Everton',
            avatar_url: 'https://avatars.githubusercontent.com/u/82480230?v=4',
            status: 'offline'
        },
        {
            id: '3',
            username: 'Jhon',
            avatar_url: 'https://avatars.githubusercontent.com/u/84046012?v=4',
            status: 'online'
        },
    ]

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
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        Lendários
                    </Text>
                    <Text style={styles.subtitle}>
                        É hoje que vamos chegar ao challenger sem perder uma partida da md10
                    </Text>
                </View>
            </ImageBackground>

            <ListHeader
                title="Jogadores"
                subtitle="Total 3"
            />
            <FlatList
                data={members}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Members
                        data={item}
                    />
                )}
            />
        </Background>
    );
} 