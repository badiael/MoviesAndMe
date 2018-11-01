// Components/Search.js

import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  ActivityIndicator
} from "react-native";
import FilmItem from "./FilmItem";
import {
  getFilmsFromApiWithSearchedText,
  getImageFromApi
} from "../API/TMDBApi";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchedText = ""; // Initialisation de notre donnée searchedText en dehors du state
    this.state = {
      films: [],
      isLoading: false
    };
  }
  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      // Seulement si le texte recherché n'est pas vide
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
        this.setState({
          films: data.results,
          isLoading: false
        });
      });
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text; // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
  render() {
    console.log(this.state.isLoading);
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onSubmitEditing={() => this._loadFilms()}
          onChangeText={text => this._searchTextInputChanged(text)}
        />
        <Button
          style={{ height: 50 }}
          title="Rechercher"
          onPress={() => this._loadFilms()}
        />
        <FlatList
          data={this.state.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.state.films.length > 0) {
              console.log("onEndReached");
            }
          }}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Search;
