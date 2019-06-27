import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Dimensions, Animated } from 'react-native';

class Menu extends Component {
    render() {
        return (
            <View>
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
            </View>
        )
    }
}