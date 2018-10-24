import React from "react";
import { StyleSheet, Text, View } from "react-native";

import List from "./components/List";
import Header from "./components/Header";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <View style={styles.container}>
          <List />
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
