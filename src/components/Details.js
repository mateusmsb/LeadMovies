import React, { Component } from "react";
import {
  Text,
  ScrollView,
  FlatList,
  View,
  Image,
  Dimensions
} from "react-native";
import Store from "../store";
import Card from "./Card";
import {connect} from "react-redux";

async function getMoviesFromApi(url) {
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson.results;
  } catch (error) {
    console.log(error);
  }
}

class Details extends Component {
  
  constructor(props) {
    super(props);
    this.state = { results: "", };
  }

  URL =
  "https://api.themoviedb.org/3/movie/"+Store.getState().selectedMovie.id+ "/recommendations?api_key=622557e59648e655bad0d02798fda0eb&language=pt-BR&page=1";

  componentDidMount() {
    getMoviesFromApi(this.URL).then(response => {
      Store.dispatch({type:"CHANGE_RELATED", payload: response});
      console.log(URL);
      console.log(Store.getState().related);
    });
  }
  
  
  render() {
    const releaseDate = Store.getState().selectedMovie.release_date.split("-");

    return (
      <ScrollView
        style={{
          flex: 1,

          backgroundColor: "#F5F5F5",

          backgroundColor: "#333333"
        }}
      >
        <View
          style={{
            flex: 1,

            backgroundColor: "#F5F5F5",
            alignItems: "center",
            padding: 12,
            backgroundColor: "#333333"
          }}
        >
          <View
            style={{
              height: 342,
              width: 342 / 1.5,
              borderWidth: 12,
              borderColor: "white"
            }}
          >
            <Image
              style={{ flex: 1 }}
              source={{
                uri:
                  "https://image.tmdb.org/t/p/w342" +
                  Store.getState().selectedMovie.poster_path
              }}
            />
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 19,
              marginTop: 4,
              textAlign: "center",
              color: "white"
            }}
          >
            {Store.getState().selectedMovie.title}
          </Text>
          <Text style={{ marginTop: 4, textAlign: "center", color: "white" }}>
            Titulo Original: {Store.getState().selectedMovie.original_title}
          </Text>

          <Text style={{ marginTop: 4, textAlign: "center", color: "white" }}>
            Data de lançamento: {releaseDate[2]}/{releaseDate[1]}/
            {releaseDate[0]}
          </Text>
          <Text style={{ marginTop: 8, textAlign: "center", color: "white" }}>
            {Store.getState().selectedMovie.vote_average}/10
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              alignSelf: "flex-start",
              marginTop: 12,
              color: "white"
            }}
          >
            Sinopse
          </Text>

          <Text style={{ marginBottom:12, marginTop: 12, textAlign: "left", color: "white" }}>
            {Store.getState().selectedMovie.overview}
          </Text>

          
          


          
          <FlatList
              horizontal={true}
              data={Store.getState().related}
              renderItem={({ item }) => (
                <Card
                  data={item}
                  width={Dimensions.get("window").width / 3.05}
                  onPress={() => this.props.navigation.navigate("details") }
                />
              )}
            />


        </View>
      </ScrollView>
    );
  }
}

mapProps = state =>{
  return{
    overview: state.selectedMovie.overview
  }
}

export default connect(mapProps)(Details)