import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, TextInput, Picker, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import logoImg from '../../../assets/logo.png';
import { Button, Loading } from '../../../components/common';
import api from '../../../services/api';

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
            Alert.alert('Falha ao enviar', 'Cashier invalido')
            return;
        }

        if (!value || value <= 0) {
            Alert.alert('Falha ao enviar', 'Valor invalido')
            return;
        }

        const cashierSelected = cashiers.find(item => item.id === cashierId);

        Alert.alert(
            "Confirmar operação. ",
            `Você deseja ${action === 'deposit' ? 'depositar' : 'retirar'} da caixinha '${cashierSelected.name}' ?`,
            [
                { text: 'Mais tarde', 
                    onPress: async () => {
                        setLoading(true)
                        await save(action);
                        navigation.goBack();
                    } 
                },
                { text: 'Cancelar', onPress: () => {} , style: 'cancel' },
                { text: 'OK', 
                    onPress: async () => {
                        setLoading(true)
                        await send(action);
                        navigation.goBack();
                    } 
                },
            ],
            { cancelable: false }
        )

    }

    async function save(action) {
        
        await api.post(`/api/v1/transactions/${action}`, {
            cashier: cashierId,
            value: value
        });

    }

    async function send(action) {

        const response = await api.post(`/api/v1/transactions/${action}`, {
            cashier: cashierId,
            value: value
        });

        const { id } = response.data;

        await api.post(`/api/v1/transactions/${id}/send`);

    }

    async function load() {
        
        const response = await api.get('/api/v1/cashiers');
        setCashiers(response.data)

    }

    const renderLoading = () => {
        if (loading) {
            return (
                <Loading />
            );
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

            {renderLoading()}

            <ScrollView>

                <View style={styles.header}>
                    <Image source={logoImg} />
        
                    <TouchableOpacity style={styles.detailsButton} onPress={navigateToBack}>
                        <Feather name="arrow-left" size={35} color={"#E02041"}/>
                    </TouchableOpacity>

                </View>
                <View style={styles.transaction}>

                    <Text style={[styles.transactionProperty, { marginTop: 0 }]}>Caixinha</Text>
                    <Picker style={styles.picker}
                        selectedValue={cashierId}
                        onValueChange={(itemValue) => setCashierId(itemValue)} >
                        <Picker.Item key={'0'} value={null} label={'Selecione um item'} />
                        {cashiers.map((cashier) => {
                            return <Picker.Item key={cashier.id} value={cashier.id} label={cashier.name} />
                        })}
                    </Picker>   
                    
                    <Text style={styles.transactionProperty}>Valor</Text>
                    <TextInput style={styles.transactionValue}
                        autoCapitalize="none"
                        placeholder={'Valor da transação'}
                        placeholderTextColor="#999"
                        keyboardType={'numeric'}
                        value={String(value)}
                        onChangeText={(value) => { setValue(value.replace(/[^0-9.-]+/g,'')) }}
                    />

                </View>

                <View style={styles.actionBox}>

                    <Text style={styles.actionTitle}>Criando transação.</Text>
                    <Text style={styles.actionDescription}>Essa transação sera enviada para a pessoa que administra as caixinhas, assim que voce entregar o dinheiro ao mesmo ela sera finalizada.</Text>

                    <View style={styles.actions}>
                        <Button style={styles.action} 
                                onPress={() => {createTransaction('deposit')}}>
                            Depositar
                        </Button>
                        <Button style={styles.action} 
                                onPress={() => {createTransaction('withdraw')}}>
                            Retirar
                        </Button>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}