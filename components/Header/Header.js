import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Image, Button, ScrollView, Dimensions } from 'react-native';

import Logo from '../BasicComponents/Logo';
import burger from '../../uploads/img/burger3x.png'
import addReminder from '../../uploads/img/add-reminder3x.png'

export default class Header extends Component {

    constructor(props) {
        super(props);
        let today = new Date();
        this.state = {
            date: today.getHours()+':'+today.getMinutes(),
        }
    }

    render() {
        return (
            <View style={styles.header}>
                <Image source={burger} style={styles.burger} />
                <Logo />
                <View style={styles.timeWrapper}>
                    <Text style={styles.time}>{this.state.date}</Text>
                    <Image source={addReminder} style={styles.styleAddReminder} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 100, height: 100 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
    },
    burger: {
        width: 30,
        height: 25
    },
    styleAddReminder: {
        width: 30,
        height: 30
    },
    timeWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    time: {
        fontSize: 16,
        marginRight: 10,
        color: '#3E3F42'
    }
})