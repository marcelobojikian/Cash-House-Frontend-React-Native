import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    transaction: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
        marginTop: 20
    },

    transactionProperty: {
        fontSize: 14,
        marginLeft: 7,
        color: '#41414d',
        fontWeight: 'bold',
        marginTop: 24
    },

    transactionValue: {
        marginTop: 8,
        marginLeft: 7,
        fontSize: 15,
        color: '#737380'
    },

    actionBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16, 
    },

    actionTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#13131a',
        lineHeight: 30
    },

    actionDescription: {
        fontSize: 15,
        color: '#737380',
        marginTop: 16
    },

    actions: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    action: {
        borderRadius: 8,
        width: '48%'
    },

    textBold: {
        fontWeight: 'bold'
    },

});