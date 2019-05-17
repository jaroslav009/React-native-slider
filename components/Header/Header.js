import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Dimensions, Animated, findNodeHandle } from 'react-native';
import { BlurView, VibrancyView } from "@react-native-community/blur";

import Logo from '../BasicComponents/Logo';
import burger from '../../uploads/img/burger3x.png'
import addReminder from '../../uploads/img/add-reminder3x.png'
import logoImg from '../../uploads/img/logo.png'

export default class Header extends Component {

    constructor(props) {
        super(props);
        let today = new Date();
        this.state = {
            date: today.getHours()+':'+today.getMinutes(),
            open: false,
            fadeAnim: new Animated.Value(-1000),
            opacBack: new Animated.Value(0),
        }
        this._itemMenu = this._itemMenu.bind(this);
        this._openMenu = this._openMenu.bind(this);
        this._closeMenu = this._closeMenu.bind(this);
    }

    _itemMenu(item) {
        this.props.navigation.navigate(item)
    }

    _openMenu() {
        console.log(this.state.showMenu)
        
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
              toValue: 0,
              duration: 400
            }
        ).start();
        Animated.timing(                  // Animate over time
            this.state.opacBack,            // The animated value to drive
            {
              toValue: 1,
              duration: 400
            }
        ).start();
        this.setState({ open: true })        
    }

    _closeMenu() {
        this.setState({ open: false })
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
              toValue: -1000,                   // Animate to opacity: 1 (opaque)
              duration: 400
            }
        ).start(); 
        Animated.timing(                  // Animate over time
            this.state.opacBack,            // The animated value to drive
            {
              toValue: 0,
              duration: 400
            }
        ).start();
    }

    render() {
        return (
            <View>
                <Animated.View style={[styles.menuContainer, { 
                        display: this.state.open == false ? 'none' : 'flex',
                        height: this.state.open == false ? '0%' : '100%',
                        height:  Dimensions.get('window').height+200,
                        position: 'absolute',
                        elevation: 5,
                        backgroundColor: 'rgba(52, 52, 52, 0.6)',
                        transform: [
                            { translateX: this.state.fadeAnim },
                        ]
                    }]}>
                        <View style={{
                            width: '80%', 
                            backgroundColor: '#fff', 
                            zIndex: 100000, 
                            paddingLeft: 40,
                            }}>
                            
                            <View style={styles.containerMenu}>
                            <View style={{paddingTop: 50, paddingBottom: 50}}>
                                <Text style={{fontSize: 24, color: '#3E3F42', fontFamily: 'SFUIText-Semibold'}}>DEVON</Text>
                                <Text style={[styles.greyText, {fontSize: 16}]}>173 Correct Answers</Text>
                            </View>
                                <TouchableHighlight onPress={() => this._itemMenu('Dashboard')} underlayColor="#fff" style={{
                                        zIndex: 100000,
                                    }}>
                                    <Text style={[styles.greyText, 
                                        {
                                            fontSize: 24,
                                            marginTop: 15,
                                            color: this.props.page == 'Dashboard' ? '#333' : '#9EA0A5' 
                                        }]}>Dashboard</Text>
                                </TouchableHighlight>

                                <TouchableHighlight onPress={() => this._itemMenu('Leaderboard')} underlayColor="#fff" style={{zIndex: 100000}}>
                                    <Text style={[styles.greyText, {
                                        fontSize: 24,
                                        marginTop: 20,
                                        color: this.props.page == 'Leadboard' ? '#333' : '#9EA0A5' 
                                        }]}>Leadboard</Text>
                                </TouchableHighlight>

                                <TouchableHighlight onPress={() => this._itemMenu('Slack')} underlayColor="#fff" style={{zIndex: 100000}}>
                                    <Text style={[styles.greyText, {
                                        fontSize: 24, 
                                        marginTop: 20,
                                        color: this.props.page == 'Perfomance' ? '#333' : '#9EA0A5' 
                                        }]}>Perfomance</Text>
                                </TouchableHighlight>

                                <TouchableHighlight onPress={() => this._itemMenu('Settings')} underlayColor="#fff" style={{zIndex: 100000}}>
                                    <Text style={[styles.greyText, {
                                        fontSize: 24, 
                                        marginTop: 20,
                                        color: this.props.page == 'Account' ? '#333' : '#9EA0A5' 
                                        }]}>Account</Text>
                                </TouchableHighlight>
                                
                                <TouchableHighlight onPress={() => this._itemMenu('About')} underlayColor="#fff" style={{zIndex: 100000}}>
                                    <Text style={[styles.greyText, {
                                        fontSize: 24, 
                                        marginTop: 20,
                                        color: this.props.page == 'About' ? '#333' : '#9EA0A5' 
                                        }]}>About</Text>
                                </TouchableHighlight>

                                <TouchableHighlight onPress={() => this._itemMenu('Quiz')} underlayColor="#fff" style={{zIndex: 100000}}>
                                    <Text style={[styles.greyText, {
                                        fontSize: 24, 
                                        marginTop: 20,
                                        color: this.props.page == 'Quiz' ? '#333' : '#9EA0A5' 
                                        }]}>Quiz</Text>
                                </TouchableHighlight>

                                <TouchableHighlight onPress={() => this._itemMenu('Profile')} underlayColor="#fff" style={{zIndex: 100000}}>
                                    <Text style={[styles.greyText, {
                                        fontSize: 24, 
                                        marginTop: 20,
                                        color: this.props.page == 'Profile' ? '#333' : '#9EA0A5' 
                                        }]}>Profile</Text>
                                </TouchableHighlight>
                                
                                <TouchableHighlight onPress={() => this._itemMenu()} underlayColor="#fff" style={{zIndex: 100000}}>
                                    <Text style={[{
                                        fontSize: 24, 
                                        marginTop: 20, 
                                        color: '#FF6464'}]}>Log out</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.versionApp}>
                                <Text style={[styles.greyText, {fontSize: 16}]}>radQD v1.1</Text>
                            </View>
                        </View>
                        <TouchableHighlight onPress={() => this._closeMenu()} style={{
                            width: '100%', 
                            height: '100%', 
                            opacity: 0,
                            backgroundColor: '#333',
                            position: 'absolute',
                            }}
                        >
                            <View></View>
                        </TouchableHighlight>
                        
                </Animated.View>
                <View style={styles.header}>
                {/* <BlurView
                                style={styles.absolute}
                                viewRef={this.state.viewRef}
                                blurType="extraDark"
                                blurAmount={2}
                            /> */}

                
                    <TouchableHighlight style={styles.openMenu} onPress={() => this._openMenu() } underlayColor="#fff">
                        <Image source={burger} style={styles.burger} />
                    </TouchableHighlight>
                    <Image source={logoImg} style={{width: 80, height: 23}} />
                    
                    <View style={styles.timeWrapper}>
                        <Text style={styles.time}>{this.state.date}</Text>
                        <Image 
                        source={addReminder} 
                        style={styles.styleAddReminder} 
                        />
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
        // paddingLeft: 40,
        // paddingRight: 40,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        zIndex: 1000000000000000000,
        position: 'absolute',
        // left: -20
    },
    greyText: {
        color: '#9EA0A5',
        fontFamily: 'SFUIText-Semibold'
    },
    containerMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        // top: Dimensions.get('window').height/4,
        // left: -20,
        paddingLeft: 40,
        zIndex: 1000000000000000000,
        backgroundColor: '#fff'
    },
    versionApp: {
        position: 'absolute',
        top: Dimensions.get('window').height - 40,
        left: 40,
        zIndex: 10000000000000000000
    },
    absolute: {
        position: "absolute",
        // top: 0,
        // bottom: 0,
        // left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#333',
        zIndex: 1000000000000000000000,
        opacity: 0.3
      }
})

