import React from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    Alert,
    ActivityIndicator
} from 'react-native';

import { useNavigation } from "@react-navigation/native";

import { useAuth } from '../../hooks/auth';

import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';
import { theme } from "../../global/styles/theme";

import { ButtonIcon } from "../../components/ButtonIcon";
import { Background } from "../../components/Background";

export function SignIn() {
    const navigation = useNavigation();
    const { signIn, loading } = useAuth();

    async function handleSignIn() {
        try {
            await signIn()
        } catch (error) {
            Alert.alert('Não foi possivel autenticar!');
        }
    }

    return (
        <Background>
            <View style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='transparent'
                    translucent
                />
                <Image
                    source={IllustrationImg}
                    style={styles.image}
                    resizeMode='stretch'
                />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        Conecte-se{`\n`}
                        e organize suas{`\n`}
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games{`\n`}
                        favoritos com seus amigos
                    </Text>
                    {
                        loading ? <ActivityIndicator color={theme.colors.primary} /> :
                            <ButtonIcon
                                title='Entrar com Discord'
                                onPress={handleSignIn}
                            />
                    }

                    {/* <ButtonIcon
                        title='Entrar com Discord'
                        onPress={handleSignIn}
                    /> */}
                </View>
            </View>
        </Background>
    );
}