import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { Audio } from "expo";

import { baseURL } from "../config.json";
import Card from "./Card.js";

export default class List extends React.Component {
  state = {
    query: "",
    results: [],
    currentSound: {},
    songLoaded: false,
    currentTrackId: ""
  };

  getSongs = query => {
    fetch(baseURL + query)
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data.results });
      });
  };

  handlePlay = async (uri, trackId) => {
    if (this.state.songLoaded) {
      if (this.state.currentTrackId == trackId) {
        // console.log("pause");
        await this.state.currentSound.stopAsync();
        this.setState({ currentTrackId: "" });
        return;
      }
      // console.log("stop previous")
      await this.state.currentSound.stopAsync();
    }
    // console.log("play")
    const source = { uri };
    await Audio.setIsEnabledAsync(true);
    const sound = new Audio.Sound();
    await sound.loadAsync(source);
    await this.setState({
      currentSound: sound,
      songLoaded: true,
      currentTrackId: trackId
    });
    try {
      await this.state.currentSound.playAsync();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <SearchBar
            rounded
            lightTheme
            inputStyle={styles.search}
            value={this.state.query}
            onChangeText={query => this.setState({ query })}
            clearIcon
            onSubmitEditing={() => this.getSongs(this.state.query)}
            placeholder="Type Here..."
            autoCorrect={false}
          />
          {this.state.results.map(song => (
            <Card key={song.trackId} handlePlay={this.handlePlay} {...song} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  search: {
    color: "black"
  }
});
