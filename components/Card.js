import React from "react";
import { Text, StyleSheet, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import { Constants, Audio } from "expo";

export default class MediaCard extends React.Component {
  state = {
    isPlaying: false,
    sound: {}
  };

  render() {
    const {
      trackName,
      artistName,
      artworkUrl100,
      previewUrl,
      handlePlay,
      trackId
    } = this.props;
    return (
      <Card title={trackName} containerStyle={styles.containerStyle}>
        <Text style={styles.artist}>{artistName}</Text>
        <Image
          source={{
            uri: artworkUrl100
          }}
          style={styles.image}
        />
        <Button
          icon={{ name: "play-circle-outline" }}
          backgroundColor="#03A9F4"
          buttonStyle={styles.button}
          title="Play Sample"
          onPress={() => handlePlay(previewUrl, trackId)}
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 5
  },
  artist: {
    alignSelf: "center"
  },
  image: {
    flex: 1,
    alignSelf: "center",
    borderRadius: 5,
    width: 100,
    height: 100,
    margin: 10
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderRadius: 5
  }
});
