import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, Dimensions, Picker, TouchableHighlight, Modal } from 'react-native';
import firebase from 'react-native-firebase';

import Header from '../Header/Header';
import Chart from '../Chart/Chart';
import body from '../../uploads/img/body.png'
import upArrow from '../../uploads/img/up-arrow.png';
import downArrow from '../../uploads/img/sort-down-triangular-symbol.png';
import ribs from '../../uploads/img/ribs.png';

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
            correctAnswersQuizUniversity: {},
            textPicker1: 'Last 7',
            showPicker: 'none',
            textPicker2: 'Last 7',
            showPicker2: 'none',
            clickHeader: false,
        }
        this._itemMenu = this._itemMenu.bind(this);
        this._quizRoute = this._quizRoute.bind(this);
        this._outputAnswersUnvier = this._outputAnswersUnvier.bind(this);
        this._outputAnswersUser = this._outputAnswersUser.bind(this);
        this.handleClickHeader = this.handleClickHeader.bind(this);
    }

    componentDidMount() {
        
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                console.log('users', user);
                firebase.database().ref("users").orderByChild("email").equalTo(user.email).once("child_added", (snapshot) => {
                    
                    this.setState({ snapshot: snapshot.key })
                    
                    
                    firebase.database().ref("users/"+snapshot.key).once("value", (data) => {
                        let keysQues;
                        console.log('data iser', data._value);
                        let columnQues;
                        if(data.toJSON().questions != undefined) {
                            keysQues = Object.keys(data.toJSON().questions);
                            columnQues = toString(keysQues.length);
                        } else {
                            keysQues = undefined;
                            columnQues = '0'
                        }
                        
                        this.setState({ dataUser: data.toJSON(), 
                            idQuis: keysQues, 
                            columnQues });                        
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
                            let date = new Date();
                            console.log('time ', date.getHours(), ' ', date.getMinutes(), ' ', date.getSe);
                            if(date.getHours() == 12) {
                                if(date.getMinutes() <= 10) {
                                    // Nothing
                                } else {
                                    this.setState({
                                        quizTake: undefined,
                                    });
                                }
                            } else {
                                this.setState({
                                    quizTake: undefined,
                                });            
                            }
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
                .catch((err) => {
                    console.log(`err ${err}`);
                    
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

    handleClickHeader = (value) => {
        this.setState({clickHeader: value});
    }

    render() {
        const { navigation } = this.props;
        console.log('change clickHeader', this.state.clickHeader);
        
        if(this.state.authentication == true) {
            return (
                <View style={styles.containerActivity}>
                    <ActivityIndicator size="large" /> 
                </View>
            )
        }

        return (
            <View style={{ position: 'relative', zIndex: -1, backgroundColor: 'rgba(0, 0, 0, 0.04)',}}>
                <ScrollView style={styles.wrapperDashboard} stickyHeaderIndices={[0]}>
                   <Header navigation={this.props.navigation} page="Dashboard" click={this.handleClickHeader} style={{ width: '100%', height: this.state.clickHeader == false ? 50 : '100%', position: 'absolute', zIndex: -1 }} />
                    <TouchableHighlight onPress={() => this._quizRoute()} style={[styles.wrapperQuiz, {display: this.state.quizTake == undefined || navigation.getParam('answer', 'NO-ID') == true ? 'none' : 'flex'}]}>
                        <Text style={styles.textQuiz}>Take the quiz</Text>
                    </TouchableHighlight>

                    {/* Hero section */}
                    <View style={styles.wrapperHero}>
                        <Image source={body} style={styles.backgroundImage} />
                        <Image source={ribs} style={{ alignSelf: 'center', position: 'absolute', top: 160, width: 60, height: 60 }} />
                        <View style={styles.wrapperHeroText}>
                            <Text style={[styles.textWelcome]}>Welcome, {this.state.dataUser.firstName}!</Text>
                            <Text style={styles.textRad}>
                                <Text style={styles.numberRad}>{this.state.columnQues} </Text>
                                rad
                            </Text>
                        </View>
                    </View>
                    {/* Hero section */}
                    
                    {/* Diagrams */}
                    <View style={[styles.wrapperDiagram, { position: 'relative', zIndex: -1 }]}>
                        <View style={styles.containerPerfomanceDiagram}>
                            <View style={styles.wrapperTimePerfomance}>
                                <Text style={styles.textPerfomance}>INSTITUTION PERFORMANCE</Text>
                                <View style={styles.pickerWrapper}>
                                    
                                    {/* Picker */}
                                    <TouchableHighlight onPress={ () => {
                                        if(this.state.showPicker == 'none') this.setState({ showPicker: 'flex' /* must have */ });
                                        else this.setState({ showPicker: 'none' /* must have */ });

                                    } } 
                                        key="Picker" 
                                        underlayColor="transparent" 
                                        style={{ 
                                            backgroundColor: '#fff',
                                            display: 'flex',
                                        }}
                                    >
                                        <View style={{
                                            position: 'relative', 
                                            zIndex: 10000000000000000,
                                        }}>
                                                <Image source={upArrow} style={[styles.upArrow, { display: this.state.showPicker == 'none' ? 'flex' : 'none', position: this.state.showPicker == 'none' ? 'absolute' : 'relative' }]} />
                                                <Image source={downArrow} style={[styles.downArrow, { display: this.state.showPicker == 'none' ? 'flex' : 'none', position: this.state.showPicker == 'none' ? 'absolute' : 'relative' }]} />
                                            <Text style={{
                                                fontSize: 14,
                                                fontFamily: 'SFUIText-Regular',
                                                marginRight: 30,
                                                display: this.state.showPicker == 'none' ? 'flex' : 'none' 
                                            }}> {this.state.textPicker1} </Text>
                                            <View 
                                            style={{
                                                display: this.state.showPicker,
                                                marginTop: 20
                                            }}>
                                                <Modal 
                                                animationType="fade"
                                                transparent={false}
                                                visible={this.state.showPicker == 'none' ? false : true}
                                                style={{ display: 'flex',
                                                         justifyContent: 'center',
                                                         alignItems: 'center',
                                                         paddingTop: 20 }}
                                                >
                                                    <TouchableHighlight  style={[styles.pickerItem]}
                                                    underlayColor="transparent"
                                                    onPress={() => this.setState({
                                                        timePickerPersonal: 'last7', // must have
                                                        textPicker1: 'Last 7', // must have
                                                        showPicker: 'none'
                                                    })}>
                                                        <Text>Last 7</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight style={[styles.pickerItem]}
                                                    underlayColor="transparent"
                                                    onPress={() => this.setState({
                                                        timePickerPersonal: 'last14', 
                                                        textPicker1: 'Last 14', 
                                                        showPicker: 'none', 
                                                        
                                                    })}>
                                                        <Text>Last 14</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight style={[styles.pickerItem]}
                                                    underlayColor="transparent"
                                                    onPress={() => this.setState({
                                                        timePickerPersonal: 'last21', 
                                                        textPicker1: 'Last 21',
                                                        showPicker: 'none'
                                                    })}>
                                                        <Text>Last 21</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight style={[styles.pickerItem]}
                                                    underlayColor="transparent"
                                                    onPress={() => this.setState({
                                                        timePickerPersonal: 'last30', 
                                                        textPicker1: 'Last Month',
                                                        showPicker: 'none'
                                                    })}>
                                                        <Text>Last Month</Text>
                                                    </TouchableHighlight>
                                                </Modal>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                    {/* Picker */}
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
                                    {/* Picker */}
                                    <TouchableHighlight onPress={ () => {
                                        if(this.state.showPicker2 == 'none') this.setState({ showPicker2: 'flex' /* must have */ });
                                        else this.setState({ showPicker: 'none' /* must have */ });

                                    } } 
                                        key="Picker" 
                                        underlayColor="transparent" 
                                        style={{ 
                                            backgroundColor: '#fff',
                                            display: 'flex',
                                        }}
                                    >
                                        <View style={{
                                            position: 'relative', 
                                            zIndex: 10000000000000000,
                                        }}>
                                                <Image source={upArrow} style={[styles.upArrow, {display: this.state.showPicker2 == 'none' ? 'flex' : 'none', position: this.state.showPicker2 == 'none' ? 'absolute' : 'relative' }]} />
                                                <Image source={downArrow} style={[styles.downArrow, {display: this.state.showPicker2 == 'none' ? 'flex' : 'none', position: this.state.showPicker2 == 'none' ? 'absolute' : 'relative' }]} />
                                            <Text style={{
                                                fontSize: 14,
                                                fontFamily: 'SFUIText-Regular',
                                                marginRight: 30,
                                                display: this.state.showPicker2 == 'none' ? 'flex' : 'none' 
                                            }}> {this.state.textPicker2} </Text>
                                            <View 
                                            style={{
                                                display: this.state.showPicker2,
                                                marginTop: 20
                                            }}>
                                                <Modal 
                                                animationType="fade"
                                                transparent={false}
                                                visible={this.state.showPicker2 == 'none' ? false : true}
                                                style={{ display: 'flex',
                                                         justifyContent: 'center',
                                                         alignItems: 'center',
                                                         paddingTop: 20 }}
                                                >
                                                    <TouchableHighlight  style={[styles.pickerItem]}
                                                    underlayColor="transparent"
                                                    onPress={() => this.setState({
                                                        userPicker: 'last7', // must have
                                                        textPicker2: 'Last 7', // must have
                                                        showPicker2: 'none'
                                                    })}>
                                                        <Text>Last 7</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight style={[styles.pickerItem]}
                                                    underlayColor="transparent"
                                                    onPress={() => this.setState({
                                                        userPicker: 'last14', 
                                                        textPicker2: 'Last 14', 
                                                        showPicker2: 'none', 
                                                        
                                                    })}>
                                                        <Text>Last 14</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight style={[styles.pickerItem]}
                                                    underlayColor="transparent"
                                                    onPress={() => this.setState({
                                                        userPicker: 'last21', 
                                                        textPicker2: 'Last 21',
                                                        showPicker2: 'none'
                                                    })}>
                                                        <Text>Last 21</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight style={[styles.pickerItem]}
                                                    underlayColor="transparent"
                                                    onPress={() => this.setState({
                                                        userPicker: 'last30', 
                                                        textPicker2: 'Last Month',
                                                        showPicker2: 'none'
                                                    })}>
                                                        <Text>Last Month</Text>
                                                    </TouchableHighlight>
                                                </Modal>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                    {/* Picker */}
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
                    <View key="Footer" style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20, paddingTop: 20 }}>
                        <Text style={{ color: '#9EA0A5', fontSize: 14 }}>Copyright RadQD 2019</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        marginTop: 50,
        position: 'absolute',
        top: 20,
        alignSelf: 'center',
        width: 174,
        height: 200
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
        paddingBottom: 20,
        paddingTop: 20,
        elevation: 6,
        marginTop: -100
    },
    wrapperHero: {
        paddingBottom: 50,
        paddingTop: Dimensions.get('window').height > 600 ? 230 : 100,
        paddingLeft: 25,
        paddingRight: 25,
        opacity: 0.9,        
    },
    textWelcome: {
        fontSize: 20,
        color: '#3E3F42',
        fontFamily: 'SFUIText-Regular'
    },
    textRad: {
        fontSize: 17,
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
        position: 'absolute',
        right: 15,
        zIndex: 100000000000000
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
        right: 0,
        top: 0,
        zIndex: 1000
    },
    downArrow: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 0,
        top: 10,
        zIndex: 1000
    },
    wrapperDiagram: {
        paddingLeft: 30,
        paddingRight: 30,
        position: 'relative',
    },
    containerPerfomanceDiagram: {
        backgroundColor: '#fff',
        paddingTop: 25,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 25,
    },
    pickerStyle: {
        width: Dimensions.get('window').width > 600 ? 150 : 120, 
        color: '#9EA0A5', 
        backgroundColor: '#fff',
        fontSize: 14,
        fontFamily: 'SFUIText-Regular'
    },
    answerDiagram: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
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
    },
    pickerItem: {
        padding: 6,
        zIndex: 100000,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})