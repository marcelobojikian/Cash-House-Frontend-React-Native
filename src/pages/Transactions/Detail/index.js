import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity } from 'react-native';

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

                <Text style={[styles.transactionProperty, { marginTop: 0 }]}>Caixinha</Text>
                <Text style={styles.transactionValue}>{transaction.cashier.name}</Text>
                
                <Text style={styles.transactionProperty}>Valor</Text>
                <Text style={styles.transactionValue}>
                    {Intl.NumberFormat('en-IE', {
                        style: 'currency',
                        currency: 'EUR'
                    }).format(transaction.value)}
                </Text>

            </View>

            <View style={styles.actionBox}>

                <Text style={styles.actionTitle}>Transação Completa.</Text>
                <Text style={styles.actionDescription}>Essa transação ja compriou seu papel, nao fica triste bebe, pensou que ia ficar sem opcoes ne ? </Text>

                <View style={styles.actions}>
                    <Button style={[styles.action, {width: '100%'}]} 
                            onPress={() => { alert('So que nao, pensou errado otario (_,_), deixa de ser preguiçoso e clica en Adicionar Transação na tela inicial.') }}>
                        Criar uma cópia
                    </Button>
                </View>

            </View>
        </View>
    );
}