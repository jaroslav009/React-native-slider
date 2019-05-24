import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Image, ScrollView, Dimensions, TouchableHighlight, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';

// import Logo from '../BasicComponents/Logo';

import Header from '../Header/Header'

// Images
import edit from '../../uploads/img/edit.png'
import arrowLeft from '../../uploads/img/left-arrow.png'

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

export default class Settings extends Component {

    constructor(props) {
        super(props);
        let today = new Date();
        this.state = {
            defaultEmail: '',
            defaultPassword: '',
            defaultName: '',
            changeEmail: '',
            changePassword: '',
            changeName: '',
            newPassword: '',
            errorEmail: true,
            errorPassword: true,
            errorNewPassword: true,
            date: today.getHours()+':'+today.getMinutes(),
            open: false,
            changeButton: 'none',
            dataUser: {},
            authentication: true,
            idUser: ''
        }
        this._resetPass = this._resetPass.bind(this);
        this._logOut = this._logOut.bind(this);
        this._back = this._back.bind(this);
        this._nameFunc = this._nameFunc.bind(this);
        this._emailFunc = this._emailFunc.bind(this);
        this._passwordFunc = this._passwordFunc.bind(this);
        this._changeData = this._changeData.bind(this);
    }

    componentDidMount() {
        console.log('firebase.auth().currentUser')
        console.log(firebase.auth().currentUser)
        let email;
        let keyUser;
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                console.log('user email', user.email);
                email = user.email
            }
            firebase.database().ref("users").orderByChild("email").equalTo(email).on("child_added", (snapshot) => { 
                console.log('snapshot');
                console.log(snapshot.key);
                keyUser = snapshot.key;
                firebase.database().ref("users/"+snapshot.key).on("value", (data) => {
                    console.log('data.toJSON()');
                    console.log(data.toJSON().email);
                    this.setState({ 
                        dataUser: data.toJSON(), 
                        authentication: false,
                        changeName: data.toJSON().username,
                        changeEmail: data.toJSON().email,
                        defaultEmail: data.toJSON().email,
                        defaultName: data.toJSON().username,
                        idUser: keyUser
                    })
                });
            });
        })
    }

    // TO DO
    async _logOut() {
        
        try {
            await firebase.auth().signOut();
            // this.props.navigation.navigate('Login')
        } catch (e) {
            console.log('err firebae', e);
        }

    }

    _resetPass() {
        this.setState({
            changePassword: '',
        })
    }

    _back() {
        this.props.navigation.goBack()
    }

    _nameFunc(text) {
        this.setState({ changeName: text });
        if(text == this.state.defaultName) {
            this.setState({ changeButton: 'none' });
        } else {
            this.setState({ changeButton: 'flex' });
        }
    }

    _passwordFunc(text) {
        this.setState({changePassword: text, errorPassword: validatePassword(text)});
        
        if(validatePassword(text) == false) {
            this.setState({ changeButton: 'none' });
            return;
        }

        if(text == this.state.defaultPassword) {
            this.setState({ changeButton: 'none' });
        } else {
            this.setState({ changeButton: 'flex' });
        }
    }

    _emailFunc(text) {
        this.setState({ changeEmail: text, errorEmail: validateEmail(text) });
        if(validateEmail(text) == false) {
            this.setState({ changeButton: 'none' });
            return;
        }
        if(text == this.state.defaultEmail) {
            this.setState({ changeButton: 'none' });
        } else {
            this.setState({ changeButton: 'flex' });
        }
    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, this.state.changePassword);
        return user.reauthenticateWithCredential(cred);
      }

    _changeData() {
        this.setState({
            authentication: true
        })
        firebase.database().ref("users/" + this.state.idUser).update({
            username: this.state.changeName,
            email: this.state.changeEmail
        }).then(() => {
            console.log('success');
            this.reauthenticate(this.state.changePassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(this.state.newPassword).then(() => {
                    console.log("Password updated!");
                    this.setState({
                        errorNewPassword: true,
                    })
                }).catch((error) => {
                    this.setState({
                        errorNewPassword: false,
                    })
                    console.log(error);
                    
                });
              }).catch((error) => { 
                this.setState({
                    errorNewPassword: false,
                })
                console.log(error);
               });
            this.setState({ 
                defaultEmail: this.state.changeEmail,
                defaultName: this.state.changeName,
                changeButton: 'none',
                authentication: false
            });
        }).catch((err) => {
            this.setState({ authentication: false });
            console.log('failed', err);
        })
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
                <Header navigation={this.props.navigation} page="Account" />
                <View style={styles.wrapperLogin} showsVerticalScrollIndicator={true}>
                    <View>  
                    <TouchableHighlight onPress={() => this._back()} underlayColor="#fff">
                        <Image style={styles.arrowLeft} source={arrowLeft} />
                    </TouchableHighlight>
                        <View style={styles.titleWrapper}>
                            <Text style={{color: '#3E3F42', fontSize: 24, fontFamily: 'SFUIText-Semibold'}}> {this.state.dataUser.firstName} {this.state.dataUser.lastName} </Text>
                            <Text style={{color: '#3E3F42', fontSize: 16, fontFamily: 'SFUIText-Semibold'}}>{this.state.dataUser.university}</Text>
                            <Text style={{color: '#9EA0A5', fontSize: 16}}>{this.state.dataUser.proffesion}</Text>
                        </View>
                        <View style={styles.wrapperFormLogin}>
                            <View style={styles.itemInputForm}>
                                <Text style={styles.labelInput}>Name</Text>
                                <TextInput
                                    style={styles.inputForm}
                                    onChangeText={(text) => this._nameFunc(text) } 
                                    placeholder="Name"
                                    placeholderTextColor="#3E3F42" 
                                    value={this.state.changeName}
                                    defaultValue={this.state.defaultName}
                                />
                                <Image source={edit} style={{position: 'absolute', right: 10, top: '30%'}} />
                            </View>

                            <View style={{marginTop: 20}}>
                                <Text style={styles.labelInput}>Email</Text>
                                <TextInput
                                    style={styles.inputForm}
                                    onChangeText={(text) => this._emailFunc(text) } 
                                    placeholder="Email"
                                    placeholderTextColor="#3E3F42"
                                    value={this.state.changeEmail}
                                    defaultValue={this.state.defaultEmail}
                                />
                                <Image source={edit} style={{position: 'absolute', right: 10, top: '30%'}} />
                                <Text style={[styles.errText, {opacity: this.state.errorEmail == false ? 1 : 0}]}>Enter correct email address</Text>
                            </View>
                           
                            <View style={styles.itemInputForm}>
                                <Text style={styles.labelInput}>Password</Text>
                                <TextInput
                                    style={styles.inputForm}
                                    onChangeText={(text) => this._passwordFunc(text) }
                                    placeholder="Password"
                                    placeholderTextColor="#3E3F42" 
                                    secureTextEntry={true}
                                    value={this.state.changePassword}
                                    defaultValue={this.state.defaultPassword}
                                />
                                <TouchableHighlight onPress={this._resetPass} underlayColor="#fff" style={styles.resetBtn}>
                                    <Text style={{color: '#9EA0A5'}}>Reset</Text>
                                </TouchableHighlight>
                                <Text style={[styles.errText, {opacity: this.state.errorPassword == false ? 1 : 0}]}>Enter the password</Text>
                            </View>
                            <View style={styles.itemInputForm}>
                                <Text style={styles.labelInput}>New Password</Text>
                                <TextInput
                                    style={styles.inputForm}
                                    onChangeText={(text) => this.setState({ newPassword: text }) }
                                    placeholder="New password"
                                    placeholderTextColor="#3E3F42" 
                                    secureTextEntry={true}
                                    value={this.state.newPassword}
                                />
                                <Text style={[styles.errText, {opacity: this.state.errorNewPassword == false ? 1 : 0}]}>Not correct current password or new password</Text>                                
                            </View>
                        </View>
                        <View>
                            <TouchableHighlight onPress={this._logOut} underlayColor="#fff" style={[styles.buttonLog, {marginTop: 20}]}>
                                <Text style={{color: '#FF6464', fontSize: 16}}>Log Out</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{marginTop: 30, display: this.state.changeButton}}>
                            <TouchableHighlight onPress={this._changeData} underlayColor="#1D8EAB" style={[styles.buttonLog, {backgroundColor: '#1D8EAB'}]}>
                                <Text style={{color: '#fff', fontSize: 16}}>Save changes</Text>
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
        bottom: 20,
        left: '30%',
        marginTop: '60%'
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
        paddingTop: 10,
        borderRadius: 5
    },
    resetBtn: {
        position: 'absolute', 
        right: 10, 
        top: '30%',
    },
    labelInput: {
        paddingLeft: 10,
        fontSize: 12,
    },
    titleWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 17,
        marginTop: 17,
    },
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
        left: 40,
        backgroundColor: '#fff',
    },
    versionApp: {
        marginTop: '80%',
        zIndex: 100000,
        position: 'absolute',
        top: (Dimensions.get('window').height/2)+70,
        left: 40
    },
    containerActivity: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height
    }
})