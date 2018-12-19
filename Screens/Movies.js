// chave TMDB 622557e59648e655bad0d02798fda0eb

import React, { Component } from "react";
import {
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import Card from "../src/components/Card";
import { Provider } from "react-redux";
import Store from "../src/store";
import { connect } from "react-redux";
import Details from "../src/components/Details";

async function getMoviesFromApi(url) {
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson.results;
  } catch (error) {
    console.log(error);
  }
}

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = { results: "", fonte: 15 };
  }

  componentDidMount() {
    getMoviesFromApi(this.URL).then(response => {
      this.setState({ results: response });
      Store.dispatch({ type: "CHANGE_MOVIE", payload: response });
      
    });
  }

  URL =
    "https://api.themoviedb.org/3/search/movie?api_key=622557e59648e655bad0d02798fda0eb&language=pt-BR&query=" +
    Store.getState().keyword;

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#333333"
        }}
      >
        <Text
          style={{ fontWeight: "bold", alignSelf: "flex-start", marginTop: 10, marginBottom:8, color:"white" }}
        >
          Resultados
        </Text>
        <View style={{height: (Dimensions.get('window').width/2.05)*1.5 }} >
          <FlatList
            style={{
              borderColor: "black",
              height: 185,
              
            }}
            horizontal={true}
            data={this.state.results}
            renderItem={({ item }) => (
              <Card data={item} width={Dimensions.get('window').width/2.05} onPress={() => this.props.navigation.navigate("details")} />
            )}
          />
        </View>

        
      </SafeAreaView>
    );
  }
}
