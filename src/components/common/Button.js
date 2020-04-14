import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const Button = ({ onPress, onPressOut, children, style }) => {

    const {button, text} = styles;

    return (
        <TouchableOpacity onPress={onPress} onPressOut={onPressOut} style={[button, style]}>
            <Text style={text}>{children}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#00923b',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export { Button };
