import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import I18n, { t } from 'i18n-js';

import { Button } from '../../components/common';
import ListSection from '../../components/transactions';

import { get } from '../../services/api';

import styles from './styles';

export default function Transactions () {

    const [refreshing, setRefreshing] = useState(false);
    const [total, setTotal] = useState(0);
    const [information, setInformation] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();

    const detail = route.params.detail;

    function navigateToStatus(transaction) {

        const { status, cashier } = transaction;

        const enableAdmin = detail.id === cashier.owner.id

        setRefreshing(false)
        if(status == 'CREATED') {
            navigation.navigate('Created', { transaction });
        } else if(enableAdmin && status == 'SENDED'){
            navigation.navigate('Sended', { transaction });
        } else {
            navigation.navigate('Detail', { transaction });
        }

    }

    async function navigateToCreate() {
        setRefreshing(false)
        navigation.navigate('New');
    }

    async function loadTransactions() {

        const { error, doLogin, message, data } = await get('/transactions');
        if(error || doLogin){
            navigation.navigate('Sign',{ message });
            return
        } else {
            setTotal(data.totalElements || 0);
        }

    }

    useEffect(() => {

        loadTransactions();

        navigation.addListener('focus', () => {
            loadTransactions();
            setRefreshing(true)
        })

    }, [])

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Button style={styles.headerAction}
                    onPress={navigateToCreate}>!Adicionar!</Button>
                <Text style={styles.headerText}>
                    {t('total of')} <Text style={styles.headerTextBold}>{t('transaction', { count: total, formatted_number: I18n.toNumber(total, { precision: 0 }) })}</Text>.
                </Text>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>!Bem-vindo!</Text>
                <TouchableOpacity onPress={ () =>{ setInformation(true) } }>
                    <MaterialCommunityIcons size={30} name={'information'} color={'#AAAAAA'} />
                </TouchableOpacity>
            </View>
            
            <Text style={styles.description}>!Escolha uma transação para alterar seu estado.!</Text>
            
            <ListSection style={styles.transactionList} refreshing={refreshing}
                firstField={'name'}
                secondField={'cashier'}
                thirdField={'value'}
                onPress={navigateToStatus} />

            { information && (

                <View style={styles.information}>

                    <View style={styles.informationBox}>
                        <MaterialCommunityIcons size={40} name={'coin'} color={'#93A9FF'} />
                    <Text style={styles.informationProperty}>{t('created')}</Text>
                    </View>
                    <View style={styles.informationBox}>
                        <MaterialCommunityIcons size={40} name={'coin'} color={'#C0BF3F'} />
                        <Text style={styles.informationProperty}>{t('sended')}</Text>
                    </View>
                    <View style={styles.informationBox}>
                        <MaterialCommunityIcons size={40} name={'coin'} color={'#707070'} />
                        <Text style={styles.informationProperty}>{t('deleted')}</Text>
                    </View>
                    <View style={styles.informationBox}>
                        <MaterialCommunityIcons size={40} name={'coin'} color={'#00923b'} />
                        <Text style={styles.informationProperty}>{t('finished')}</Text>
                    </View>

                    <TouchableOpacity onPress={ () =>{ setInformation(null) } }>
                        <Text style={styles.informationClose}>{t('back')}</Text>
                    </TouchableOpacity>

                </View>
            )}

        </View>
    );
}