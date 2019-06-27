import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Animated, ScrollView, Dimensions, Picker, TextInput, TouchableHighlight, ActivityIndicator, Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';

import Header from '../Header/Header';
import Chart from '../Chart/Chart';

import arrowLeft from '../../uploads/img/left-arrow.png'
import upArrow from '../../uploads/img/up-arrow.png';
import downArrow from '../../uploads/img/sort-down-triangular-symbol.png';
import magnifySearch from '../../uploads/img/magnifying-glass.png';

export default class Leaderboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            score: '',
            fadeAnim: new Animated.Value(0),
            correctAnswersQuizUniversity: {},
            statisticUniver: {},
            itemsUniver: [],
            authentication: true,
            instituteSelect: {},
            countArr: 5,
            searchText: '',
            booferUniverSearch: [],
            textPicker: 'Last 7',
            showPicker: 'none',
            showPicker2: 'none',
            textPicker1: 'Title',
            clickHeader: false,
        }
        this._graphShow = this._graphShow.bind(this);
        this._back = this._back.bind(this);
        this._outputUnivers = this._outputUnivers.bind(this);
        this._uploadMore = this._uploadMore.bind(this);
        this._filterScore = this._filterScore.bind(this);
        this._filterTitle = this._filterTitle.bind(this);
        this._searchTitle = this._searchTitle.bind(this);
        this.handleClickHeader = this.handleClickHeader.bind(this);
    }

    _graphShow(arg) {        
        if(this.state.arrUniver[arg].opacNum == 0) {
            this.setState(state => {
                const list = state.arrUniver[arg].opacNum = 1;
                return {
                    list,
                };
            });
            Animated.timing(
                this.state.arrUniver[arg].styeShowGraph,
                {
                  toValue: 1,
                  duration: 1000,
                },
            ).start();
        } else {
            this.setState(state => {
                const list = state.arrUniver[arg].opacNum = 0;
                return {
                    list,
                };
            });
            Animated.timing(
                this.state.arrUniver[arg].styeShowGraph,            
                {
                  toValue: 0,
                  duration: 1000,
                }
            ).start();
        }
        
    }

    _back() {
        this.props.navigation.goBack()
    }

    componentDidMount() {
        firebase.database().ref("university/").limitToLast(200).once("value", (data) => {
            
            this.setState({ dataAllUnivers: data._value });
            const itemUniver = [];
            let arrUniver = new Array();
            let objUniver = {};
            for(prop in data._value) {
                this.setState({ [prop]: 'last7' })
                let dataDay = new Array();
                let sumCorrect;
                let correctAnswers = 0;
                let dataCorrect = new Array();
                let dataWrong = new Array();
                const arrDay = [null, 'M', 'T', 'W', 'T', 'F', 'S', 'S'];
                let objKey;
                let dataUniver = {};
                
                
                if(data._value[prop].answerQuiz != undefined ) {
                    
                    if(data._value[prop].answerQuiz == null) {
                        console.log('null')
                    }
                    else {
                        for(let j = 1; j <= 4; j++) {
                            if(j == 1) objKey = 'last7';
                            if(j == 2) objKey = 'last14';
                            if(j == 3) objKey = 'last21';
                            if(j == 4) objKey = 'last30';
                            dataDay = [];
                            dataCorrect = [];
                            dataWrong = [];
                            sumCorrect=0;
                            if(data._value[prop].answerQuiz[objKey] == undefined) {
                                for(let i = 1; i <= 7; i++) {
                                    dataCorrect.push({ number: 0, name: arrDay[i] });
                                    dataWrong.push({ number: 0, name: arrDay[i] });
                                }
                            }
                            else {
                                for(let i = 1; i <= 7; i++) {
                                    if(data._value[prop].answerQuiz[objKey].data[i] == undefined) {
                                        dataCorrect.push({ number: 0, name: arrDay[i] });
                                        dataWrong.push({ number: 0, name: arrDay[i] });
                                    } else {
                                        dataCorrect.push({ number: data._value[prop].answerQuiz[objKey].data[i.toString(10)].correctAnswers, name: arrDay[i] });
                                        dataWrong.push({ number: data._value[prop].answerQuiz[objKey].data[i.toString(10)].wrongAnswers, name: arrDay[i] });
                                        sumCorrect = sumCorrect+data._value[prop].answerQuiz[objKey].data[i.toString(10)].correctAnswers;
                                    }
                                }
                            }
                            dataDay.push(dataCorrect);
                            dataDay.push(dataWrong);
                            correctAnswers = correctAnswers+sumCorrect
                            dataUniver[objKey] = dataDay;
                        }
                    }
                } else {
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
                        correctAnswers = correctAnswers+sumCorrect
                        dataUniver[objKey] = dataDay;
                    }
                }
                this.setState({ [data._value[prop].name]: 'last7' });
                objUniver = {
                    title: data._value[prop].name,
                    score: correctAnswers,
                    data: {
                        last7: dataUniver.last7,
                        last14: dataUniver.last14,
                        last21: dataUniver.last21,
                        last30: dataUniver.last30,
                    },
                    opacNum: 0,
                    displayGraph: 'none',
                    styeShowGraph: new Animated.Value(0),
                }
                arrUniver.push(objUniver);
            }
            let arrUniverOut = [];
            for(let i = 0; i <= 5; i++) {
                arrUniverOut.push(arrUniver[i]);
            }
            this.setState({ itemsUniver: itemUniver, arrUniver, arrUniverOut });
            console.log(arrUniver[3]);
            

        })
        .then(() => {
            this.setState({ authentication: false });
        })
        .catch(err => {
            console.log(`err ${err}`);
        })
    }

    _outputUnivers() {
        
    }

    _uploadMore() {
        for(let i = this.state.countArr; i <= this.state.countArr+5; i++) {
            if(this.state.arrUniver[i] != undefined) {
                this.setState(state => {
                    
                    let arr = state.arrUniverOut.push(this.state.arrUniver[i]);
                    return {
                        arr
                    }
                })
            }
        }
        this.setState({ countArr: this.state.countArr+5 });
    }

    _filterScore() {

        let arrBoofer = this.state.arrUniverOut;
        
        let n = arrBoofer.length;
        for (let i = 0; i < n-1; i++)
        { 
            for (let j = 0; j < n-1-i; j++)
            { 
                if (arrBoofer[j+1].score < arrBoofer[j].score)
                { 
                    let t = arrBoofer[j+1]; 
                    arrBoofer[j+1] = arrBoofer[j]; 
                    arrBoofer[j] = t; 
                }
            }
        } 
        this.setState({ arrUniverOut: arrBoofer.reverse() });
    }

    _filterTitle() {
        let arrBoofer = this.state.arrUniverOut;
        
        let n = arrBoofer.length;
        for (let i = 0; i < n-1; i++)
        { 
            for (let j = 0; j < n-1-i; j++)
            { 
                if (arrBoofer[j+1].title < arrBoofer[j].title)
                { 
                    let t = arrBoofer[j+1]; 
                    arrBoofer[j+1] = arrBoofer[j]; 
                    arrBoofer[j] = t; 
                }
            }
        } 
        this.setState({ arrUniverOut: arrBoofer });
    }

    _searchTitle() {
        let searchText;
        let arrBoofer = [];
        this.state.arrUniver.map((value, key) => {
            if(value.title != undefined) {
                searchText = value.title.toLowerCase();
                searchText = searchText.indexOf(this.state.searchText.toLowerCase());
                if(searchText != -1) {
                    arrBoofer.push(value);
                }
            }
        });
        this.setState({ arrUniverOut: arrBoofer });
    }

    handleClickHeader = (value) => {
        console.log('wdqdqdqw', value);
        
        this.setState({clickHeader: value});
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
            <ScrollView style={styles.leader} stickyHeaderIndices={[0]}>
                <Header navigation={this.props.navigation} page="Leadboard" click={this.handleClickHeader} style={{ width: '100%', height: this.state.clickHeader == false ? 50 : '100%', position: 'absolute', zIndex: -1 }} />
                <View style={styles.wrapperLeader}>
                    <TouchableHighlight onPress={() => this._back()} underlayColor="#fff">
                        <Image style={styles.arrowLeft} source={arrowLeft} />
                    </TouchableHighlight>
                    <View style={styles.filterContainer}>
                        <View style={{marginTop: 11}}>
                            <Text style={styles.filterTitle}>Leaderboard</Text>
                        </View>
                        <View>
                            {/* Picker */}
                            <TouchableHighlight onPress={ () => {
                                if(this.state.showPicker2 == 'none') this.setState({ showPicker2: 'flex' /* must have */ });
                                else this.setState({ showPicker2: 'none' /* must have */ });

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
                                        <Image source={upArrow} style={[styles.upArrow]} />
                                        <Image source={downArrow} style={[styles.downArrow]} />
                                    <Text style={{
                                        fontSize: 14,
                                        fontFamily: 'SFUIText-Regular',
                                        marginRight: 30,
                                        display: this.state.showPicker2 == 'none' ? 'flex' : 'none' 
                                    }}> {this.state.textPicker1} </Text>
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
                                            onPress={() => {
                                                this.setState({
                                                    timePickerPersonal: 'title', // must have
                                                    textPicker1: 'Title', // must have
                                                    showPicker2: 'none'
                                                });
                                                this._filterTitle()
                                            }
                                            }>
                                                <Text>Title</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight style={[styles.pickerItem]}
                                            underlayColor="transparent"
                                            onPress={() => {
                                                this.setState({
                                                    timePickerPersonal: 'score', 
                                                    textPicker1: 'Score', 
                                                    showPicker2: 'none', 
                                                });
                                                this._filterScore();
                                            }
                                            }
                                            >
                                                <Text>Score</Text>
                                            </TouchableHighlight>
                                        </Modal>
                                    </View>
                                </View>
                            </TouchableHighlight>
                            {/* Picker */}
                        </View>
                    </View>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.inputForm}
                            onChangeText={(title) => { this.setState({ searchText: title }) }} 
                        />
                        <TouchableHighlight underlayColor="#1D8EAB" onPress={this._searchTitle} style={styles.searchImage}>
                            <Image source={magnifySearch} style={{ width: 20, height: 20 }} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.containerLeader}></View>
                    {this._outputUnivers()}
                    {
                        this.state.arrUniverOut.map((value, key) => {
                            return(
                                <View key={key}>
                                    <TouchableHighlight onPress={() => this._graphShow(key)} underlayColor="white">
                                        <LinearGradient colors={['#2FA4C2', '#1D8EAB']} style={styles.itemLeader}>
                                            <Text style={styles.textItemLeader}>{value.title}</Text>
                                            <Text style={styles.textItemLeader}>{value.score}</Text>
                                        </LinearGradient>
                                    </TouchableHighlight>
                                    <Animated.View                 // Special animatable View
                                        style={{
                                            opacity: this.state.arrUniver[key].styeShowGraph,
                                            display: this.state.arrUniver[key].opacNum == 0 ? 'none' : 'flex'
                                        }}
                                    >
                                        <View style={[styles.wrapperDiagram, {marginTop: 30}]}>
                                            <View style={styles.containerPerfomanceDiagram}>
                                                <View style={styles.wrapperTimePerfomance}>
                                                    <Text style={styles.textPerfomance}>INSTITUTION PERFORMANCE</Text>
                                                    <View style={styles.pickerWrapper}>
                                                        {/* todo */}
                                                        {/* Picker */}
                                                        <TouchableHighlight onPress={ () => {
                                                            if(this.state.showPicker[value.title] == 'none') this.setState({ showPicker: {[value.title]: 'flex'} /* must have */ });
                                                            else this.setState({ showPicker: {[value.title]: 'none'} /* must have */ });

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
                                                                    <Image source={upArrow} style={[styles.upArrow]} />
                                                                    <Image source={downArrow} style={[styles.downArrow]} />
                                                                <Text style={{
                                                                    fontSize: 14,
                                                                    fontFamily: 'SFUIText-Regular',
                                                                    marginRight: 30,
                                                                    display: this.state.showPicker[value.title] == 'none' || this.state.showPicker[value.title] == undefined ? 'flex' : 'none',
                                                                }}> {this.state.textPicker[value.title] == undefined ? 'Last 7' : this.state.textPicker[value.title]} </Text>
                                                                <View 
                                                                style={{
                                                                    display: this.state.showPicker[value.title] == undefined || this.state.showPicker[value.title] == 'none' ? 'none' : 'flex',
                                                                    marginTop: 20
                                                                }}>
                                                                    <Modal 
                                                                    animationType="slide"
                                                                    transparent={false}
                                                                    visible={this.state.showPicker[value.title] == 'none' || this.state.showPicker[value.title] == undefined ? false : true}
                                                                    style={{
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            paddingTop: 20 }}
                                                                    >
                                                                        <TouchableHighlight  style={[styles.pickerItem]}
                                                                        underlayColor="transparent"
                                                                        onPress={() => this.setState({
                                                                            [value.title]: 'last7', // must have
                                                                            textPicker: {[value.title]:'Last 7'}, // must have
                                                                            showPicker: {[value.title]: 'none'}
                                                                        })}>
                                                                            <Text>Last 7</Text>
                                                                        </TouchableHighlight>
                                                                        <TouchableHighlight style={[styles.pickerItem]}
                                                                        underlayColor="transparent"
                                                                        onPress={() => this.setState({
                                                                            [value.title]: 'last14', 
                                                                            textPicker: {[value.title]: 'Last 14'}, 
                                                                            showPicker: {[value.title]: 'none'}, 
                                                                            
                                                                        })}>
                                                                            <Text>Last 14</Text>
                                                                        </TouchableHighlight>
                                                                        <TouchableHighlight style={[styles.pickerItem]}
                                                                        underlayColor="transparent"
                                                                        onPress={() => this.setState({
                                                                            [value.title]: 'last21', 
                                                                            textPicker: {[value.title]: 'Last 21'},
                                                                            showPicker: {[value.title]: 'none'}
                                                                        })}>
                                                                            <Text>Last 21</Text>
                                                                        </TouchableHighlight>
                                                                        <TouchableHighlight style={[styles.pickerItem]}
                                                                        underlayColor="transparent"
                                                                        onPress={() => this.setState({
                                                                            [value.title]: 'last30', 
                                                                            textPicker: {[value.title]: 'Last Month'},
                                                                            showPicker: {[value.title]: 'none'}
                                                                        })}>
                                                                            <Text>Last Month</Text>
                                                                        </TouchableHighlight>
                                                                    </Modal>
                                                                </View>
                                                            </View>
                                                        </TouchableHighlight>
                                                        {/* Picker */}
                                                        {/* todo */}
                                                    </View>
                                                </View>
                                                <View style={styles.answerDiagram}>
                                                    <Text style={styles.textAnswer}>Correct answers</Text>
                                                    <Text style={styles.textAnswer}>{value.score}</Text>
                                                </View>
                                                <Chart data={value.data.last7} maxPoint={100} styleChart={this.state[value.title] == 'last7' ? 'flex' : 'none'} />
                                                <Chart data={value.data.last14} maxPoint={100} styleChart={this.state[value.title] == 'last14' ? 'flex' : 'none'} />
                                                <Chart data={value.data.last21} maxPoint={100} styleChart={this.state[value.title] == 'last21' ? 'flex' : 'none'} />
                                                <Chart data={value.data.last30} maxPoint={100} styleChart={this.state[value.title] == 'last30' ? 'flex' : 'none'} />
                                            </View>
                                        </View>
                                    </Animated.View>
                                </View>
                            )
                        })
                    }
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableHighlight underlayColor="#1D8EAB"
                            style={{marginTop: 50, 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                backgroundColor: '#1D8EAB',
                                padding: 5,
                                width: '50%'
                            }}
                            onPress={this._uploadMore}>
                                <Text style={{color: '#fff'}}>Upload more</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    leader: {
        backgroundColor: '#FAFAFD',
        minHeight: '100%'
    },
    arrowLeft: {
        width: 22,
        height: 15
    },
    wrapperLeader: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 25,
        paddingBottom: 25,
        marginTop: 20
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        alignItems: 'flex-start'
    },
    filterTitle: {
        fontSize: 18,
        color: '#3E3F42',
        fontFamily: 'SFUIText-Regular'
    },
    upArrow: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 18,
        top: 0,
        zIndex: 1000
    },
    downArrow: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 18,
        top: 10,
        zIndex: 101111100
    },
    upArrow2: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 10,
        top: -5,
        zIndex: 1000
    },
    downArrow2: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 10,
        top: 5,
        zIndex: 101111100
    },
    pickerStyle: {
        height: 50, 
        width: Dimensions.get('window').width > 600 ? 110 : 120, 
        color: '#9EA0A5', 
        backgroundColor: '#FAFAFD',
        fontSize: 18,
        position: 'absolute',
        right: -30,
        fontFamily: 'SFUIText-Regular'
    },
    pickerStyle2: {
        height: 50, 
        width: Dimensions.get('window').width > 600 ? 110 : 100, 
        color: '#9EA0A5', 
        backgroundColor: '#fff',
        fontSize: 11,
        position: 'absolute',
        right: -15,
        top: -25,
        
    },
    inputForm: {
        height: 40,
        borderBottomColor: '#C9C9C9',
        borderBottomWidth: 1,
        color: '#3E3F42',
        paddingLeft: 10
    },
    searchContainer: {
        marginTop: 30
    },
    searchImage: {
        position: 'absolute',
        right: 20,
        top: 10,
        width: 20,
        height: 20
    },
    itemLeader: {
        // paddingleft: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 25,
        paddingBottom: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        borderRadius: 5
    },
    textItemLeader: {
        color: '#fff'
    },
    bgFirst: {
        backgroundColor: '#2FA4C2',
        position: 'absolute',
        width: '50%',
        height: '100%',
        zIndex: -1
    },
    bgSecond: {
        backgroundColor: '#1D8EAB',
        position: 'absolute',
        width: '50%',
        height: '100%',
        zIndex: -1,
        right: 0,
        bottom: 0
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
    wrapperTimePerfomance: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textPerfomance: {
        color: '#9EA0A5',
        fontSize: 12
    },
    pickerWrapper: {
        position: 'relative',
    },
    answerDiagram: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center'
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
