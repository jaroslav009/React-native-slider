import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Button, ScrollView, Dimensions, Picker } from 'react-native';
// import { BarChart, Grid, StackedBarChart } from 'react-native-svg-charts'

import Header from '../Header/Header';
import Chart from '../Chart/Chart';

import body from '../../uploads/img/body.png'
import upArrow from '../../uploads/img/up-arrow.png';
import downArrow from '../../uploads/img/sort-down-triangular-symbol.png';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timePickerPersonal: '',
        }
    }

    render() {
        const data = [ [{ number: 50, name: 'M' }, { number: 40, name: 'T' }, { number: 20, name: 'W' }, { number: 70, name: 'T'}, { number: 90, name: 'F' }, { number: 85, name: 'S' }, { number: 10, name: 'S' }], [{ number: 50, name: 'M' }, { number: 40, name: 'T' }, { number: 20, name: 'W' }, { number: 70, name: 'T'}, { number: 90, name: 'F' }, { number: 85, name: 'S' }, { number: 10, name: 'S' }] ]
        const data2 = [ [{ number: 10, name: 'M' }, { number: 20, name: 'T' }, { number: 24, name: 'W' }, { number: 23, name: 'T'}, { number: 0, name: 'F' }, { number: 25, name: 'S' }, { number: 0, name: 'S' }], [{ number: 0, name: 'M' }, { number: 0, name: 'T' }, { number: 32, name: 'W' }, { number: 22, name: 'T'}, { number: 21, name: 'F' }, { number: 22, name: 'S' }, { number: 21, name: 'S' }] ]

        return (
            <View style={{paddingBottom: 10}}>
                <ScrollView style={styles.wrapperDashboard}>
                    <Header />
                    {/* Hero section */}
                    <View style={styles.wrapperHero}>
                        <Image source={body} style={styles.backgroundImage} />
                        <View style={styles.wrapperHeroText}>
                            <Text style={styles.textWelcome}>Welcom, Devan!</Text>
                            <Text style={styles.textRad}>
                                <Text style={styles.numberRad}>173 </Text>
                                rad
                            </Text>
                        </View>
                    </View>
                    {/* Hero section */}

                    <View style={styles.wrapperDiagram}>
                        <View style={styles.containerPerfomanceDiagram}>
                            <View style={styles.wrapperTimePerfomance}>
                                <Text style={styles.textPerfomance}>PERSONAL PERFORMANCE</Text>
                                <View style={styles.pickerWrapper}>
                                    <Image source={upArrow} style={styles.upArrow} />
                                    <Image source={downArrow} style={styles.downArrow} />
                                    <Picker
                                        selectedValue={this.state.timePickerPersonal}
                                        style={styles.pickerStyle}
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
                                <Text style={styles.textAnswer}>4</Text>
                            </View>
                            <Chart data={data} maxPoint={100} />
                        </View>
                    </View>

                    <View style={[styles.wrapperDiagram, {marginTop: 30}]}>
                        <View style={styles.containerPerfomanceDiagram}>
                            <View style={styles.wrapperTimePerfomance}>
                                <Text style={styles.textPerfomance}>INSTITUTION PERFORMANCE</Text>
                                <View style={styles.pickerWrapper}>
                                    <Image source={upArrow} style={styles.upArrow} />
                                    <Image source={downArrow} style={styles.downArrow} />
                                    <Picker
                                        selectedValue={this.state.timePickerPersonal}
                                        style={styles.pickerStyle}
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
                            <Chart data={data2} maxPoint={100} />
                        </View>
                    </View>
                    <View style={styles.borderWindowBottom}></View>
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
        fontSize: 40,
        color: '#3E3F42'
    },
    textRad: {
        fontSize: 30,
        marginTop: 20,
        color: "#3E3F42"
    },
    numberRad: {
        fontSize: 35,
        color: '#3E3F42',
        fontWeight: '400'
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
        fontSize: 14
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
        fontSize: 18
    },
    answerDiagram: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    textAnswer: {
        fontSize: 18,
        color: '#3E3F42'
    },
    borderWindowBottom: {
        textAlign: 'center',
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 4,
        width: '50%',
        bottom: -0,
        left: '30%',
        marginTop: 30
    }
})