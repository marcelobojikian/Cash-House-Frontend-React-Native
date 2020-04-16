import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { t } from 'i18n-js';

const options = { scope: "pages.Transactions.Detail" };

import logoImg from '../../../assets/logo.png';
import { Button } from '../../../components/common';

import styles from '../stylesScreen';

export default function DetailTransaction () {

    const navigation = useNavigation();
    const route = useRoute();

    const transaction = route.params.transaction;

    function navigateToBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.container} >
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
                <Text style={styles.actionDescription}>{t('action.description', options)}</Text>

                <View style={styles.actions}>
                    <Button style={[styles.action, {width: '100%'}]} 
                            onPress={() => { alert('Not yet.') }}>
                        {t('create a copy')}
                    </Button>
                </View>

            </View>
        </View>
    );
}