import React, { useContext } from "react";
import {
    View,
    Text,
    Image,
    StatusBar
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from '../../context/auth';

import { ButtonIcon } from "../../components/ButtonIcon";
import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';
import { Background } from "../../components/Background";


export function SignIn() {
    const context = useContext(AuthContext);

    console.log(context)

    const navigation = useNavigation();

    function handleSignIn() {
        navigation.navigate('Home');
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

                    <ButtonIcon
                        title='Entrar com Discord'
                        onPress={handleSignIn}
                    />
                </View>
            </View>
        </Background>
    );
}