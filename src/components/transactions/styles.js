import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    header: {
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 15,
    },

    row: {
        elevation: 1,
        borderRadius: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 0,
        marginBottom: 6,
    },

    left: {
        flex: 1,
        marginLeft: 10,
        flexDirection: 'column',
    },

    textRight: {
        paddingRight: 10,
        paddingLeft: 10,
        flex: 0,
        fontSize: 25,
    },

    textTop: {
        fontWeight: 'bold',
        textAlignVertical: 'bottom',
        includeFontPadding: false,
        flex: 0,
        fontSize: 15,
    }

});