import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Image, Button, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import Logo from '../BasicComponents/Logo';
import DatePicker from 'react-native-datepicker';
import firebase from 'react-native-firebase';

function validateUser(user) {
    if(user.length < 2) {
        return false;
    } else {
        return true;
    }
}

export default class RegisterDataUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textUser: '',
            textFName: '',
            textLName: '',
            textUniversity: '',
            textProffesion: '',
            errorUser: true,
            authentication: false,
            authErr: false,
        }
        this._onPressLearnMore = this._onPressLearnMore.bind(this);
    }

    componentDidMount() {
        console.log('RegisterDataUser');
        const { navigation } = this.props;
        console.log(navigation.getParam('id', 'NO-ID'));
    }
    
    _onPressLearnMore() {
        this.setState({ authentication: true })
        const { navigation } = this.props;
        if(this.state.textUser.length == 0) {
            this.setState({ errorUser: false, authentication: false });
        } else { 
            // All good
            firebase.database().ref("users/" + navigation.getParam('id', 'NO-ID')).update({
                username: this.state.textUser,
                firstName: this.state.textFName,
                lastName: this.state.textLName,
                proffesion: this.state.textProffesion
            }).then(() => {
                console.log('success this.state.textUser' , this.state.textUser);        
                firebase.database().ref("university/" + navigation.getParam('univerId') + "/" + navigation.getParam('id', 'NO-ID')).update({
                    firstName: this.state.textFName,
                    lastName: this.state.textLName,
                    proffesion: this.state.textProffesion,
                    username: this.state.textUser,
                }).then(() => {
                    console.log('updarte')
                    this.setState({ authentication: false });
                    this.props.navigation.navigate('Dashboard', {
                        id: 'idUser'
                    });
                }).catch((err) => {
                    return console.log(err);
                })        
            }).catch((err) => {
                this.setState({ authentication: false });
                console.log('failed', err);
            })
            
        }
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
                                <Text style={[styles.errText, {opacity: this.state.authErr == true ? 1 : 0}]}>Such user exists</Text>
                            </View>
                            <View style={[styles.itemInputForm, {marginBottom: 10}]}>
                               
                                <TextInput
                                    style={[styles.inputForm, {paddingLeft: 10}]}
                                    onChangeText={(text) => this.setState({textUser: text, errorUser: validateUser(text)})}
                                    placeholder="User"
                                    placeholderTextColor="#3E3F42" 
                                />
                                <Text style={[styles.errText, {opacity: this.state.errorUser == false ? 1 : 0}]}>Enter the user</Text>

                            </View>

                            <View style={styles.itemInputForm}>
                               
                                <TextInput
                                    style={[styles.inputForm, {paddingLeft: 10}]}
                                    onChangeText={(text) => this.setState({textFName: text})}
                                    placeholder="Name"
                                    placeholderTextColor="#3E3F42" 
                                />
                            </View>

                            <View style={styles.itemInputForm}>
                               
                                <TextInput
                                    style={[styles.inputForm, {paddingLeft: 10}]}
                                    onChangeText={(text) => this.setState({textLName: text})}
                                    placeholder="Surname"
                                    placeholderTextColor="#3E3F42" 
                                />
                            </View>

                            <View style={styles.itemInputForm}>
                               
                                <TextInput
                                    style={[styles.inputForm, {paddingLeft: 10}]}
                                    onChangeText={(text) => this.setState({textProffesion: text})}
                                    placeholder="Proffesion"
                                    placeholderTextColor="#3E3F42" 
                                />
                            </View>
                            
                        </View>
                        <View style={styles.mb30}>
                            <Text style={styles.greyText}>Forgot your password?</Text>
                        </View>
                        <View>
                            <Button
                                onPress={this._onPressLearnMore}
                                title="Sign up"
                                color={this.state.errorEmail == false || this.state.errorPassword == false ? '#9EA0A5' : '#1D8EAB'}
                            />
                        </View>
                    </View>
                    <View style={styles.wrapperJoin}>

                        <Text style={styles.greyText}>
                            No account yet?
                            <Text style={styles.join}> join now</Text>
                        </Text>
                        
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
        marginTop: Dimensions.get('window').height > 600 ? '70%' : '3%',
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
    imageSelect: {
        width: 17, 
        height: 12,
        position: 'absolute',
        top: '25%',
        right: 10,
        borderBottomWidth: 0
    },
    dateInput: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0,
        zIndex: 100000
    },
    containerActivity: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height
    }
})