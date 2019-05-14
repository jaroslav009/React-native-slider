import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, findNodeHandle, ImageBackground} from 'react-native';

import Header from '../Header/Header';

import arrowLeft from '../../uploads/img/left-arrow.png'
import slack from '../../uploads/img/slack.png'

export default class Slack extends Component {
    render() {
        return(
            <ScrollView style={{height: '100%', backgroundColor: '#FAFAFD'}}>
                <Header />
                <View style={{paddingLeft: 32, paddingRight: 32}}>
                    <View style={styles.arroweftCont}>
                        <Image style={{width: 22, height: 15}} source={arrowLeft} />
                       
                    </View>
                    <Text style={styles.contSlack}>
                    If you'd like to join in on further disussion about today's quiz, please join us on Slack. There you can meet with others in your area and around the country all participating in radQD.
                    </Text>

                    <Image source={slack} />

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
        marginLeft: 20
    },
    contSlack: {
        color: '#3E3F42',
        fontSize: 16,
        lineHeight: 20,
        marginTop: 30
    },
    borderWindowBottom: {
        textAlign: 'center',
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 4,
        width: '50%',
        marginTop: '90%',
        bottom: 10,
    },
})