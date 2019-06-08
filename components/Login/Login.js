import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Image, Button, ScrollView, Dimensions, ActivityIndicator, TouchableHighlight, Alert } from 'react-native';
import firebase from 'react-native-firebase';

import Logo from '../BasicComponents/Logo';

// Images
import mail from '../../uploads/img/mail.png'
import padlock from '../../uploads/img/padlock.png'

function validateEmail(email) {
    var pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern .test(email);
  }
  
function validatePassword(pass) {
    if(pass.length < 6) {
        return false;
    } else {
        return true;
    }
}

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textEmail: '',
            textPassword: '',
            errorEmail: true,
            errorPassword: true,
            authentication: false,
            authErr: false,
            errVerifyEmail: false,
        }
        this._onPressLearnMore = this._onPressLearnMore.bind(this);
        this._toRegister = this._toRegister.bind(this);
    }

    componentDidMount() {
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              console.log('user state');
              console.log(user._user);
            //   this.props.navigation.navigate('Dashboard')
            } else {
              // User is signed out.
              // ...
            }
        });
    }

    _onPressLearnMore() {
        if(this.state.textEmail.length == 0 && this.state.textPassword == 0) {
            this.setState({ errorEmail: false, errorPassword: false })
        } else if(this.state.textEmail.length == 0) {
            this.setState({ errorEmail: false })
        } else if(this.state.textPassword.length == 0) {
            this.setState({ errorPassword: false })
        } else if(this.state.textEmail && this.state.textPassword == false) {
            return;
        } else {
            // All good
            this.setState({ authentication: true })
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.textEmail, this.state.textPassword)
            .then(() => {
                this.setState({ authentication: false, authErr: false });
                // this.props.navigation.navigate('Dashboard')
                firebase.auth().onAuthStateChanged((user) => {
                    if(user){
                        console.log('user logged', user.emailVerified);
                        if(user.emailVerified == true) {
                            this.props.navigation.navigate('Dashboard');
                        } else {
                            this.setState({ errVerifyEmail: true });
                            Alert.alert(
                                '',
                                'Verify your email!',
                                [
                                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                                ],
                                {cancelable: false},
                            );
                        }
                    }
                })
            })
            .catch(error => {
                console.log('error', error)
                this.setState({ authentication: false, authErr: true });
            })
        }
    }

    _toRegister() {
        console.log('hello')
        this.props.navigation.navigate('Register');
        
    }

    render() {
        if(this.state.authentication == true) {
            return (
                <View style={styles.containerActivity}>
                    <ActivityIndicator size="large" /> 
                </View>
            )
        } 
        return (
            <ScrollView>
                <View style={styles.wrapperLogin} showsVerticalScrollIndicator={true}>
                    <View>  
                        <View style={styles.wrapperHeaderLogin}>
                            <Logo />
                            <Text style={styles.greyText}>
                                Sign in below
                            </Text>
                        </View>
                        <View style={styles.wrapperFormLogin}>
                            <View>
                                <Text style={[styles.errText, {opacity: this.state.authErr == true ? 1 : 0}]}>Invalid password or email
</Text>
                                <Text style={[styles.errText, {opacity: this.state.errVerifyEmail == true ? 1 : 0}]}>You should to activate your account
</Text>
                            </View>
                            <View style={styles.itemInputForm}>
                                <TextInput
                                    style={styles.inputForm}
                                    onChangeText={(text) => { this.setState({ errorEmail: validateEmail(text), textEmail: text }) }} 
                                    placeholder="Email"
                                    placeholderTextColor="#3E3F42" 
                                />
                                <Image style={styles.imageInput} source={mail} />
                                <Text style={[styles.errText, {opacity: this.state.errorEmail == false ? 1 : 0}]}>Enter correct email address</Text>
                            </View>
                            <View style={styles.itemInputForm}>
                                <TextInput
                                    style={styles.inputForm}
                                    onChangeText={(text) => this.setState({textPassword: text, errorPassword: validatePassword(text)})}
                                    placeholder="Password"
                                    placeholderTextColor="#3E3F42"
                                    secureTextEntry={true}
                                />
                                <Image style={styles.imageInputPass} source={padlock} />
                                <Text style={[styles.errText, {opacity: this.state.errorPassword == false ? 1 : 0}]}>Enter the password</Text>
                            </View>
                        </View>
                        <View style={styles.mb30}>
                            <Text style={styles.greyText}>Forgot your password?</Text>
                        </View>
                        <View>
                            <Button
                                onPress={this._onPressLearnMore}
                                title="Log in"
                                color={this.state.errorEmail == false || this.state.errorPassword == false ? '#9EA0A5' : '#1D8EAB'}
                            />
                        </View>
                    </View>
                    <TouchableHighlight style={styles.wrapperJoin} onPress={() => this._toRegister()} underlayColor="#fff">

                        <Text style={styles.greyText}>
                            No account yet?
                            <Text style={styles.join}>join now</Text>
                        </Text>
                            
                        
                    </TouchableHighlight>
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
        paddingLeft: 40
    },
    imageInput: {
        width: 17, 
        height: 12,
        position: 'absolute',
        top: '25%',
        left: 10
    },
    imageInputPass: {
        width: 17, 
        height: 21,
        position: 'absolute',
        top: '15%',
        left: 10
    },
    itemInputForm: {
        position: 'relative',
        marginBottom: 30
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
        fontFamily: 'SFUIText-Bold',
        fontSize: 14
    },
    wrapperJoin: {
        marginTop: Dimensions.get('window').height > 600 ? '100%' : '3%',
        display: 'flex',
        flexDirection: 'column'
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
        marginTop: 10
    },
    containerActivity: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height
    }
})