import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import styles from './styles';

const ListSection = ({ refreshing, status, action, cashier_id, firstField, secondField, thirdField, onPress, style }) => {

    const initialPAgeState = {first: true, nextPage:0,  last: false};

    const [params, setParams] = useState({})
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(initialPAgeState);

    const [transactions, setTransactions] = useState([])

    useEffect(() => {

        resetComponent()

        const params = {}

        if(status){
            params.status = status;
        }

        if(action){
            params.action = action;
        }

        if(cashier_id){
            params.cashier = cashier_id;
        }

        setParams(params)
        loadingComponent();

    }, [cashier_id, action, status]);

    useEffect(() => {

        if(typeof refreshing === "undefined") {
            return;
        }
    
        if(refreshing){
            loadingComponent()
        } else {
            resetComponent()
        }
        

    }, [refreshing]);

    const resetComponent = () => {
        setPage(initialPAgeState)
        setLoading(false)
        setTransactions([])
    }

    const loadingComponent = async () => {

        params.page = page.nextPage;
        params.group = 'createdDate';

        if(loading || page.last){
            return;
        }

        setLoading(true);

        const response = await api.get('/api/v1/transactions', {
            params: params
        })

        if(response.status === 204){
            return;
        }

        const { content, last, first, number } = response.data;
        
        if(!first){
            var lastGroup = transactions[transactions.length-1];
        
            if(lastGroup.createdDate === content[0].createdDate) {
                lastGroup.data = [ ... lastGroup.data, ... content[0].data]
                content.splice(0, 1);
            }
        }

        setTransactions([ ...transactions, ...content]);

        setPage({first, last, nextPage: number+1});
        setLoading(false);

    }

    const findValue = (position, item) => {
        if (position === 'name') {
            return item.assigned.nickname || item.assigned.email
        } else if (position === 'owner') {
            return 'Owner: ' + (item.assigned.nickname || item.assigned.email)
        } else if (position === 'action') {
            return item.action
        } else if (position === 'cashier') {
            return item.cashier.name
        } else if (position === 'value') {
            return Intl.NumberFormat('en-IE', {
                style: 'currency',
                currency: 'EUR'
            }).format(item.value)
        } else if (position === 'status') {
            return item.status
        } else if (position === 'creator') {
            return 'Created by: ' + (item.createdBy.username || item.createdBy.email)
        } else {
            return '? undefined ?'
        }
    }

    const findIcon = (item) => {
        if(item.action == 'DEPOSIT'){
            return 'basket-fill'
        } else if(item.action == 'WITHDRAW'){
            return 'basket-unfill'
        }else {
            return 'coin'
        }
    }

    const findIconColor = (item) => {
        if(item.status == 'CREATED') {
            return '#93A9FF'
        } else if(item.status == 'SENDED'){
            return '#C0BF3F' 
        } else if(item.status == 'FINISHED'){
            return '#00923b'
        } else {
            return '#E0E0E0'
        }
    }

    const renderRow = ({ item, index }) => {
        return (

            <TouchableOpacity style={styles.row} onPress={ () => onPress(item, index) }>

                <MaterialCommunityIcons size={35} name={findIcon(item)} color={findIconColor(item)} />

                <View style={styles.left}>
                    <Text numberOfLines={1} style={styles.textTop}>{findValue(firstField, item)}</Text>
                    <Text style={styles.textBottom}>{findValue(secondField, item)}</Text>
                </View>

                <Text style={styles.textRight}>{findValue(thirdField, item)}</Text>

            </TouchableOpacity>
            
        );
    }

    const renderSection = ({ section: { createdDate } }) => {
        return (
            <Text style={styles.header}>{createdDate}</Text>
        );
    }

    return (
        <SectionList style={style}
            sections={transactions}
            keyExtractor={(item, index) => item + index}
            renderItem={renderRow}
            renderSectionHeader={renderSection}
            showsVerticalScrollIndicator={false}
            onEndReached={loadingComponent}
            onEndReachedThreshold={0.2}
        />
    );
}

export default ListSection;