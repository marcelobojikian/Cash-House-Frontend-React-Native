import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        width: 200,
        height: 120,
        resizeMode: 'contain'
    },

    input: {
        marginTop: 5,
    },

    alternatives: {
        marginTop: 5,
        flexDirection: 'row'
    },

    signin: {
        marginTop: 5,
    },

    regiser: {
        flex: 1,
        backgroundColor: '#666',
    },

    recover: {
        flex: 2,
        marginStart: 5,
        backgroundColor: '#888',
    }

});