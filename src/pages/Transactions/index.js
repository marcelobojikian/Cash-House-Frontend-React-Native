import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';

import { Button } from '../../components/common';
import ListSection from '../../components/transactions';

import api from '../../services/api';

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

    function navigateToCreate() {
        setRefreshing(false)
        navigation.navigate('New');
    }

    async function loadTransactions() {

        const response = await api.get('/api/v1/transactions');
        const { totalElements } = response.data;
        setTotal(totalElements);

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
                    onPress={navigateToCreate}>Adicionar</Button>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total ? total: 0} transações</Text>.
                </Text>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>Bem-vindo</Text>
                <TouchableOpacity onPress={ () =>{ setInformation(true) } }>
                    <MaterialCommunityIcons size={30} name={'information'} color={'#AAAAAA'} />
                </TouchableOpacity>
            </View>
            
            <Text style={styles.description}>Escolha uma transação para alterar seu estado.</Text>
            

            <ListSection style={styles.transactionList} refreshing={refreshing}
                firstField={'name'}
                secondField={'cashier'}
                thirdField={'value'}
                onPress={navigateToStatus} />

            { information && (

                <View style={styles.information}>

                    <View style={styles.informationBox}>
                        <MaterialCommunityIcons size={40} name={'coin'} color={'#93A9FF'} />
                        <Text style={styles.informationProperty}>Criado</Text>
                    </View>
                    <View style={styles.informationBox}>
                        <MaterialCommunityIcons size={40} name={'coin'} color={'#C0BF3F'} />
                        <Text style={styles.informationProperty}>Enviado</Text>
                    </View>
                    <View style={styles.informationBox}>
                        <MaterialCommunityIcons size={40} name={'coin'} color={'#707070'} />
                        <Text style={styles.informationProperty}>Deletado</Text>
                    </View>
                    <View style={styles.informationBox}>
                        <MaterialCommunityIcons size={40} name={'coin'} color={'#00923b'} />
                        <Text style={styles.informationProperty}>Finalizado</Text>
                    </View>

                    <TouchableOpacity onPress={ () =>{ setInformation(null) } }>
                        <Text style={styles.informationClose}>Voltar</Text>
                    </TouchableOpacity>

                </View>
            )}

        </View>
    );
}