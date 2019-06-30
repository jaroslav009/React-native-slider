import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Image, ScrollView, Dimensions, TouchableHighlight, Button } from 'react-native';
import firebase from 'react-native-firebase';

import Logo from '../BasicComponents/Logo';

// Images
import mail from '../../uploads/img/mail.png'
import padlock from '../../uploads/img/padlock.png'

function validateEmail(email) {
    var pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern .test(email);
}

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            textEmail: '',
            errorEmail: true,
            authentication: false,
            authErr: false,
            errVerifyEmail: false,
        }

        this._onPressResetPass = this._onPressResetPass.bind(this);
    }

    _onPressResetPass() {
        if(this.state.textEmail.length == 0) {
            this.setState({ errorEmail: false })
        } else if(this.state.textEmail.length == 0) {
            this.setState({ errorEmail: false })
        }  else if(this.state.textEmail == false) {
            return;
        } else {
            firebase.auth().sendPasswordResetEmail(this.state.textEmail)
            .then((user) => {
                
                alert('Please check your email');
                
            }).catch((e) => {
                alert('Such user does not exist');
            });
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (
            <ScrollView>
            <View style={styles.wrapperLogin} showsVerticalScrollIndicator={true}>
                <View>  
                    <View style={styles.wrapperHeaderLogin}>
                        <Logo />
                        <Text style={styles.greyText}>
                            Reset password
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
                    </View>
                    <View>
                        <Button
                            onPress={this._onPressResetPass}
                            title="Reset password"
                            color={this.state.errorEmail == false || this.state.errorPassword == false ? '#9EA0A5' : '#1D8EAB'}
                        />
                    </View>
                </View>
                
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
        justifyContent: 'space-between',
        height: Dimensions.get('window').height,
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
        fontWeight: '400'
    },
    wrapperJoin: {
        marginTop: Dimensions.get('window').height > 600 ? '40%' : '3%',
        display: 'flex',
        flexDirection: 'column'
    },
    errText: {
        color: '#FF6464',
        fontSize: 14,
    },
    containerActivity: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height
    }
});

export default ResetPassword;