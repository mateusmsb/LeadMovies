// chave TMDB 622557e59648e655bad0d02798fda0eb

import React, { Component } from "react";
import Movies from "./Screens/Movies";
import { createStackNavigator } from "react-navigation";
import { createAppContainer } from "react-navigation";
import Search from "./Screens/Search";
import Details from "./src/components/Details";
import Card from "./src/components/Card";
import Store from "./src/store";
import {connect, Provider} from "react-redux";
//import Store from "./src/store/index"


const Stack = createStackNavigator(
  {
    movies: { screen: Movies },
    search: { screen: Search },
    details: { screen: Details },
   
  },
  {
    initialRouteName: "search"
  }
);

const Screen = createAppContainer(Stack);

 export default class App extends Component {
  render() {
    return( 
    <Provider store={Store}>
    <Screen/>
    </Provider>
    )
  }
}


