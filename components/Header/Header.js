import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Dimensions } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions, createDrawerNavigator, createSwitchNavigator  } from 'react-navigation'

import Logo from '../BasicComponents/Logo';
import burger from '../../uploads/img/burger3x.png'
import addReminder from '../../uploads/img/add-reminder3x.png'

export default class Header extends Component {

    constructor(props) {
        super(props);
        let today = new Date();
        this.state = {
            date: today.getHours()+':'+today.getMinutes(),
            open: false,
        }
        this._itemMenu = this._itemMenu.bind(this);
        this._openMenu = this._openMenu.bind(this);
        this._closeMenu = this._closeMenu.bind(this);
    }

    _itemMenu() {
        alert(this.props.navigation.navigate('Details'))
    }

    _openMenu() {
        this.setState({ open: true })
    }

    _closeMenu() {
        this.setState({ open: false })
    }

    render() {
        return (
            <View>
                <View style={[styles.menuContainer, {display: this.state.open == false ? 'none' : 'flex',
                    height: this.state.open == false ? '0%' : '100%',
                    transform: [
                        { perspective: 850 },
                        { translateX: this.state.open == false ? -100000 : 1 },
                  
                    ],
                }]}>
                    <View style={{width: '80%', paddingTop: 100}}>
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
                    <TouchableHighlight onPress={() => this._closeMenu()} style={{width: '40%', backgroundColor: '#333', height: '100%'}}>
                        <Text>qdwqdwdqwqdwdqw</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.header}>
                    <TouchableHighlight style={styles.openMenu} onPress={() => this._openMenu() } underlayColor="#fff">
                        <Image source={burger} style={styles.burger} />
                    </TouchableHighlight>
                    <Logo />
                    <View style={styles.timeWrapper}>
                        <Text style={styles.time}>{this.state.date}</Text>
                        <Image source={addReminder} style={styles.styleAddReminder} />
                    </View>
                    
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
    },
    menuContainer: {
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 1000,
        paddingLeft: 40,
        paddingRight: 40,
        display: 'flex',
        flexDirection: 'row'
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

