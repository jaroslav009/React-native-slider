import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Button, ScrollView, Dimensions, Picker } from 'react-native';

export default class Menu extends Component {
    render() {
        return (
            <View style={styles.menuContainer}>
                <Text style={{fontSize: 24, color: '#3E3F42'}}>DEVON</Text>
                <Text style={[styles.greyText, {fontSize: 16}]}>173 Correct Answers</Text>
                <View style={styles.containerMenu}>

                    <TouchableHighlight onPress={() => this._itemMenu()} underlayColor="#fff" style={{zIndex: 100000}}>
                        <Text style={[styles.greyText, {fontSize: 24, marginTop: 15}]}>Dashboard</Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._itemMenu()} underlayColor="#fff" style={{zIndex: 100000}}>
                        <Text style={[styles.greyText, {fontSize: 24, marginTop: 20}]}>Leadboard</Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._itemMenu()} underlayColor="#fff" style={{zIndex: 100000}}>
                        <Text style={[styles.greyText, {fontSize: 24, marginTop: 20}]}>Perfomance</Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._itemMenu()} underlayColor="#fff" style={{zIndex: 100000}}>
                        <Text style={[styles.greyText, {fontSize: 24, marginTop: 20}]}>Account</Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight onPress={() => this._itemMenu()} underlayColor="#fff" style={{zIndex: 100000}}>
                        <Text style={[styles.greyText, {fontSize: 24, marginTop: 20}]}>About</Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this._itemMenu()} underlayColor="#fff" style={{zIndex: 100000}}>
                        <Text style={[{fontSize: 24, marginTop: 20, color: '#FF6464'}]}>Log out</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.versionApp}>
                    <Text style={[styles.greyText, {fontSize: 16}]}>radQD v1.1</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menuContainer: {
        width: '80%',
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 1000,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 100,
    },
    greyText: {
        color: '#9EA0A5',
    },
    containerMenu: {
        marginTop: '50%',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100000,
        position: 'absolute',
        top: Dimensions.get('window').height/6,
        left: 40
    },
    versionApp: {
        marginTop: '80%',
        zIndex: 100000,
        position: 'absolute',
        top: (Dimensions.get('window').height/2)+70,
        left: 40
    }
})

