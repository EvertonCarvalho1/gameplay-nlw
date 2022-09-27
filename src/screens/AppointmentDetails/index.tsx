import React, { useState, useEffect } from "react";
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from "@react-navigation/native";
import * as Linking from 'expo-linking';

import {
    ImageBackground,
    Text,
    View,
    FlatList,
    Alert,
    Platform,
    Share
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

    function handleShareInvitation() {
        const message = Platform.OS == 'ios'
            ? `Junte-se a ${guildSelected.guild.name}`
            : 'https://discord.com/';

        Share.share({
            message: message,
            url: 'https://discord.com/'
        });
    }

    function handleOpenGuild() {
        Linking.openURL('https://discord.com/')
    }

    useEffect(() => {
        fetchGuildInfo();
    }, []);

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    guildSelected.guild.owner &&
                    <BorderlessButton>
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                            onPress={handleShareInvitation}
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



            {loading ? <Load /> :
                <>


                    <ListHeader
                        title="Jogadores"
                        subtitle={Object.keys(widget).length === 0 ? `Sem dados` : `Total ${widget.members.length}`}
                    />
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
                </>
            }
            <View style={styles.footer}>
                {Object.keys(widget).length !== 0 &&
                    <ButtonIcon
                        title="Entrar no servidor do Discord"
                        onPress={handleOpenGuild}
                    />
                }
            </View>
        </Background>
    );
} 