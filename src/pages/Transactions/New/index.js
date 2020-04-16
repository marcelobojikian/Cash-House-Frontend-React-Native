import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, TextInput, Picker, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { t } from 'i18n-js';

const options = { scope: "pages.Transactions.New" };

import logoImg from '../../../assets/logo.png';
import { Button, Loading } from '../../../components/common';
import { get, post } from '../../../services/api';

import styles from '../stylesScreen';

export default function NewTransaction () {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const [cashiers, setCashiers] = useState([])
    const [cashierId, setCashierId] = useState(-1)
    const [value, setValue] = useState('')

    function navigateToBack() {
        navigation.goBack();
    }

    function createTransaction(action) {

        if (!cashierId || cashierId < 0) {
            Alert.alert(t('alert.title.invalid field'), t('invalid cashier'))
            return;
        }

        if (!value || value <= 0) {
            Alert.alert(t('alert.title.invalid field'), t('invalid amount'))
            return;
        }

        const cashierSelected = cashiers.find(item => item.id === cashierId);
        const actionI18n = action === 'deposit' ? t('do deposit') : t('do withdraw')

        Alert.alert(
            t('alert.title.confirm operation'),
            t('action.confirmation', { action: actionI18n, cashier: cashierSelected.name, ...options}),
            [
                { text: t('alert.button.ask me later'), 
                    onPress: async () => {
                        setLoading(true)
                        await save(action);
                    } 
                },
                { text: t('alert.button.cancel'), onPress: () => {} , style: 'cancel' },
                { text: t('alert.button.confirm'), 
                    onPress: async () => {
                        setLoading(true)
                        await send(action);
                    } 
                },
            ],
            { cancelable: false }
        )

    }

    async function save(action) {

        const { error, doLogin, message } = await post(`/transactions/${action}`, {
            cashier: cashierId,
            value: value
        });
        
        if(doLogin){
            navigation.navigate('Sign',{ message });
            return
        }
        
        if(error){
            alert(message)
            setLoading(false)
            return
        }

        navigation.goBack();

    }

    async function send(action) {

        const { error, doLogin, message, data } = await post(`/transactions/${action}`, {
            cashier: cashierId,
            value: value
        });
        
        if(doLogin){
            navigation.navigate('Sign',{ message });
            return
        }
        
        if(error){
            alert(message)
            setLoading(false)
            return
        }

        await post(`/transactions/${data.id}/send`);

        navigation.goBack();

    }

    async function load() {

        const { error, doLogin, message, data } = await get('/cashiers');
        if(error || doLogin){
            navigation.navigate('Sign',{ message });
            return
        } else {
            setCashiers(data)
        }

    }

    useEffect(() => {
        load();
    }, [])

    return (
        <KeyboardAvoidingView 
            behavior={'padding'}
            enabled={Platform.OS === 'ios'}
            style={styles.container}>

            { loading && <Loading /> }

            <ScrollView>

                <View style={styles.header}>
                    <Image source={logoImg} />
        
                    <TouchableOpacity style={styles.detailsButton} onPress={navigateToBack}>
                        <Feather name="arrow-left" size={35} color={"#E02041"}/>
                    </TouchableOpacity>

                </View>
                <View style={styles.transaction}>

                    <Text style={[styles.transactionProperty, { marginTop: 0 }]}>{t('cashier')}</Text>
                    <Picker style={styles.picker}
                        selectedValue={cashierId}
                        onValueChange={(itemValue) => setCashierId(itemValue)} >
                        <Picker.Item key={'0'} value={null} label={t('select an item')} />
                        {cashiers.map((cashier) => {
                            return <Picker.Item key={cashier.id} value={cashier.id} label={cashier.name} />
                        })}
                    </Picker>   
                    
                    <Text style={styles.transactionProperty}>{t('amount')}</Text>
                    <TextInput style={styles.transactionValue}
                        autoCapitalize="none"
                        placeholder={t('transaction amount')}
                        placeholderTextColor="#999"
                        keyboardType={'numeric'}
                        value={String(value)}
                        onChangeText={(value) => { setValue(value.replace(/[^0-9.-]+/g,'')) }}
                    />

                </View>

                <View style={styles.actionBox}>

                    <Text style={styles.actionTitle}>{t('action.title', options)}</Text>
                    <Text style={styles.actionDescription}>{t('action.description', options)}</Text>

                    <View style={styles.actions}>
                        <Button style={styles.action} 
                                onPress={() => {createTransaction('deposit')}}>
                            {t('deposit')}
                        </Button>
                        <Button style={styles.action} 
                                onPress={() => {createTransaction('withdraw')}}>
                            {t('withdraw')}
                        </Button>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}