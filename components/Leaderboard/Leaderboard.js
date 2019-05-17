import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Animated, ScrollView, Dimensions, Picker, TextInput, TouchableHighlight} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
            itemsLeader: [
                {
                    title: 'Emory University',
                    score: 54,
                    data: [
                        [{ number: 10, name: 'M' }, { number: 40, name: 'T' }, { number: 20, name: 'W' }, { number: 70, name: 'T'}, { number: 90, name: 'F' }, { number: 85, name: 'S' }, { number: 10, name: 'S' }], [{ number: 50, name: 'M' }, { number: 40, name: 'T' }, { number: 20, name: 'W' }, { number: 70, name: 'T'}, { number: 90, name: 'F' }, { number: 85, name: 'S' }, { number: 10, name: 'S' }]
                    ],
                    styeShowGraph: new Animated.Value(0),
                    displayGraph: 'none',
                    opacNum: 0
                },
                {
                    title: 'Stanford University',
                    score: 24,
                    data: [
                        [{ number: 50, name: 'M' }, { number: 40, name: 'T' }, { number: 20, name: 'W' }, { number: 70, name: 'T'}, { number: 90, name: 'F' }, { number: 85, name: 'S' }, { number: 10, name: 'S' }], [{ number: 50, name: 'M' }, { number: 40, name: 'T' }, { number: 20, name: 'W' }, { number: 70, name: 'T'}, { number: 90, name: 'F' }, { number: 85, name: 'S' }, { number: 10, name: 'S' }]
                    ],
                    styeShowGraph: new Animated.Value(0),
                    displayGraph: 'none',
                    opacNum: 0
                },
                {
                    title: 'San Francisco Childrens Hospital',
                    score: 84,
                    data: [
                        [{ number: 90, name: 'M' }, { number: 40, name: 'T' }, { number: 20, name: 'W' }, { number: 70, name: 'T'}, { number: 90, name: 'F' }, { number: 85, name: 'S' }, { number: 10, name: 'S' }], [{ number: 50, name: 'M' }, { number: 40, name: 'T' }, { number: 20, name: 'W' }, { number: 70, name: 'T'}, { number: 90, name: 'F' }, { number: 85, name: 'S' }, { number: 10, name: 'S' }]
                    ],
                    styeShowGraph: new Animated.Value(0),
                    displayGraph: 'none',
                    opacNum: 0
                },
                {
                    title: 'San Francisco Childrens Hospital',
                    score: 14,
                    data: [
                        [{ number: 220, name: 'M' }, { number: 40, name: 'T' }, { number: 20, name: 'W' }, { number: 70, name: 'T'}, { number: 90, name: 'F' }, { number: 85, name: 'S' }, { number: 10, name: 'S' }], [{ number: 50, name: 'M' }, { number: 40, name: 'T' }, { number: 20, name: 'W' }, { number: 70, name: 'T'}, { number: 90, name: 'F' }, { number: 85, name: 'S' }, { number: 10, name: 'S' }]
                    ],
                    styeShowGraph: new Animated.Value(0),
                    displayGraph: 'none',
                    opacNum: 0
                },
                {
                    title: 'Emory University',
                    score: 44,
                    data: [
                        [{ number: 30, name: 'M' }, { number: 40, name: 'T' }, { number: 20, name: 'W' }, { number: 70, name: 'T'}, { number: 90, name: 'F' }, { number: 85, name: 'S' }, { number: 10, name: 'S' }], [{ number: 50, name: 'M' }, { number: 40, name: 'T' }, { number: 20, name: 'W' }, { number: 70, name: 'T'}, { number: 90, name: 'F' }, { number: 85, name: 'S' }, { number: 10, name: 'S' }]
                    ],
                    styeShowGraph: new Animated.Value(0),
                    displayGraph: 'none',
                    opacNum: 0
                },
            ]
        }
        this._graphShow = this._graphShow.bind(this);
        this._back = this._back.bind(this);
    }

    _graphShow(arg) {
        if(this.state.itemsLeader[arg].opacNum == 0) {
            this.setState(state => {
                const list = state.itemsLeader[arg].opacNum = 1;
                return {
                    list,
                };
            });
            Animated.timing(
                this.state.itemsLeader[arg].styeShowGraph,
                {
                  toValue: 1,
                  duration: 1000,
                },
            ).start();
        } else {
            this.setState(state => {
                const list = state.itemsLeader[arg].opacNum = 0;
                return {
                    list,
                };
            });
            Animated.timing(
                this.state.itemsLeader[arg].styeShowGraph,            
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

    render() {
        return (
            <ScrollView style={styles.leader}>
                <Header navigation={this.props.navigation} page="Leadboard" />
                <View style={styles.wrapperLeader}>
                    <TouchableHighlight onPress={() => this._back()} underlayColor="#fff">
                        <Image style={styles.arrowLeft} source={arrowLeft} />
                    </TouchableHighlight>
                    <View style={styles.filterContainer}>
                        <Text style={styles.filterTitle}>Leaderboard</Text>
                        <View>
                            <Image source={upArrow} style={styles.upArrow} />
                            <Image source={downArrow} style={styles.downArrow} />
                            <Picker
                                selectedValue={this.state.score}
                                style={styles.pickerStyle}
                                onValueChange={(itemValue) =>
                                    this.setState({score: itemValue})
                                }>
                                <Picker.Item style={styles.itemPickerLead} label="Score" value="score1" />
                                <Picker.Item style={styles.itemPickerLead} label="Score" value="score2" />
                                <Picker.Item style={styles.itemPickerLead} label="Title" value="title1" />
                                <Picker.Item style={styles.itemPickerLead} label="Title" value="title2" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.inputForm}
                        />
                        <Image source={magnifySearch} style={styles.searchImage} />
                    </View>
                    <View style={styles.containerLeader}></View>
                        {
                            this.state.itemsLeader.map((value, key) => {
                                return (
                                    <View key={key}>
                                        <TouchableHighlight onPress={() => this._graphShow(key)} underlayColor="white">
                                            <LinearGradient colors={['#2FA4C2', '#1D8EAB']} style={styles.itemLeader}>
                                                <Text style={styles.textItemLeader}>{value.title}</Text>
                                                <Text style={styles.textItemLeader}>{value.score}</Text>
                                            </LinearGradient>
                                        </TouchableHighlight>
                                        <Animated.View                 // Special animatable View
                                            style={{
                                                opacity: this.state.itemsLeader[key].styeShowGraph,
                                                display: this.state.itemsLeader[key].opacNum == 0 ? 'none' : 'flex'
                                            }}
                                        >
                                            <View style={[styles.wrapperDiagram, {marginTop: 30}]}>
                                                <View style={styles.containerPerfomanceDiagram}>
                                                    <View style={styles.wrapperTimePerfomance}>
                                                        <Text style={styles.textPerfomance}>INSTITUTION PERFORMANCE</Text>
                                                        <View style={styles.pickerWrapper}>
                                                            <Image source={upArrow} style={styles.upArrow2} />
                                                            <Image source={downArrow} style={styles.downArrow2} />
                                                            <Picker
                                                                selectedValue={this.state.timePickerPersonal}
                                                                style={styles.pickerStyle2}
                                                                onValueChange={(itemValue, itemIndex) =>
                                                                    this.setState({timePickerPersonal: itemValue})
                                                                }>
                                                                <Picker.Item label="Last 7 days" value="lastFirstWeek" />
                                                                <Picker.Item label="Last 14 days" value="lastSecondWeek" />
                                                                <Picker.Item label="Last 21 days" value="lastThirdWeek" />
                                                                <Picker.Item label="Last Month" value="lastMonth" />
                                                            </Picker>
                                                        </View>
                                                    </View>
                                                    <View style={styles.answerDiagram}>
                                                        <Text style={styles.textAnswer}>Correct answers</Text>
                                                        <Text style={styles.textAnswer}>54</Text>
                                                    </View>
                                                    <Chart data={value.data} maxPoint={100} />
                                                </View>
                                            </View>
                                        </Animated.View>
                                    </View>
                                )
                            })
                        }
                    </View>

                <View style={styles.borderWindowBottom}></View>
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
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
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
        top: 14,
        zIndex: 1000
    },
    downArrow: {
        width: 8,
        height: 8,
        position: 'absolute',
        right: 18,
        top: 25,
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
    borderWindowBottom: {
        textAlign: 'center',
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 4,
        width: '50%',
        bottom: -0,
        left: '30%',
        marginTop: 30
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
    }
})
