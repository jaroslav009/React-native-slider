import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions, Picker, TouchableHighlight, ActivityIndicator, Modal} from 'react-native';
import firebase from 'react-native-firebase'
import Header from '../Header/Header';

import arrowLeft from '../../uploads/img/left-arrow.png';
import upArrow from '../../uploads/img/up-arrow.png';
import downArrow from '../../uploads/img/sort-down-triangular-symbol.png';
import check from '../../uploads/img/checked.png';
import cancel from '../../uploads/img/close.png';

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

export default class ProfileStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterAnsw: '',
            dataUser: {},
            columnStudents: 0,
            authentication: true,
            questions: [],
            idQues: [],
            showQues: [],
            countArr: 1,
            showButtonUpload: 'flex',
            showPicker: 'none',
            textPicker1: 'All'
        }
        this._back = this._back.bind(this);
        this._taskRoute = this._taskRoute.bind(this);
        this._press = this._press.bind(this);
        this.correctFilter = this.correctFilter.bind(this);
        this.wrongFilter = this.wrongFilter.bind(this);
        this.allFilter = this.allFilter.bind(this);
    }
    _back() {
        this.props.navigation.goBack()
    }

    componentDidMount() {
        let count = 0;
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                firebase.database().ref("users").orderByChild("email").equalTo(user.email).once("child_added", (snapshot) => { 
                    console.log(snapshot.key);
                    firebase.database().ref("users/"+snapshot.key).once("value", (data) => {
                        this.setState({ dataUser: data.toJSON(), authentication: false });
                        console.log('datauser', data.toJSON());
                        this.setState({ dataUser: data.toJSON() });
                        firebase.database().ref("university/"+data.toJSON().university+"/answer").on("value", (snapshot) => {
                            this.setState({ answerQuiz: snapshot._value });
                        });
                        firebase.database().ref("university/"+data.toJSON().university).once("value", (data) => {
                            this.setState({ nameUniver: data._value.name });
                        });
                        if(count == 0) {
                            for (let prop in data.toJSON().questions) {
                                this.setState(state => {
                                    questionsItem = state.questions.push(data.toJSON().questions[prop])
                                    questionsId = state.idQues.push(prop)
                                    return {
                                        questionsItem,
                                        questionsId
                                    }
                                })
                            }
                            if(data.toJSON().questions == undefined) {
                                this.setState({ showButtonUpload: 'none' })
                            } else {
                                if(this.state.questions.length < 5) {
                                    let i = 1;
                                    for(item in data.toJSON().questions) {
                                        console.log('test', data._value[item])
                                        if(i > 1) {
                                            // Nothing
                                        }
                                        else {
                                            this.setState(state => {
                                                question = state.showQues.push(data.toJSON().questions[item]);
                                                return {
                                                    question,
                                                }
                                            })
                                            console.log('showques 2 ', this.state.showQues)
                                        }
                                        i++;
                                    }
                                } else {
                                    let i = 1;
                    
                                    for(item in data.toJSON().questions) {
                                        if(i <= 5) {
                                            this.setState(state => {
                                                let question = state.showQues.push(data.toJSON().questions[item]);
                                                let count = state.countArr = 5;
                                                return {
                                                    question,
                                                    count
                                                }
                                            });
                                        } else {
                                            break;
                                        }
                                        
                                        i++;
                                    }
                                }
                            }
                        }
                        count++;
                    })
                })
            } else {
                this.props.navigation.navigate('Login');
            }
        });
    }

    _taskRoute(key, value) {
        const {navigate} = this.props.navigation;
        let id = this.state.idQues[key];
        navigate('QuizShowProfile', {id, value, key})
    }

    _press() {
        for(let i = this.state.countArr; i <= this.state.countArr+1; i++) {
            console.log('this.state.countArr', this.state.countArr, '   i ', i);
            if(this.state.questions[i] != undefined) {
                this.setState(state => {
                    let question = state.showQues.push(this.state.questions[i])
                    
                    return {
                        question,
                    }
                });
            }
        }
        this.setState({ countArr: this.state.countArr+2 }); 
    }

    correctFilter() {
        this.setState(state => {
            let variant = state.normVariant = [];
            return {
                variant
            }
        });
        this.state.showQues.map((value, key) => {
            this.setState(state => {
                let variant = state.showQues[key].styleShow = "flex";
                return {
                    variant
                }
            });
            if(value.answer != value.correctAnswer) {
                this.setState(state => {
                    let variant = state.showQues[key].styleShow = "none";
                    return {
                        variant
                    }
                })
            }
        });
    }

    wrongFilter() {
        this.setState(state => {
            let variant = state.normVariant = [];
            return {
                variant
            }
        });
        this.state.showQues.map((value, key) => {
            this.setState(state => {
                let variant = state.showQues[key].styleShow = "flex";
                return {
                    variant
                }
            });
            if(value.answer == value.correctAnswer) {
                this.setState(state => {
                    let variant = state.showQues[key].styleShow = "none";
                    return {
                        variant
                    }
                })
            }
        });
    }

    allFilter() {
        this.state.showQues.map((value,key) => {
            this.setState(state => {
                let variant = state.showQues[key].styleShow = "flex";
                return {
                    variant
                }
            })
        });
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
            <ScrollView style={styles.profile}>
                <Header style={styles.headerStyle} navigation={this.props.navigation} page="ProfileStudents" />
                <View style={styles.wrapperProfile}>
                    <TouchableHighlight onPress={() => this._back()} underlayColor="transparent">
                        <Image style={styles.arrowLeft} source={arrowLeft} />
                    </TouchableHighlight>
                    <View style={styles.containerTitleProfile}>
                        <Text style={[styles.titleProfie, {fontSize: 24}]}>
                            {this.state.dataUser.firstName}
                        </Text>
                        <Text style={[styles.subTitleProf, {fontSize: 16}]}>
                            {this.state.nameUniver}
                        </Text>
                        <Text style={[styles.greyText, {fontSize: 16}]}>
                            {this.state.dataUser.proffesion}
                        </Text>
                    </View>
                    <View style={styles.containerAnswer}>
                        <View style={{marginTop: 11}}>
                            <Text style={styles.answText}>{this.state.questions.length} Answers</Text>
                        </View>
                        <View>
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
                                            <TouchableHighlight style={[styles.pickerItem]}
                                            underlayColor="transparent"
                                            onPress={() => {
                                                this.setState({
                                                    filterAnsw: 'all', 
                                                    textPicker1: 'All', 
                                                    showPicker: 'none', 
                                                });
                                                this.allFilter();
                                            }
                                            }>
                                                <Text>All</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight style={[styles.pickerItem]}
                                            underlayColor="transparent"
                                            onPress={() => {
                                                this.setState({
                                                    filterAnsw: 'correct', 
                                                    textPicker1: 'Correct',
                                                    showPicker: 'none'
                                                });
                                                this.correctFilter();
                                            }
                                            }>
                                                <Text>Correct</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight style={[styles.pickerItem]}
                                            underlayColor="transparent"
                                            onPress={() => {
                                                this.setState({
                                                    filterAnsw: 'wrong', 
                                                    textPicker1: 'Wrong',
                                                    showPicker: 'none'
                                                });
                                                this.wrongFilter();
                                            }
                                            }>
                                                <Text>Wrong</Text>
                                            </TouchableHighlight>
                                        </Modal>
                                    </View>
                                </View>
                            </TouchableHighlight>
                            {/* Picker */}
                        </View>
                    </View>
                    <View style={[styles.containerItemsAnswer, {marginTop: 15}]}>

                        {
                            this.state.showQues.map((value, key) => {
                                return(
                                    <TouchableHighlight key={key} 
                                    onPress={() => this._taskRoute(key, value)} 
                                    underlayColor="transparent"
                                    style={{display: this.state.showQues[key].styleShow}}
                                    >
                                        <View style={{elevation: 5, backgroundColor: '#fff', marginTop: 15}}>
                                            <View style={styles.topPartItem}>
                                                <View style={styles.userContainer}>
                                                    <Text>{value.time} sec.</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.greyText}>
                                                        {value.date}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Image source={{uri: value.fonImage}} style={styles.styleImageAnsw} />
                                            <View style={styles.bottomPartItem}>
                                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Text style={styles.textBlue}>
                                                        {value.letter}
                                                    </Text>    
                                                    <View style={styles.titleItem}>
                                                        <Text style={styles.titleBottomPart}>{value.title}</Text>
                                                    </View>
                                                </View>
                                                <View style={[styles.checkStyle, {borderColor: value.correctAnswer == value.answer ? '#1D8EAB' : '#FF6464'}]}>
                                                    <Image source={value.correctAnswer == value.answer ? check : cancel} style={{width: 20, height: 20}} />
                                                </View>

                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                )
                            })   
                        }
                        <View style={{justifyContent: 'center', alignItems: 'center', display: this.state.showButtonUpload}}>
                            <TouchableHighlight underlayColor="#1D8EAB"
                            style={{marginTop: 50, 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                backgroundColor: '#1D8EAB',
                                padding: 5,
                                width: '50%'
                            }}
                            onPress={this._press}>
                                <Text style={{color: '#fff'}}>Upload more</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    profile: {
        backgroundColor: '#FAFAFD',
        height: Dimensions.get('window').height,
        flex: 1,
    },  
    headerStyle: {
        height: Dimensions.get('window').height,
    },
    arrowLeft: {
        width: 22,
        height: 15
    },
    wrapperProfile: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 25,
        paddingBottom: 25,
        minHeight: Dimensions.get('window').height - 90,
    },
    containerTitleProfile: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 17
    },
    titleProfie: {
        color: '#3E3F42',
        fontSize: 24,
        fontFamily: 'SFUIText-Semibold'
    },
    subTitleProf: {
        color: '#3E3F42',
        fontSize: 16,
        marginTop: 5,
        fontFamily: 'SFUIText-Semibold',
        textAlign: 'center'
    },
     pickerStyle: {
        width: Dimensions.get('window').width > 600 ? 110 : 120, 
        color: '#9EA0A5', 
        backgroundColor: '#FAFAFD',
        fontSize: 18,
        position: 'absolute',
        right: -30
    },
    upArrow: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 18,
        top: 1,
        zIndex: 1000
    },
    downArrow: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 18,
        top: 12,
        zIndex: 101111100
    },
    containerAnswer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 35
    },
    answText: {
        color: '#3E3F42',
        fontSize: 20,
        fontFamily: 'SFUIText-Semibold'
    },
    greyText: {
        color: '#707070',
        fontSize: 12
    },
    topPartItem: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff'
    },
    userContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#707070',
    },
    userFill: {
        marginRight: 5
    },
    styleImageAnsw: {
        width: '100%',
        height: 100
    },
    bottomPartItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff'
    },
    textBlue: {
        color: '#1D8EAB',
        fontSize: 16,
        marginRight: 15,
        fontFamily: 'SFUIText-Semibold'
    },
    titleItem: {
        color: '#3E3F42',
        fontSize: 16,
        marginLeft: 15
    },
    checkStyle: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#1D8EAB',
        padding: 5
    },
    titleBottomPart: {
        fontFamily: 'SFUIText-Semibold',
        fontSize: 16,
        color: '#3E3F42'
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