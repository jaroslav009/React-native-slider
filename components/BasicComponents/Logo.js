import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Logo extends Component {
    render() {
        return (
            <View style={styles.wrapperLogin}>
                <View>
                    <Text style={styles.firstPart}>
                        rad
                        <Text style={styles.secondPart}>
                            QD
                        </Text>
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    firstPart: {
        color: '#333',
        fontSize: 28,
    },
    secondPart: {
        color: '#1D8EAB',
        fontSize: 30
    },
    wrapperLogin: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
})