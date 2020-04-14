import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import logoImg from '../../../assets/logo.png';
import { Button, Loading } from '../../../components/common';
import api from '../../../services/api';

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
            "Confirmar operação. ",
            `Você deseja finalizar essa da transação ?`,
            [
                { text: 'Cancelar', onPress: () => {} , style: 'cancel' },
                { text: 'OK', 
                    onPress: async () => {
                        setLoading(true)
                        await api.post(`/api/v1/transactions/${transaction.id}/finish`);
                        navigation.goBack();
                    } 
                },
            ],
            { cancelable: false }
        )

    }

    function cancelTransaction() {

        Alert.alert(
            "Confirmar operação. ",
            `Você deseja cancelar essa da transação ?`,
            [
                { text: 'Cancelar', onPress: () => {} , style: 'cancel' },
                { text: 'OK', 
                    onPress: async () => {
                        setLoading(true)
                        await api.post(`/api/v1/transactions/${transaction.id}/cancel`);
                        navigation.goBack();
                    } 
                },
            ],
            { cancelable: false }
        )
        
    }

    const renderLoading = () => {
        if (loading) {
            return (
                <Loading />
            );
        }
    }

    return (
        <View style={styles.container} >

            {renderLoading()}

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

                <Text style={styles.actionTitle}>Transação quase concluida.</Text>
                <Text style={styles.actionDescription}>
                    Essa trasaction foi enviada e esta pronta para ser finalizada, 
                    nao se esqueca de 
                    <Text style={styles.textBold}>{transaction.action == 'DEPOSIT' ? ' DEPOSITAR ' : ' RETIRAR ' }</Text>
                    o dinheiro da caixinha 
                    <Text style={styles.textBold}> "{transaction.cashier.name}".</Text>.
                </Text>

                <View style={[styles.actions, {}]}>
                    <Button style={styles.action} 
                            onPress={() => {finishTransaction()}}>
                        Finalizar
                    </Button>
                    <Button style={[styles.action, { backgroundColor: '#666'}]} 
                            onPress={() => {cancelTransaction()}}>
                        Cancelar
                    </Button>

                </View>

            </View>
        </View>
    );
}