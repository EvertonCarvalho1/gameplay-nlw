import React, { useState, useEffect } from "react";
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from "@react-navigation/native";

import {
    ImageBackground,
    Text,
    View,
    FlatList,
    Alert
} from 'react-native';

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import BannerImg from '../../assets/banner.png';

import { AppointmentProps } from "../../components/Appointment";
import { Background } from "../../components/Background";
import { ListHeader } from "../../components/ListHeader";
import { Header } from "../../components/Header";
import { ButtonIcon } from "../../components/ButtonIcon";
import { ListDivider } from "../../components/ListDivider";
import { MemberProps, Members } from "../../components/Members";
import { api } from "../../services/api";
import { Load } from "../../components/Load";

type Params = {
    guildSelected: AppointmentProps
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number;
}

export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const { guildSelected } = route.params as Params;

    async function fetchGuildInfo() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
        } catch (error) {
            Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGuildInfo();
    }, []);

    const members = [
        {
            id: '1',
            username: 'Jolielton',
            avatar_url: 'https://avatars.githubusercontent.com/u/87612078?v=4',
            status: 'online'
        },
        {
            id: '2',
            username: 'Enzo',
            avatar_url: 'https://s2.glbimg.com/ZByPrW3xLJR8fIC1BkE2nq56NiI=/0x0:1514x917/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/h/w/Abq4oBSySsO0xmGnkDlg/discord.jpg',
            status: 'offline'
        },
        {
            id: '3',
            username: 'Jhon',
            avatar_url: 'https://avatars.githubusercontent.com/u/84046012?v=4',
            status: 'offline'
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
                        {guildSelected.guild.name}
                    </Text>
                    <Text style={styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>

            <ListHeader
                title="Jogadores"
                subtitle="Total 3"
            />

            {loading ? <Load /> :
                <FlatList
                    data={widget.members}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Members
                            data={item}
                        />
                    )}
                    ItemSeparatorComponent={() => <ListDivider />}
                    style={styles.members}
                />

            }


            <View style={styles.footer}>
                <ButtonIcon
                    title="Entrar no servidor do Discord"
                />
            </View>


        </Background>
    );
} 