import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Image, Button, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import Logo from '../BasicComponents/Logo';

import Header from '../Header/Header'

// Images
import edit from '../../uploads/img/edit.png'
import arrowLeft from '../../uploads/img/left-arrow.png'

function validateEmail(email) {
    var pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern .test(email);
  }
  
function validatePassword(pass) {
    if(pass.length < 4) {
        return false;
    } else {
        return true;
    }
}

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textEmail: 'fewfew@efwe.com',
            textPassword: 'fefwefew',
            textName: 'fefwefew',
            errorEmail: true,
            errorPassword: true,
        }
        this._resetPass = this._resetPass.bind(this);
        this._logOut = this._logOut.bind(this);
    }

    _logOut() {
        alert('logout')
    }

    _resetPass() {
        this.setState({
            textPassword: '',
        })
    }

    render() {
        return (
            <ScrollView>
                <Header />
                <View style={styles.wrapperLogin} showsVerticalScrollIndicator={true}>
                    <View>  
                        <Image style={styles.arrowLeft} source={arrowLeft} />
                        <View style={styles.wrapperFormLogin}>
                            <View style={styles.itemInputForm}>
                                <Text style={styles.labelInput}>Name</Text>
                                <TextInput
                                    style={styles.inputForm}
                                    onChangeText={(text) => { this.setState({ textName: text }) }} 
                                    placeholder="Name"
                                    placeholderTextColor="#3E3F42" 
                                    value={this.state.textName}
                                />
                                <Image source={edit} style={{position: 'absolute', right: 10, top: '30%'}} />
                            </View>

                            <View style={{marginTop: 15}}>
                                <Text style={styles.labelInput}>Email</Text>
                                <TextInput
                                    style={styles.inputForm}
                                    onChangeText={(text) => { this.setState({ errorEmail: validateEmail(text), textEmail: text }) }} 
                                    placeholder="Email"
                                    placeholderTextColor="#3E3F42"
                                    value={this.state.textEmail}
                                />
                                <Image source={edit} style={{position: 'absolute', right: 10, top: '30%'}} />
                                <Text style={[styles.errText, {opacity: this.state.errorEmail == false ? 1 : 0}]}>Enter correct email address</Text>
                            </View>
                           
                            <View style={styles.itemInputForm}>
                                <Text style={styles.labelInput}>Password</Text>
                                <TextInput
                                    style={styles.inputForm}
                                    onChangeText={(text) => this.setState({textPassword: text, errorPassword: validatePassword(text)})}
                                    placeholder="Password"
                                    placeholderTextColor="#3E3F42" 
                                    secureTextEntry={true}
                                    value={this.state.textPassword}
                                />
                                <TouchableHighlight onPress={this._resetPass} underlayColor="#fff" style={styles.resetBtn}>
                                    <Text style={{color: '#9EA0A5'}}>Reset</Text>
                                </TouchableHighlight>
                                <Text style={[styles.errText, {opacity: this.state.errorPassword == false ? 1 : 0}]}>Enter the password</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableHighlight onPress={this._logOut} underlayColor="#fff" style={styles.buttonLog}>
                                <Text style={{color: '#FF6464'}}>Log Out</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    
                    <View style={styles.borderWindowBottom}></View>
                </View>
                
            </ScrollView>
        )   
    }
}

const styles = StyleSheet.create({
    wrapperLogin: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: Dimensions.get('window').height > 600 ? 50 : 10,
        justifyContent: 'space-between'
    },
    greyText: {
        color: '#C9C9C9',
        fontSize: 18,
    },
    wrapperHeaderLogin: {
        display: 'flex',
        height: 50
    },
    wrapperFormLogin: {
        paddingTop: 30
    },
    inputForm: {
        height: 40,
        borderBottomColor: '#C9C9C9',
        borderBottomWidth: 1,
        color: '#3E3F42',
        paddingLeft: 10
    },
    buttonForm: {
        paddingTop: 18,
        paddingBottom: 18,
        borderRadius: 20,
        marginTop: 30
    },
    mb30: {
        marginBottom: 30
    },
    join: {
        color: '#1D8EAB',
        textTransform: 'uppercase',
        fontWeight: '400'
    },
    wrapperJoin: {
        marginTop: Dimensions.get('window').height > 600 ? '80%' : '3%',
    },
    errText: {
        color: '#FF6464',
        fontSize: 14,
    },
    borderWindowBottom: {
        textAlign: 'center',
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 4,
        width: '50%',
        bottom: -0,
        left: '30%',
        marginTop: '90%'
    },
    imageSelect: {
        width: 17, 
        height: 12,
        position: 'absolute',
        top: '25%',
        right: 10,
        borderBottomWidth: 0
    },
    arrowLeft: {
        width: 22,
        height: 15
    },
    buttonLog: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 3,
        paddingBottom: 10,
        paddingTop: 10
    },
    resetBtn: {
        position: 'absolute', 
        right: 10, 
        top: '25%',
    },
    labelInput: {
        paddingLeft: 10,
        fontSize: 12,
    }
})