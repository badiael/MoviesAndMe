import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text
} from "react-native";
import FilmItem from "./FilmItem";

import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";
//import films from "../Helpers/filmsData";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { films: [] };
  }
  _loadFilms() {
    getFilmsFromApiWithSearchedText("star").then(data => {
      this.setState = { films: data.results };
    });
  }
  render() {
    //this._loadFilms();
    console.log("render");
    return (
      <View style={{ marginTop: 20 }}>
        <TextInput style={styles.textinput} placeholder="Titre du film" />
        <Button
          style={{ height: 50 }}
          title="Rechercher"
          onPress={() => this._loadFilms()}
        />
        <FlatList
          data={this.state.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
        />
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
  }
});
