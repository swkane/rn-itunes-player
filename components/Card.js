import React from "react";
import { Text, StyleSheet, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import { Constants, Audio } from "expo";

export default class MediaCard extends React.Component {
  state = {
    isPlaying: false,
    sound: {}
  };
  async componentDidMount() {
    const source = {
      uri: this.props.previewUrl
    };
    await Audio.setIsEnabledAsync(true);
    const sound = new Audio.Sound();
    await sound.loadAsync(source);
    await this.setState({ sound });
  }
  render() {
    const { trackName, artistName, artworkUrl100, previewUrl } = this.props;
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
          onPress={async () => {
            try {
              console.log(this.state.sound);
              console.log("this.state.isPlaying", this.state.isPlaying);
              if (this.state.isPlaying) {
                await this.state.sound.pauseAsync();
              } else {
                await this.state.sound.playAsync();
              }
              this.setState((prevState, props) => {
                return { isPlaying: !prevState.isPlaying };
              });
            } catch (error) {
              console.error(error);
            }
          }}
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
