import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Store from "../store";
import { connect } from "react-redux";

async function getMoviesFromApi(url) {
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson.results;
  } catch (error) {
    console.log(error);
  }
}

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { fontSize: 15 };
  }

  render() {
    const sinopseTittle = "Sinopse: ";
    const sinopse = this.props.data.overview;
    const releaseDate = this.props.data.release_date.split("-");

    return (
      <View>
        <TouchableOpacity
          style={{
            flex: 1,
            borderTopColor: "#E4E4E4",
            margin: 2,
            justifyContent: "center"
          }}
          onPress={() => {
            Store.dispatch({
              type: "CHANGE_SELECTED",
              payload: this.props.data
            });
            console.log(Store.getState().selectedMovie);
            this.props.onPress();
          }}
        >
          <Image
            style={{ height: this.props.width * 1.5, width: this.props.width }}
            source={{
              uri:
                "https://image.tmdb.org/t/p/w342" + this.props.data.poster_path
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
