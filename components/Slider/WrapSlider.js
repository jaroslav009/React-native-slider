import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';

import slideImg1 from '../../uploads/img/Welcome.png';
import slideImg2 from '../../uploads/img/everyday.png';
import slideImg3 from '../../uploads/img/compare.png';

export default class WrapSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slides: [
                {
                    description: 'Log in with institutional email or sign up as attending user',
                    subTitle: 'Create an account',
                    title: 'Welcome to radQD, your daily quiz game!',
                    image: slideImg1,
                },

      
                {
                    description: 'Quiz questions will be available worldwide for exactly 60 seconds with the answer shown at 12:01pm EST. Be sure to log in early to not miss a second!',
                    subTitle: 'Be there on time',
                    title: 'Everyday we post new quiz at 12:00pm EST',
                    image: slideImg2,
                },
      
                {
                    description: 'Be sure to visit the leaderboards as you progress against other institutions.',
                    subTitle: 'Answer and compete!',
                    title: ' Compare your results with others',
                    image: slideImg3,
                },
            
              ],     
      
            current: 0,
      
              // Animation
            fadeValue: new Animated.Value(0),
        }
        this.dotNav = this.dotNav.bind(this);
    }

    dotNav = (id) => {
        this.setState({current: id});
    }

    prev() {
        if(this.state.current == 0) return;
        let prev = this.state.current - 1;
        this.setState({ current: prev });
        Animated.timing(this.state.fadeValue, {
          toValue: 1,
          duration: 1200,
        }).start();
    }

    next() {
        if(this.state.current == this.state.slides.length-1) return;
        let next = parseInt(this.state.current) + 1;
        this.setState({ current: next });
        Animated.timing(this.state.fadeValue, {
          toValue: 1,
          duration: 1200,
        }).start();
    }

    _fadeAnimation() {
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 1200,
        }).start();
    }

    render() {
        const colorArrow = this.state.fadeValue.interpolate({
            inputRange: [0, 150],
            outputRange: ['#677495', '#fff']
        })
        return (

            <View style={styles.navigationWrapper}>
            
                <View style={styles.wrapper}>
                {
                    this.state.slides.map( (item, i) => {
                        return (
                        <View key={i} id={i} style={ this.state.current == i ? styles.activeSlide : styles.sliderComponentStyle }>
                            <View style={styles.container}>
                                <Text style={styles.subtitleStyle}>
                                    {item.subTitle}
                                </Text>
                                <Text style={styles.titleStyle}>
                                    {item.title}
                                </Text>
                                <Image source={item.image} style={styles.imageStyle} />
                                <View style={styles.wrapperDescriptionStyle}>
                                    <Text style={styles.descriptionStyle}>
                                        {item.description}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        )
                    } )
                }
                </View>
                <View style={styles.navDots}>
                {
                    this.state.slides.map( (item, i) => {
                    return <Text key={i} style={ this.state.current == i ? styles.navDotsItemActive : styles.navDotsItem} id={i} onPress={this.dotNav.bind(this,i)}></Text>
                    })
                }
                </View>
                <View style={styles.wrapperArrow}>
                
                <Text onPress={this.prev.bind(this)} style={styles.navArrow}>
                <Animated.Text style={[styles.navArrowActive, {
                    color: colorArrow
                } ]}>
                    Prev
                </Animated.Text>
                </Text>
                <Text onPress={this.next.bind(this)} style={styles.navArrow}>Next</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
      height: '85%'
    },
    sliderComponentStyle: {
      position: 'absolute',
      transform: [
        { translateX: 2000000 }
      ],
    },
    
    activeSlide: {
      position: 'relative',
      transform: [
        { translateX: 0 }
      ],
    },
    navDots: {
      position: 'relative',
      alignSelf: 'center',
      justifyContent: 'flex-end',
      display: 'flex',
      flexDirection: 'row',
      marginTop: 50,
      flex: 1
    },
    navDotsItem: {
      backgroundColor: '#B5BBDF',
      opacity: 0.2,
      borderRadius: 100,
      marginRight: 10,
      padding: 10,
      paddingBottom: 0,
      paddingTop: 0,
      alignSelf: 'center'
    },
    navDotsItemActive: {
      backgroundColor: '#1D8EAB',
      borderRadius: 200,
      marginRight: 10,
      padding: 10,
      paddingBottom: 1,
      paddingTop: 1,
      alignSelf: 'center'
    },
    navArrow: {
      color: '#677495',
      fontSize: 18,
    },
    navArrowActive: {
      color: 'red',
      fontSize: 18,
    },
    wrapperArrow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
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
        textAlign: 'center',
        fontSize: 14,
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
  