import React, {Component} from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

import slideImg1 from '../uploads/img/Welcome.png';

export default class SliderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageState: '../uploads/img/compare.png',
        }
    }

    render() {
        // let urlImage = require(this.state.imageState);
        // alert(this.props.image)
        return(
            <View style={styles.container}>
                <Text style={styles.subtitleStyle}>
                    {this.props.subTitle}{'\n'}{'\n'}
                </Text>
                <Text style={styles.titleStyle}>
                    {this.props.title}
                </Text>
                <Image source={ {
                    uri: this.props.image
                } }
                style={styles.imageStyle} />
                <View style={styles.wrapperDescriptionStyle}>
                    <Text style={styles.descriptionStyle}>
                        {this.props.description}
                    </Text>
                </View>
            </View>
        );
    }

}

let styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
        flex: 1,
        flexDirection: 'column',
        margin: 0,
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        width: 400,
    },
    subtitleStyle: {
        color: "#3E4A59",
        fontSize: 16,
        lineHeight: 18
    },
    titleStyle: {
        color: '#1D8EAB',
        fontSize: 30,
        lineHeight: 36,
        marginBottom: 65,
        fontWeight: 'bold'
    },
    imageStyle: {
        alignSelf: 'center',
    },
    descriptionStyle: {
        textAlign: 'center'
    },
    wrapperDescriptionStyle: {
        paddingLeft: 50,
        paddingRight: 50,
        marginTop: 50,
        color: '#3E3F42',
        fontSize: 14
    },
    contentContainer: {
        paddingHorizontal: 20
      }
  
});