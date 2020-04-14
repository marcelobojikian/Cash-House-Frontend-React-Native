import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = ({ onChangeText, keyboardType, maxLength, placeholder, secureTextEntry, value, style }) => {

    const { input } = styles;

    return (
        <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={placeholder}
            placeholderTextColor="#999"
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            maxLength={maxLength}
            style={[input, style]}
            value={value}
            onChangeText={onChangeText}
        />
    )
};

const styles = StyleSheet.create({
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        paddingHorizontal: 15,
    },
});

export { Input };