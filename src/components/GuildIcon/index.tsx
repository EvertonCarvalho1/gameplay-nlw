import React from "react";
import {
    Image,
    View
} from "react-native";

import { styles } from "./styles";
import DiscordSvg from '../../assets/discord.svg';

const { CDN_IMAGE } = process.env;

type Props = {
    guildId: string;
    iconId: string;
}

export function GuildIcon({ guildId, iconId }: Props) {
    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`

    //'https://s2.glbimg.com/ZByPrW3xLJR8fIC1BkE2nq56NiI=/0x0:1514x917/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/h/w/Abq4oBSySsO0xmGnkDlg/discord.jpg'

    return (
        <View>
            {
                iconId ?
                    <Image
                        source={{ uri: uri }}
                        style={styles.image}
                        resizeMode='cover'
                    />
                    :
                    <DiscordSvg
                        width={40}
                        height={40}
                    />
            }
        </View>
    );
} 