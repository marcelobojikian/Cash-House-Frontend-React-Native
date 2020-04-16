import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { t } from 'i18n-js';

const options = { scope: "pages.Transactions.Sended" };

import logoImg from '../../../assets/logo.png';
import { Button, Loading } from '../../../components/common';
import { post } from '../../../services/api';

import styles from '../stylesScreen';

export default function SendedTransaction () {

    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(false);

    const transaction = route.params.transaction;

    function navigateToBack() {
        navigation.goBack();
    }

    function finishTransaction() {

        Alert.alert(
            t('alert.title.confirm operation'),
            t('action.confirmation.finish', options),
            [
                { text: t('alert.button.cancel'), onPress: () => {} , style: 'cancel' },
                { text: t('alert.button.confirm'), 
                    onPress: async () => {
                        setLoading(true)
                        await doAction(`/transactions/${transaction.id}/finish`);
                    } 
                },
            ],
            { cancelable: false }
        )

    }

    function cancelTransaction() {

        Alert.alert(
            t('alert.title.confirm operation'),
            t('action.confirmation.cancel', options),
            [
                { text: t('alert.button.cancel'), onPress: () => {} , style: 'cancel' },
                { text: t('alert.button.confirm'), 
                    onPress: async () => {
                        setLoading(true)
                        await doAction(`/transactions/${transaction.id}/cancel`);
                    } 
                },
            ],
            { cancelable: false }
        )
        
    }

    async function doAction(url) {

        const { error, doLogin, message } = await post(url);
        
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

    return (
        <View style={styles.container} >

        { loading && <Loading /> }

            <View style={styles.header}>
                <Image source={logoImg} />
    
                <TouchableOpacity onPress={navigateToBack}>
                    <Feather name="arrow-left" size={35} color={"#E02041"}/>
                </TouchableOpacity>

            </View>
            <View style={styles.transaction}>

                <Text style={[styles.transactionProperty, { marginTop: 0 }]}>{t('cashier')}</Text>
                <Text style={styles.transactionValue}>{transaction.cashier.name}</Text>
                
                <Text style={styles.transactionProperty}>{t('amount')}</Text>
                <Text style={styles.transactionValue}>
                    {Intl.NumberFormat('en-IE', {
                        style: 'currency',
                        currency: 'EUR'
                    }).format(transaction.value)}
                </Text>

            </View>

            <View style={styles.actionBox}>

                <Text style={styles.actionTitle}>{t('action.title', options)}</Text>
                <Text style={styles.actionDescription}>
                    {t('action.description.first', options)}
                    <Text style={styles.textBold}>{transaction.action === 'DEPOSIT' ? ` ${t('do deposit').toUpperCase()} ` : ` ${t('do withdraw').toUpperCase()} ` }</Text>
                    {t('action.description.second', options)}
                    <Text style={styles.textBold}> "{transaction.cashier.name}".</Text>
                </Text>

                <View style={[styles.actions, {}]}>
                    <Button style={styles.action} 
                            onPress={() => {finishTransaction()}}>
                        {t('finish')}
                    </Button>
                    <Button style={[styles.action, { backgroundColor: '#666'}]} 
                            onPress={() => {cancelTransaction()}}>
                        {t('cancel')}
                    </Button>

                </View>

            </View>
        </View>
    );
}