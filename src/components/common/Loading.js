import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

const Loading = (props) => {

    return (
        <ActivityIndicator style={styles.indicator} />
    )

};

const styles = StyleSheet.create({
    indicator: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1
    }
});

export { Loading };