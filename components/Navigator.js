import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import WrapSlider from './Slider/WrapSlider'
import Dashboard from './Dashboard/Dashboard'
import Header from './Header/Header'

const AppNavigator = createStackNavigator({
        WrapSlider: WrapSlider,
        // Dashboard: Dashboard,
        Header: Header,
    },
);

export default createAppContainer(AppNavigator);
