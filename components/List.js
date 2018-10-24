import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";

import { baseURL } from "../config.json";
import Card from "./Card.js";

export default class List extends React.Component {
  state = {
    query: "",
    results: []
  };

  getSongs = query => {
    fetch(baseURL + query)
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data.results });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <SearchBar
            rounded
            lightTheme
            style={styles.search}
            value={this.state.query}
            onChangeText={query => this.setState({ query })}
            onSubmitEditing={() => this.getSongs(this.state.query)}
            placeholder="Type Here..."
            autoCorrect={false}
          />
          {this.state.results.map(song => (
            <Card key={song.trackId} {...song} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%"
  },
  search: {
    // width: "80%"
  }
});
