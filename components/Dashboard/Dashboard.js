import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, Dimensions, Picker, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';

import Header from '../Header/Header';
import Chart from '../Chart/Chart';
import body from '../../uploads/img/body.png'
import upArrow from '../../uploads/img/up-arrow.png';
import downArrow from '../../uploads/img/sort-down-triangular-symbol.png';


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        let today = new Date();
        this.state = {
            timePickerPersonal: 'last7',
            userPicker: 'last7',
            date: today.getHours()+':'+today.getMinutes(),
            dataUser: {},
            authentication: true,
            quizTake: undefined,
            idToken: '',
            idQuis: [],
            statisticUniver: {},
            statisticUser: {},
            correctAnswersQuizUser: {},
            correctAnswersQuizUniversity: {}
        }
        this._itemMenu = this._itemMenu.bind(this);
        this._quizRoute = this._quizRoute.bind(this);
        this._outputAnswersUnvier = this._outputAnswersUnvier.bind(this);
        this._outputAnswersUser = this._outputAnswersUser.bind(this);
    }

    componentDidMount() {
        
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                firebase.database().ref("users").orderByChild("email").equalTo(user.email).once("child_added", (snapshot) => {
                    
                    this.setState({ snapshot: snapshot.key })

                    firebase.database().ref("users/"+snapshot.key).once("value", (data) => {
                        let keysQues;
                        if(data.toJSON().questions != undefined) {
                            keysQues = Object.keys(data.toJSON().questions);
                        } else {
                            keysQues = undefined;
                        }
                        
                        this.setState({ dataUser: data.toJSON(), idQuis: keysQues });                        
                    })
                    .then(() => {
                        
                        firebase.database().ref("Cards/Today").once("value", (data) => {
                            let quisToday = false;
                            if(this.state.idQuis != undefined) {
                                this.state.idQuis.forEach((value) => {
                                    if(value == data._value) {
                                        quisToday = true;
                                    }
                                });
                            }
                            
                            
                            if(quisToday == false) {
                                this.setState({ quizTake: data._value });
                            }
                            let keyDataUserQues;
                            if(this.state.dataUser.questions != undefined) {
                                keyDataUserQues = Object.keys(this.state.dataUser.questions);
                            }
                            let bool = 1;
                            console.log('keyDataUserQues', keyDataUserQues);
                            
                            if(keyDataUserQues != undefined) {
                                keyDataUserQues.map((value) => {
                                    console.log('value', value);
                                    console.log('data._value', data._value);
                                    console.log('data._value bool', value == data._value);
                                    if(value == data._value) {
                                        this.setState({
                                            quizTake: undefined,
                                        });
                                        console.log('bool ', 0);
                                        
                                        return bool = 0;
                                    }
                                });
                            }

                            console.log('bool real', bool);
                            
                            if(bool == 1) {
                                this.setState({ quizTake: data._value });
                            } else {
                                this.setState({ quizTake: undefined });
                            }
                            
                            // to do
                            // let date = new Date();
                            // console.log('time ', date.getHours(), ' ', date.getMinutes(), ' ', date.getSe);
                            // if(date.getHours() == 12) {
                            //     if(date.getMinutes() <= 10) {
                            //         // Nothing
                            //     } else {
                            //         this.setState({
                            //             quizTake: undefined,
                            //         });
                            //     }
                            // } else {
                            //     this.setState({
                            //         quizTake: undefined,
                            //     });            
                            // }
                            // To do
                        })
                        .then(() => {
                            firebase.database().ref("university/"+this.state.dataUser.university+"/answerQuiz").once("value", (data) => {
                                let dataDay = new Array();
                                let sumCorrect;
                                let dataCorrect = new Array();
                                let dataWrong = new Array();
                                const arrDay = [null, 'M', 'T', 'W', 'T', 'F', 'S', 'S'];
                                let objKey;

                                if(data._value == null) {
                                    for(let j = 1; j <= 4; j++) {
                                        if(j == 1) objKey = 'last7';
                                        if(j == 2) objKey = 'last14';
                                        if(j == 3) objKey = 'last21';
                                        if(j == 4) objKey = 'last30';
                                        dataDay = [];
                                        dataCorrect = [];
                                        dataWrong = [];
                                        sumCorrect=0;
                                        for(let i = 1; i <= 7; i++) {
                                            dataCorrect.push({ number: 0, name: arrDay[i] });
                                            dataWrong.push({ number: 0, name: arrDay[i] });
                                        }
                                        dataDay.push(dataCorrect);
                                        dataDay.push(dataWrong);
                                        this.setState(state => {
                                            const dataUniver = state.statisticUniver[objKey] = dataDay;
                                            const dataCorrect = state.correctAnswersQuizUniversity[objKey] = sumCorrect;
                                            return {
                                                dataUniver,
                                                dataCorrect
                                            }
                                        });
    
                                    }
                                    return console.log('null')
                                }

                                for(let j = 1; j <= 4; j++) {
                                    if(j == 1) objKey = 'last7';
                                    if(j == 2) objKey = 'last14';
                                    if(j == 3) objKey = 'last21';
                                    if(j == 4) objKey = 'last30';
                                    dataDay = [];
                                    dataCorrect = [];
                                    dataWrong = [];
                                    sumCorrect=0;
                                    if(data._value[objKey] == undefined) {
                                        for(let i = 1; i <= 7; i++) {
                                            dataCorrect.push({ number: 0, name: arrDay[i] });
                                            dataWrong.push({ number: 0, name: arrDay[i] });
                                        }
                                        
                                    }
                                    else {
                                        for(let i = 1; i <= 7; i++) {
                                            if(data._value[objKey].data[i.toString(10)] != undefined) {
                                                dataCorrect.push({ number: data._value[objKey].data[i.toString(10)].correctAnswers, name: arrDay[i] });
                                                dataWrong.push({ number: data._value[objKey].data[i.toString(10)].wrongAnswers, name: arrDay[i] });
                                                sumCorrect = sumCorrect+data._value[objKey].data[i.toString(10)].correctAnswers;
                                            } else {
                                                dataCorrect.push({ number: 0, name: arrDay[i] });
                                                dataWrong.push({ number: 0, name: arrDay[i] });
                                            }
                                            
                                        }
                                    }
                                    dataDay.push(dataCorrect);
                                    dataDay.push(dataWrong);
                                    this.setState(state => {
                                        const dataUniver = state.statisticUniver[objKey] = dataDay;
                                        const dataCorrect = state.correctAnswersQuizUniversity[objKey] = sumCorrect;
                                        return {
                                            dataUniver,
                                            dataCorrect
                                        }
                                    });

                                }
                            })
                        })
                        .then(() => {
                            firebase.database().ref("users/"+this.state.snapshot+"/answerQuiz/").on("value", (data) => {
                                let dataDay = new Array();
                                let dataCorrect = new Array();
                                let dataWrong = new Array();
                                const arrDay = [null, 'M', 'T', 'W', 'T', 'F', 'S', 'S'];
                                let objKey;
                                let sumCorrect;
                                if(data._value == null) {
                                    for(let j = 1; j <= 4; j++) {
                                        if(j == 1) objKey = 'last7';
                                        if(j == 2) objKey = 'last14';
                                        if(j == 3) objKey = 'last21';
                                        if(j == 4) objKey = 'last30';
                                        dataDay = [];
                                        dataCorrect = [];
                                        dataWrong = [];
                                        sumCorrect = 0;
                                        for(let i = 1; i <= 7; i++) {                                            
                                            dataCorrect.push({ number: 0, name: arrDay[i] });
                                            dataWrong.push({ number: 0, name: arrDay[i] });
                                        }
                                        
                                        dataDay.push(dataCorrect);
                                        dataDay.push(dataWrong);
                                        this.setState(state => {
                                            const dataUniver = state.statisticUser[objKey] = dataDay;
                                            const dataCorrect = state.correctAnswersQuizUser[objKey] = sumCorrect;
                                            return {
                                                dataUniver,
                                                dataCorrect
                                            }
                                        });
                                    }

                                    dataDay.push(dataCorrect);
                                    dataDay.push(dataWrong);

                                    this.setState(state => {
                                        const dataUniver = state.statisticUser[objKey] = dataDay;
                                        const dataCorrect = state.correctAnswersQuizUser[objKey] = sumCorrect;
                                        return {
                                            dataUniver,
                                            dataCorrect
                                        }
                                    });
                                    return console.log('null')
                                }
                                
                                for(let j = 1; j <= 4; j++) {
                                    if(j == 1) objKey = 'last7';
                                    if(j == 2) objKey = 'last14';
                                    if(j == 3) objKey = 'last21';
                                    if(j == 4) objKey = 'last30';
                                    dataDay = [];
                                    dataCorrect = [];
                                    dataWrong = [];
                                    sumCorrect = 0;
                                    if(data._value[objKey] == undefined) {
                                        console.log('undefined', objKey);
                                        
                                        for(let i = 1; i <= 7; i++) {                                            
                                            dataCorrect.push({ number: 0, name: arrDay[i] });
                                            dataWrong.push({ number: 0, name: arrDay[i] });
                                        }
                                    }
                                    else {
                                        console.log('defined', objKey);
                                        for(let i = 1; i <= 7; i++) {
                                            if(data._value[objKey].data[i.toString(10)] != undefined) {
                                                dataCorrect.push({ number: data._value[objKey].data[i.toString(10)].correctAnswers, name: arrDay[i] });
                                                dataWrong.push({ number: data._value[objKey].data[i.toString(10)].wrongAnswers, name: arrDay[i] });
                                                sumCorrect = sumCorrect+data._value[objKey].data[i.toString(10)].correctAnswers;
                                            } else {
                                                dataCorrect.push({ number: 0, name: arrDay[i] });
                                                dataWrong.push({ number: 0, name: arrDay[i] });
                                            }
                                        }
                                    }
                                    
                                    dataDay.push(dataCorrect);
                                    dataDay.push(dataWrong);
                                    this.setState(state => {
                                        const dataUniver = state.statisticUser[objKey] = dataDay;
                                        const dataCorrect = state.correctAnswersQuizUser[objKey] = sumCorrect;
                                        return {
                                            dataUniver,
                                            dataCorrect
                                        }
                                    });
                                }
                            })
                        })
                        .then(() => {
                            this.setState({ authentication: false });
                        })
                        .catch(err => {
                            console.log(`err ${err}`);
                            
                        })
                    })
                    .catch(err => {
                        console.log(`err ${err}`);
                        
                    })
                })
                
                
            } else {
                this.props.navigation.navigate('WrapSlider');
            }
        })
        firebase.database().ref("university/Other").once("value", (data) => {
            console.log('university/Other',data._value.loggedUser);
            
        })
    }

    _itemMenu() {
        alert(this.props.navigation.navigate('Settings'))
        this.props.navigation.navigate('Settings')
    }

    _quizRoute() {
        this.props.navigation.navigate('QuizItem', {
            id: this.state.quizTake
        });
    }

    _outputAnswersUnvier(value) {
        if(value == 'last7') {
            if(this.state.correctAnswersQuizUniversity.last7 != undefined) {
                return(
                    <Text>{this.state.correctAnswersQuizUniversity.last7}</Text>
                );
            } else {
                return(
                    <Text>0</Text>
                );
            }
        } else if(value == 'last14') {
            if(this.state.correctAnswersQuizUniversity.last14 != undefined) {
                return(
                    <Text>{this.state.correctAnswersQuizUniversity.last14}</Text>
                );
            } else {
                return(
                    <Text>0</Text>
                );
            }
        } else if(value == 'last21') {
            if(this.state.correctAnswersQuizUniversity.last21 != undefined) {
                return(
                    <Text>{this.state.correctAnswersQuizUniversity.last21}</Text>
                );
            } else {
                return(
                    <Text>0</Text>
                );
            }
        } else {
            if(this.state.correctAnswersQuizUniversity.last30 != undefined) {
                return(
                    <Text>{this.state.correctAnswersQuizUniversity.last30}</Text>
                );
            } else {
                return(
                    <Text>0</Text>
                );
            }
        }
    }
    _outputAnswersUser(value) {
        if(value == 'last7') {
            if(this.state.correctAnswersQuizUser.last7 != undefined) {
                return(
                    <Text>{this.state.correctAnswersQuizUser.last7}</Text>
                );
            } else {
                return(
                    <Text>0</Text>
                );
            }
        } else if(value == 'last14') {
            if(this.state.correctAnswersQuizUser.last14 != undefined) {
                return(
                    <Text>{this.state.correctAnswersQuizUser.last14}</Text>
                );
            } else {
                return(
                    <Text>0</Text>
                );
            }
        } else if(value == 'last21') {
            if(this.state.correctAnswersQuizUser.last21 != undefined) {
                return(
                    <Text>{this.state.correctAnswersQuizUser.last21}</Text>
                );
            } else {
                return(
                    <Text>0</Text>
                );
            }
        } else {
            if(this.state.correctAnswersQuizUser.last30 != undefined) {
                return(
                    <Text>{this.state.correctAnswersQuizUser.last30}</Text>
                );
            } else {
                return(
                    <Text>0</Text>
                );
            }
        }
    }

    render() {
        const { navigation } = this.props;
        
        if(this.state.authentication == true) {
            return (
                <View style={styles.containerActivity}>
                    <ActivityIndicator size="large" /> 
                </View>
            )
        }

        return (
            <View style={{paddingBottom: 30}}>
                <ScrollView style={styles.wrapperDashboard}>
                   <Header navigation={this.props.navigation} page="Dashboard" />
                    <TouchableHighlight onPress={() => this._quizRoute()} style={[styles.wrapperQuiz, {display: this.state.quizTake == undefined || navigation.getParam('answer', 'NO-ID') == true ? 'none' : 'flex'}]}>
                        <Text style={styles.textQuiz}>Take the quiz</Text>
                    </TouchableHighlight>

                    {/* Hero section */}
                    <View style={styles.wrapperHero}>
                        <Image source={body} style={styles.backgroundImage} />
                        <View style={styles.wrapperHeroText}>
                            <Text style={[styles.textWelcome]}>Welcome, {this.state.dataUser.username}!</Text>
                            <Text style={styles.textRad}>
                                <Text style={styles.numberRad}>{this.state.dataUser.firstName} </Text>
                                {this.state.dataUser.lastName}
                            </Text>
                        </View>
                    </View>
                    {/* Hero section */}
                    
                    {/* Diagrams */}
                    <View style={styles.wrapperDiagram}>
                        <View style={styles.containerPerfomanceDiagram}>
                            <View style={styles.wrapperTimePerfomance}>
                                <Text style={styles.textPerfomance}>INSTITUTION PERFORMANCE</Text>
                                <View style={styles.pickerWrapper}>
                                    <Image source={upArrow} style={styles.upArrow} />
                                    <Image source={downArrow} style={styles.downArrow} />
                                    <Picker
                                        selectedValue={this.state.timePickerPersonal}
                                        style={styles.pickerStyle}
                                        onValueChange={(itemValue, itemIndex) => {
                                            this.setState({timePickerPersonal: itemValue})
                                          }
                                        }
                                        >
                                        <Picker.Item label="Last 7 days" value="last7" />
                                        <Picker.Item label="Last 14 days" value="last14" />
                                        <Picker.Item label="Last 21 days" value="last21" />
                                        <Picker.Item label="Last Month" value="last30" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.answerDiagram}>
                                <Text style={styles.textAnswer}>Correct answers</Text>
                                <Text style={[styles.textAnswer, {fontSize: 20}]}>
                                    { this._outputAnswersUnvier(this.state.timePickerPersonal) }
                                </Text>
                            </View>
                            <Chart data={this.state.statisticUniver.last7} maxPoint={100} 
                            styleChart={this.state.timePickerPersonal == 'last7' ? 'flex' : 'none'} />
                            <Chart data={this.state.statisticUniver.last14} maxPoint={100} 
                            styleChart={this.state.timePickerPersonal == 'last14' ? 'flex' : 'none'} />
                            <Chart data={this.state.statisticUniver.last21} maxPoint={100} 
                            styleChart={this.state.timePickerPersonal == 'last21' ? 'flex' : 'none'} />
                            <Chart data={this.state.statisticUniver.last30} maxPoint={100} 
                            styleChart={this.state.timePickerPersonal == 'last30' ? 'flex' : 'none'} />
                        </View>
                    </View>

                    <View style={[styles.wrapperDiagram, {marginTop: 30}]}>
                        <View style={styles.containerPerfomanceDiagram}>
                            <View style={styles.wrapperTimePerfomance}>
                                <Text style={styles.textPerfomance}>PERSONAL PERFORMANCE</Text>
                                <View style={styles.pickerWrapper}>
                                    <Image source={upArrow} style={styles.upArrow} />
                                    <Image source={downArrow} style={styles.downArrow} />
                                    <Picker
                                        selectedValue={this.state.userPicker}
                                        style={styles.pickerStyle}
                                        onValueChange={(itemValue, itemIndex) => {
                                            this.setState({userPicker: itemValue})
                                          }
                                        }>
                                        <Picker.Item label="Last 7 days" value="last7" />
                                        <Picker.Item label="Last 14 days" value="last14" />
                                        <Picker.Item label="Last 21 days" value="last21" />
                                        <Picker.Item label="Last Month" value="last30" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.answerDiagram}>
                                <Text style={styles.textAnswer}>Correct answers</Text>
                                <Text style={[styles.textAnswer, {fontSize: 20}]}>
                                { this._outputAnswersUser(this.state.userPicker) }
                                </Text>
                            </View>
                            <Chart data={this.state.statisticUser.last7} maxPoint={100} 
                            styleChart={this.state.userPicker == 'last7' ? 'flex' : 'none'} />
                            <Chart data={this.state.statisticUser.last14} maxPoint={100} 
                            styleChart={this.state.userPicker == 'last14' ? 'flex' : 'none'} />
                            <Chart data={this.state.statisticUser.last21} maxPoint={100} 
                            styleChart={this.state.userPicker == 'last21' ? 'flex' : 'none'} />
                            <Chart data={this.state.statisticUser.last30} maxPoint={100} 
                            styleChart={this.state.userPicker == 'last30' ? 'flex' : 'none'} />
                        </View>
                    </View>
                    {/* Diagrams */}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        marginTop: 50,
        position: 'absolute',
        top: 50,
        left: Dimensions.get('window').height > 600 ? '8%' : '30%'
    },
    wrapperDashboard: {
        height: '100%',
        color: '#000000'
    },
    wrapperHeroText: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 50,
        paddingTop: 50,
        elevation: 5,
    },
    wrapperHero: {
        paddingBottom: 50,
        paddingTop: Dimensions.get('window').height > 600 ? 230 : 100,
        paddingLeft: 25,
        paddingRight: 25,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        
    },
    textWelcome: {
        fontSize: 30,
        color: '#3E3F42',
        fontFamily: 'SFUIText-Regular'
    },
    textRad: {
        fontSize: 20,
        marginTop: 20,
        color: "#3E3F42",
        fontFamily: 'SFUIText-Regular'
    },
    numberRad: {
        fontSize: 25,
        color: '#3E3F42',
        fontWeight: '400',
        fontFamily: 'SFUIText-Regular'
    },
    wrapperTimePerfomance: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerWrapper: {
        position: 'relative',
    },
    textPerfomance: {
        color: '#9EA0A5',
        fontSize: 12,
        fontFamily: 'SFUIText-Medium'
    },
    upArrow: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 18,
        top: 14,
        zIndex: 1000
    },
    downArrow: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 18,
        top: 25,
        zIndex: 1000
    },
    wrapperDiagram: {
        paddingLeft: 30,
        paddingRight: 30,
        
    },
    containerPerfomanceDiagram: {
        backgroundColor: '#fff',
        paddingTop: 25,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 25,
        elevation: 5,
    },
    pickerStyle: {
        height: 50, 
        width: Dimensions.get('window').width > 600 ? 150 : 120, 
        color: '#9EA0A5', 
        backgroundColor: '#fff',
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        fontSize: 14,
        fontFamily: 'SFUIText-Regular'
    },
    answerDiagram: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    textAnswer: {
        fontSize: 14,
        color: '#3E3F42',
        fontFamily: 'SFUIText-Medium'
    },
    wrapperQuiz: {
        backgroundColor: '#1D8EAB',
        paddingTop: 20,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textQuiz: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'SFUIText-Semibold'
    },
    containerActivity: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height
    }
})