import React, { Component } from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Picker
} from "react-native";
import Store from "../src/store";
import Card from "../src/components/Card";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";

let keyword = "";

async function getMoviesFromApi(url) {
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson.results;
  } catch (error) {
    console.log(error);
  }
}

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      resultsAção: "",
      resultsDrama: "",
      resultsFantasia: "",
      resultsGuerra: "",
      resultsTerror: "",
      resultsComedia: ""
    };
  }

  URL =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=622557e59648e655bad0d02798fda0eb&language=pt-BR&page=1";

  URLacao =
    "https://api.themoviedb.org/3/discover/movie?api_key=622557e59648e655bad0d02798fda0eb&language=pt-BR&sort_by=popularity.descc&include_adult=false&include_video=false&page=" +
    Math.floor(Math.random() * 10) +
    1 +
    "&with_genres=28";

  URLdrama =
    "https://api.themoviedb.org/3/discover/movie?api_key=622557e59648e655bad0d02798fda0eb&language=pt-BR&sort_by=popularity.descc&include_adult=false&include_video=false&page=" +
    Math.floor(Math.random() * 10) +
    1 +
    "&with_genres=18";

  URLfantasia =
    "https://api.themoviedb.org/3/discover/movie?api_key=622557e59648e655bad0d02798fda0eb&language=pt-BR&sort_by=popularity.descc&include_adult=false&include_video=false&page=" +
    Math.floor(Math.random() * 10) +
    1 +
    "&with_genres=14";

  URLguerra =
    "https://api.themoviedb.org/3/discover/movie?api_key=622557e59648e655bad0d02798fda0eb&language=pt-BR&sort_by=popularity.descc&include_adult=false&include_video=false&page=" +
    Math.floor(Math.random() * 10) +
    1 +
    "&with_genres=10752";
  URLterror =
    "https://api.themoviedb.org/3/discover/movie?api_key=622557e59648e655bad0d02798fda0eb&language=pt-BR&sort_by=popularity.descc&include_adult=false&include_video=false&page=" +
    Math.floor(Math.random() * 10) +
    1 +
    "&with_genres=27";

  URLcomedia =
    "https://api.themoviedb.org/3/discover/movie?api_key=622557e59648e655bad0d02798fda0eb&language=pt-BR&sort_by=popularity.descc&include_adult=false&include_video=false&page=" +
    Math.floor(Math.random() * 10) +
    1 +
    "&with_genres=35";

  componentDidMount() {
    getMoviesFromApi(this.URL).then(response => {
      this.setState({ results: response });
    });

    getMoviesFromApi(this.URLacao).then(response => {
      this.setState({ resultsAção: response });
    });

    getMoviesFromApi(this.URLdrama).then(response => {
      this.setState({ resultsDrama: response });
    });

    getMoviesFromApi(this.URLfantasia).then(response => {
      this.setState({ resultsFantasia: response });
    });

    getMoviesFromApi(this.URLguerra).then(response => {
      this.setState({ resultsGuerra: response });
    });

    getMoviesFromApi(this.URLterror).then(response => {
      this.setState({ resultsTerror: response });
    });

    getMoviesFromApi(this.URLcomedia).then(response => {
      this.setState({ resultsComedia: response });
    });
    

  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#333333",
          justifyContent: "center"
        }}
      >
        <ScrollView style={{ flex: 1, paddingTop: 20 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                height: 40,
                width: 300,
                borderWidth: 1,
                borderRadius: 10,

                padding: 4,
                alignItems: "center",
                borderColor: "white",
                alignSelf: "center"
              }}
            >
              <TextInput
                style={{
                  alignSelf: "center",
                  borderColor: "white",
                  fontSize: 20,
                  color: "white",
                  width: 260
                }}
                placeholder={"Buscar filme..."}
                placeholderTextColor="white"
                onChangeText={text => {
                  keyword = text;
                  console.log(keyword);
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "gray",
                  borderRadius: 6,
                  padding: 2,
                  elevation: 3
                }}
                onPress={() => {
                  this.props.navigation.navigate("movies");
                  Store.dispatch({ type: "CHANGE_KEYWORD", payload: keyword });
                }}
              >
                <Icon name={"search"} size={26} color={"white"} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: (Dimensions.get("window").width / 3.05) * 1.8 * 7,
                marginTop: 50
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  marginTop: 10,
                  marginBottom: 8,
                  color: "white"
                }}
              >
                Em Cartaz
              </Text>
              <FlatList
                horizontal={true}
                data={this.state.results}
                renderItem={({ item }) => (
                  <Card
                    data={item}
                    width={Dimensions.get("window").width / 3.05}
                    onPress={() => this.props.navigation.navigate("details")}
                  />
                )}
              />

              <Text
                style={{
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  marginTop: 10,
                  marginBottom: 8,
                  color: "white"
                }}
              >
                Ação
              </Text>
              <FlatList
                horizontal={true}
                data={this.state.resultsAção}
                renderItem={({ item }) => (
                  <Card
                    data={item}
                    width={Dimensions.get("window").width / 3.05}
                    onPress={() => this.props.navigation.navigate("details")}
                  />
                )}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  marginTop: 10,
                  marginBottom: 8,
                  color: "white"
                }}
              >
                Drama
              </Text>
              <FlatList
                horizontal={true}
                data={this.state.resultsDrama}
                renderItem={({ item }) => (
                  <Card
                    data={item}
                    width={Dimensions.get("window").width / 3.05}
                    onPress={() => this.props.navigation.navigate("details")}
                  />
                )}
              />

              <Text
                style={{
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  marginTop: 10,
                  marginBottom: 8,
                  color: "white"
                }}
              >
                Fantasia
              </Text>
              <FlatList
                horizontal={true}
                data={this.state.resultsFantasia}
                renderItem={({ item }) => (
                  <Card
                    data={item}
                    width={Dimensions.get("window").width / 3.05}
                    onPress={() => this.props.navigation.navigate("details")}
                  />
                )}
              />

              <Text
                style={{
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  marginTop: 10,
                  marginBottom: 8,
                  color: "white"
                }}
              >
                Guerra
              </Text>
              <FlatList
                horizontal={true}
                data={this.state.resultsGuerra}
                renderItem={({ item }) => (
                  <Card
                    data={item}
                    width={Dimensions.get("window").width / 3.05}
                    onPress={() => this.props.navigation.navigate("details")}
                  />
                )}
              />

              <Text
                style={{
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  marginTop: 10,
                  marginBottom: 8,
                  color: "white"
                }}
              >
                Terror
              </Text>
              <FlatList
                horizontal={true}
                data={this.state.resultsTerror}
                renderItem={({ item }) => (
                  <Card
                    data={item}
                    width={Dimensions.get("window").width / 3.05}
                    onPress={() => this.props.navigation.navigate("details")}
                  />
                )}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  marginTop: 10,
                  marginBottom: 8,
                  color: "white"
                }}
              >
                Comédia
              </Text>
              <FlatList
                horizontal={true}
                data={this.state.resultsComedia}
                renderItem={({ item }) => (
                  <Card
                    data={item}
                    width={Dimensions.get("window").width / 3.05}
                    onPress={() => this.props.navigation.navigate("details")}
                  />
                )}
              />


            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
