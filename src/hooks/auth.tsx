import React,
{
    createContext,
    ReactNode,
    useContext,
    useState
} from 'react';

import * as AuthSession from 'expo-auth-session';

import {
    CDN_IMAGE,
    CLIENT_ID,
    REDIRECT_URI,
    RESPONSE_TYPE,
    SCOPE
} from '../configs';

import { api } from '../services/api';

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User;
    signIn: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

type AuthorizationReponse = AuthSession.AuthSessionResult & {
    params: {
        access_token: string;
    }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);

    async function signIn() {
        try {
            setLoading(true);

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession
                .startAsync({ authUrl: authUrl }) as AuthorizationReponse;

            //utilizamos o "api.defaults.headers", para que todas as requisições feitas depois que o usuário fez a autenticação, sejam feitas com o token.
            if (type === 'success') {
                api.defaults.headers.authorization = `Bearer ${params.access_token}`
            }

        } catch {
            throw new Error('Não foi possivel autenticar');
        }
    }

    return (
        <AuthContext.Provider value={{ user, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export {
    AuthProvider,
    useAuth
}