import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerAction: {
        paddingHorizontal: 20
    },

    headerText: {
        fontSize: 15,
        color: '#737380'
    },

    headerTextBold: {
        fontWeight: 'bold'
    },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 30,
        color: '#13131a',
        fontWeight: 'bold'
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'
    },

    transactionList: {
        marginTop: 10,
        marginBottom: 10
    },

    transaction: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },

    transactionProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },

    transactionValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    detailsButton: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },

    detailsButtonText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold'
    },

    information: {
        ... StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    informationBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    informationProperty: {
        paddingHorizontal: 14,
        fontSize: 40,
        lineHeight: 60,
        color: '#FFF'
    },

    informationClose: {
        fontSize: 30,
        textAlign: 'center',
        color: 'rgba(255,255,255,0.8)',
        marginTop: 100,
        fontWeight: 'bold'
    }

});