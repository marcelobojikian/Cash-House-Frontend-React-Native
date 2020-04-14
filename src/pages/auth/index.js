import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform, View, Text, Image, Alert } from 'react-native';
import base64 from 'react-native-base64';

import logoImg from '../../assets/logo.png';
import { AsyncStorage } from 'react-native';

import { Button, Input, Loading } from '../../components/common';

import api from '../../services/api';
import styles from './styles';

const SignIn = () => {

    const { navigate } = useNavigation();
    const { params } = useRoute();

    const INITIAL = { mail: '@mail.com', password: 'test' }

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [login, setLogin] = useState(INITIAL);

    useEffect(() => {

        if(params && params.message){
            setMessage(params.message)
        }

        setLoading(false)

    }, []);

    const _signInAsync = async () => {

        const { mail, password } = login;

        setMessage(null)
        if (!mail || !password) {
            setMessage('Mail or Password is empty')
            return
        }

        const params = new URLSearchParams();

        params.append('client_id', 'cueva');
        params.append('grant_type', 'password');
        params.append('username', mail);
        params.append('password', password);
        
        var basicAuth = 'Basic ' + base64.encode('cueva:noop');
                
        AsyncStorage.setItem('userToken', basicAuth);
        AsyncStorage.setItem('dashboard', '1');

        setLoading(true)
        await api.post('/oauth/token', params).then(async(response) => {

            const { access_token } = response.data

            AsyncStorage.setItem('userToken', 'Bearer ' + access_token);

            const responseDetail = await api.get('/api/v1/users/self/detail');
            const detail = responseDetail.data
            navigate('Transactions', { detail });

        }).catch((error) => {
            console.info(error)
            setMessage(error.error_description)
        }).finally(() => {
            setLoading(false)
        });

    };

    const _registerAsync = async () => {

        const { mail, password } = login;

        setMessage(null)
        if (!mail || !password) {
            setMessage('Mail or Password is empty')
            return
        }

        if(true){
            Alert.alert('Not Yet :-)', 'Sistema em fase de teste, calma ai :P')
            return;
        }

        setLoading(true)
        await api.post('/register', {
            mail, password
        }).then((response) => {
            _signInAsync()
        }).catch((error) => {
            setMessage(error)
        }).finally(() => {
            setLoading(false)
        });

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

    const renderError = () => {
        if (message) {
            return (
                <Text style={{ color: 'red' }}>{message}</Text>
            );
        }
    }

    const renderLoading = () => {
        if (loading) {
            return (
                <Loading />
            );
        }
    }

    return (
        <KeyboardAvoidingView 
            behavior={'padding'}
            enabled={Platform.OS === 'ios'}
            style={styles.container}>

            {renderLoading()}

            <Image source={logoImg} style={styles.logo} />

            <Input style={styles.input}
                placeholder={'E-mail'}
                value={login.mail}
                onChangeText={(value) => { setLogin({ ...login, mail: value }) }} />

            <Input style={styles.input}
                placeholder={'Password'}
                value={login.password}
                secureTextEntry={true}
                onChangeText={(value) => { setLogin({ ...login, password: value }) }} />

            {renderError()}

            <Button style={styles.signin}
                onPress={_signInAsync}>Sign in</Button>

            <View style={styles.alternatives}>

                <Button style={styles.regiser}
                    onPress={_registerAsync}>Register</Button>

                <Button style={styles.recover}
                    onPress={_recoverAsync}>Recover password</Button>

            </View>

        </KeyboardAvoidingView>
    );

}

export default SignIn;