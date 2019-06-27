import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Dimensions, Animated, findNodeHandle } from 'react-native';
import firebase from 'react-native-firebase';
import GestureRecognizer from 'react-native-swipe-gestures';

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
            dataUser: {},
            // answeUser: '0'
        }
        this._itemMenu = this._itemMenu.bind(this);
        this._openMenu = this._openMenu.bind(this);
        this._logOut = this._logOut.bind(this);
        this._closeMenu = this._closeMenu.bind(this);
        this.onSwipeLeft = this.onSwipeLeft.bind(this);
    }

    _itemMenu(item) {
        this.props.navigation.navigate(item)
    }
    // TO DO
    async _logOut() {
        
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('WrapSlider')
        } catch (e) {
            console.log('err firebae', e);
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                firebase.database().ref("users").orderByChild("email").equalTo(user.email).once("child_added", (snapshot) => { 
                    firebase.database().ref("users/"+snapshot.key).once("value", (data) => {
                        if(data.toJSON().questions == undefined) {
                            this.setState({ answeUser: '0' });
                        } else {
                            let answ = Object.keys(data.toJSON().questions);
                            
                            this.setState({ answeUser: answ.length })
                        }
                        
                        this.setState({ dataUser: data.toJSON() })
                    });
                });
            } else {
                this.props.navigation.navigate('WrapSlider');
            }
        })
    }

    _openMenu() {
        
        Animated.timing(
            this.state.fadeAnim,
            {
              toValue: 5,
              duration: 400
            }
        ).start();
        this.props.click(true)
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
        this.props.click(false)
    }
    onSwipeLeft(stateMenu) {
        this._closeMenu();
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };
        return (
            <View>
                <Animated.View style={[styles.menuContainer, { 
                        display: 'flex',
                        height:  Dimensions.get('window').height,
                        elevation: 1516516515,
                        backgroundColor: 'rgba(52, 52, 52, 0.6)',
                        transform: [
                            { translateX: this.state.fadeAnim },
                        ],
                        width: '110%',
                    }]}>
                        <GestureRecognizer
                            onSwipeLeft={(state) => this.onSwipeLeft(state)}
                            config={config}
                            style={{
                                width: '70%', 
                                backgroundColor: '#fff', 
                                zIndex: 100000, 
                                paddingLeft: 40,
                            }}
                        >
                    
                            <View style={styles.containerMenu}>
                            <View style={{paddingTop: 50, paddingBottom: 50}}>
                                <Text style={{fontSize: 24, color: '#3E3F42', fontFamily: 'SFUIText-Semibold'}}>
                                {this.state.dataUser.firstName}
                                </Text>
                                <Text style={[styles.greyText, {fontSize: 16}]}>{this.state.answeUser} Correct Answers</Text>
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

                                <TouchableHighlight onPress={() => this._itemMenu('ProfileStudents')} underlayColor="#fff" style={{zIndex: 100000}}>
                                    <Text style={[styles.greyText, {
                                        fontSize: 24, 
                                        marginTop: 20,
                                        color: this.props.page == 'ProfileStudents' ? '#333' : '#9EA0A5' 
                                        }]}>Perfomance</Text>
                                </TouchableHighlight>

                                <TouchableHighlight onPress={() => this._itemMenu('Settings')} underlayColor="#fff" style={{zIndex: 100000}}>
                                    <Text style={[styles.greyText, {
                                        fontSize: 24, 
                                        marginTop: 20,
                                        color: this.props.page == 'Account' ? '#333' : '#9EA0A5' 
                                        }]}>Account</Text>
                                </TouchableHighlight>
                                
                                <TouchableHighlight onPress={() => this._itemMenu('Profile')} underlayColor="#fff" style={{zIndex: 100000}}>
                                    <Text style={[styles.greyText, {
                                        fontSize: 24, 
                                        marginTop: 20,
                                        color: this.props.page == 'Profile' ? '#333' : '#9EA0A5' 
                                        }]}>Profile</Text>
                                </TouchableHighlight>
                                
                                <TouchableHighlight onPress={() => this._logOut()} underlayColor="#fff" style={{zIndex: 100000}}>
                                    <Text style={[{
                                        fontSize: 24, 
                                        marginTop: 20, 
                                        color: '#FF6464'}]}>Log out</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.versionApp}>
                                <Text style={[styles.greyText, {fontSize: 16}]}>radQD v1.1</Text>
                            </View>
                        </GestureRecognizer>
                        <GestureRecognizer
                                    onSwipeLeft={(state) => this.onSwipeLeft(state)}
                                    config={config}
                                    style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    elevation: 100000
                                    }}
                        >
                            <TouchableHighlight onPress={() => this._closeMenu()} style={{
                                width: '600%', 
                                height: '100%', 
                                opacity: 0,
                                backgroundColor: '#333',
                                position: 'absolute',
                                elevation: 100000
                                }}
                            >
                                <View></View>
                            </TouchableHighlight>
                        </GestureRecognizer>
                        
                </Animated.View>
                <View style={styles.header}>
                
                    <TouchableHighlight style={{ alignSelf: 'center' }} onPress={() => this._openMenu() } underlayColor="#fff">
                        <Image source={burger} style={styles.burger} />
                    </TouchableHighlight>
                    <Image source={logoImg} style={{width: 80, height: 23, alignSelf: 'center', marginLeft: 40}} />
                    
                    <View style={styles.timeWrapper}>
                        <Text style={styles.time}>{this.state.date}</Text>
                        {/* <Image 
                        source={addReminder} 
                        style={styles.styleAddReminder} 
                        /> */}
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
        width: 24,
        height: 18
    },
    styleAddReminder: {
        width: 22,
        height: 22
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
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        zIndex: 1000000000000000000,
        position: 'absolute',
        elevation: 100000,
        left: -10
    },
    greyText: {
        color: '#9EA0A5',
        fontFamily: 'SFUIText-Semibold'
    },
    containerMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        paddingLeft: 40,
        backgroundColor: '#fff',
        elevation: 1000000000,
    },
    versionApp: {
        position: 'absolute',
        top: Dimensions.get('window').height - 60,
        left: 40,
        zIndex: 10000000000000000000
    },
    absolute: {
        position: "absolute",
        width: '100%',
        height: '100%',
        backgroundColor: '#333',
        zIndex: 1000000000000000000000,
        opacity: 0.3
    },
    openMenu: {
        width: 10,
        height: 10,
    }
})

