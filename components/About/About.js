import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight } from 'react-native';

import Header from '../Header/Header';

import arrowLeft from '../../uploads/img/left-arrow.png'

export default class About extends Component {
    constructor(props) {
        super(props);
        this._back = this._back.bind(this);
    }
    _back() {
        this.props.navigation.goBack()
    }
    render() {
        return(
            <ScrollView style={{height: '100%', backgroundColor: '#FAFAFD'}}>
                <Header navigation={this.props.navigation} page="About" />
                <View style={{paddingLeft: 32, paddingRight: 32}}>
                    <TouchableHighlight onPress={() => this._back()} underlayColor="#fff" style={styles.arroweftCont}>
                        <Image style={{width: 22, height: 15}} source={arrowLeft} />
                    </TouchableHighlight>
                    
                    <Text style={styles.contSlack}>
                        - Technology framework triple bottom line because strategy compelling; social enterprise move the needle cultivate. Capacity building, ideate, granular communities change-makers; and invest.                    
                    </Text>
                    <Text style={styles.contSlack}>
                        - Incubator living a fully ethical life inspire design thinking shared unit of analysis leverage global. Impact movements peaceful, compelling triple bottom line game-changer expose the truth the. Granular; we must stand up justice incubator scalable inclusion                    </Text>
                    <Text style={styles.contSlack}>
                        - Replicable the resistance collaborative consumption empower communities thought leader framework problem-solvers. Relief targeted, strategize ecosystem white paper, mass incarceration move the needle catalyze strategize.                    
                    </Text>
                </View>
                    
                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.borderWindowBottom}></View>
                </View>
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    arroweftCont: {
        marginTop: 20,
    },
    contSlack: {
        color: '#3E3F42',
        fontSize: 16,
        marginTop: 30,
        fontFamily: 'SFUIText-Regular',
        lineHeight: 26
    },
    borderWindowBottom: {
        textAlign: 'center',
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 4,
        width: '50%',
        marginTop: '20%',
        bottom: 10,
    },
})