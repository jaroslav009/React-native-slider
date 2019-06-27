import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Dimensions} from 'react-native';
import firebase from 'react-native-firebase';

import Header from '../Header/Header';

import arrowLeft from '../../uploads/img/left-arrow.png'
import userFill from '../../uploads/img/user-outlines.png';
import check from '../../uploads/img/checked.png';
import cancel from '../../uploads/img/close.png';
import cancelGrey from '../../uploads/img/close-grey.png';

export default class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataQuiz: [],
            laterKey: null,
            data: [],
            answers: [],
            allSum: 0,
            normVar: 0,
            clickHeader: false,
        }
        this._back = this._back.bind(this);
        this.handleClickHeader = this.handleClickHeader.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;
        console.log('key',navigation.getParam('value'));
        this.setState({ data: navigation.getParam('value'), answers: navigation.getParam('value').answers });
        firebase.database().ref( "Cards/Open/"+navigation.getParam('id') ).once("child_added", (snapshot) => { 
            console.log('snapshot.key',snapshot);
        });
        let sum = 0;
        let boofer = 0;
        let normVar = 0;
        navigation.getParam('value').answers.map((value, key) => {
            if(value.statisticChoose != undefined) {
                sum = value.statisticChoose + sum;
            }
            if(value.statisticChoose > boofer) {
                normVar = key;
                boofer = value.statisticChoose;
            }
        });
        this.setState({ allSum: sum, normVar });
    }

    _back() {
        this.props.navigation.goBack()
    }

    handleClickHeader = (value) => {
        this.setState({clickHeader: value});
    }

    render() {
        let sum;
        return (
            <ScrollView stickyHeaderIndices={[0]} >
                <View style={{ minHeight: Dimensions.get('window').height }}>
                    <Header navigation={this.props.navigation} page="Quiz" click={this.handleClickHeader} style={{ 
                        width: '100%', height: this.state.clickHeader == false ? 50 : Dimensions.get('window').height, 
                        position: 'absolute', 
                        zIndex: 100000,
                        elevation: 1000 }} />
                    <View style={{ marginTop: 60 }}>
                        <TouchableHighlight onPress={() => this._back()} underlayColor="#fff" style={styles.arroweftCont}>
                            <Image style={{width: 22, height: 15}} source={arrowLeft} />
                        </TouchableHighlight>
                        <Image style={styles.backgrImg} source={{uri: this.state.data.image}} />
                        <View style={styles.containerQuiz}>

                            {
                                this.state.answers.map((value, key) => {
                                let answ;
                                let borderColor;
                                if(value.correct == true && this.state.normVar == key) {
                                    answ = check;
                                    borderColor = '#1D8EAB';
                                } 
                                else if(this.state.normVar == key && value.correct == undefined) {
                                    answ = cancel;
                                    borderColor = '#FF6464';
                                } 
                                else {
                                    answ = cancelGrey;
                                    borderColor = '#9ea0a5';
                                }
                                
                                if(value.statisticChoose == undefined) {
                                    value.statisticChoose = 0;
                                }
                                sum = Math.round( (value.statisticChoose*100)/this.state.allSum );
                                    return (
                                        <View key={key} style={[styles.itemQuiz, {
                                            width: '80%',
                                            borderWidth: this.state.normVar == key ? 2 : 0,
                                            borderColor: value.correct == true && this.state.normVar == key ? '#1D8EAB' : '#FF6464'
                                            }]}>
                                            <View key={key} style={styles.topPartItem}>
                                                <View style={{display: 'flex', flexDirection: 'row', paddingLeft: 12, paddingRight: 12}}>
                                                    <Image source={userFill} />
                                                    <Text style={{marginLeft: 5, fontSize: 12}}>{value.statisticChoose == undefined ? '0' : value.statisticChoose} ({sum}%)</Text>
                                                </View>
                                                <View>
                                                    <Text style={[styles.greyText, {fontSize: 12, paddingLeft: 12, paddingRight: 12}]}>
                                                        Avg: {value.statTime == undefined ? '0' : value.statTime} sec.
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.bottomItem}>
                                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Text style={[styles.greenText, {fontSize: 16, fontFamily: 'SFUIText-Semibold'}]}>{value.variant}</Text>
                                                    <Text style={{marginLeft: 16, color: '#3E3F42', fontSize: 16, fontFamily: 'SFUIText-Semibold'}}>{value.name}</Text>
                                                </View>
                                                <View style={[styles.checkStyle, { borderColor: value.correct == true ? '#1D8EAB' : borderColor }]}>
                                                    <Image source={value.correct == true ? check : answ} style={{ width: 20, height: 20 }} />
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    backgrImg: {
        width: '100%',
        height: 150,
        position: 'relative'
    },
    arroweftCont: {
        backgroundColor: '#fff',
        padding: 10,
        position: 'absolute',
        zIndex: 100,
        left: 20,
        top: 20
    },
    containerQuiz: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    itemQuiz: {
        backgroundColor: '#fff',
        top: -30,
        // width: '70%',
        elevation: 5,
        marginTop: 20,
        borderRadius: 5
    },
    topPartItem: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10
    },
    greyText: {
        color: '#707070'
    },
    bottomItem: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    greenText: {
        color: '#1D8EAB'
    },
    checkStyle: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#1D8EAB',
        padding: 5
    },
})