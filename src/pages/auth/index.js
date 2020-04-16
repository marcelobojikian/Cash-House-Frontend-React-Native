import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform, View, Text, Image, Alert } from 'react-native';
import { t } from 'i18n-js';

import logoImg from '../../assets/logo.png';

import { Button, Input, Loading } from '../../components/common';

import { doLogin, get } from '../../services/api';
import styles from './styles';

const SignIn = () => {

    const { navigate } = useNavigation();
    const { params } = useRoute();

    const messageParam = params ? params.message : null;

    const INITIAL = { mail: '@mail.com', password: 'test' }

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [login, setLogin] = useState(INITIAL);

    const _signInAsync = async () => {

        const { mail, password } = login;

        setMessage(null)
        if (!mail || !password) {
            setMessage(t('email or password is empty'))
            return
        }

        setLoading(true)
        const { error, message } = await doLogin(mail, password)
        
        if(error){
            setMessage(message)
            setLoading(false)
            return
        }

        const {data: detail} = await get('/users/self/detail');
        navigate('Transactions', { detail });

        setLoading(false)

    };

    const _registerAsync = async () => {

        const { mail, password } = login;

        setMessage(null)
        if (!mail || !password) {
            setMessage(t('email or password is empty'))
            return
        }

        if(true){
            Alert.alert('Not Yet :-)', 'Sistema em fase de teste, calma ai :P')
            return;
        }

        setLoading(true)
        /*await api.post('/register', {
            mail, password
        }).then((response) => {
            _signInAsync()
        }).catch((error) => {
            setMessage(error)
        }).finally(() => {
            setLoading(false)
        });*/

    };

    const _recoverAsync = async () => {

        if(true){
            Alert.alert('Not Yet :-)', 'Sistema em fase de teste, calma ai :P')
            return;
        }

        setLoading(true)
        setTimeout(async () => {
            setLoading(false)
            Alert.alert('Password Recovery Succeeded', 'Um e-mail foi enviado ao seu correio para recuerar a senha')
        }, 1000);

    };

    return (
        <KeyboardAvoidingView 
            behavior={'padding'}
            enabled={Platform.OS === 'ios'}
            style={styles.container}>

            {loading && <Loading />}

            <Image source={logoImg} style={styles.logo} />

            <Input style={styles.input}
                placeholder={t('email')}
                value={login.mail}
                onChangeText={(value) => { setLogin({ ...login, mail: value }) }} />

            <Input style={styles.input}
                placeholder={t('password')}
                value={login.password}
                secureTextEntry={true}
                onChangeText={(value) => { setLogin({ ...login, password: value }) }} />

            { message && <Text style={{ color: 'red' }}>{message}</Text> }
            { messageParam && <Text style={{ color: 'red' }}>{messageParam}</Text> }

            <Button style={styles.signin}
                onPress={_signInAsync}>{t('sign in')}</Button>

            <View style={styles.alternatives}>

                <Button style={styles.regiser}
                    onPress={_registerAsync}>{t('register')}</Button>

                <Button style={styles.recover}
                    onPress={_recoverAsync}>{t('recover password')}</Button>

            </View>

        </KeyboardAvoidingView>
    );

}

export default SignIn;