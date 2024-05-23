import React from 'react';
import { View, StyleSheet, WebView } from 'react-native';

const LeafletMap = () => {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.map}
        source={{ uri: 'https://leafletjs.com/examples/quick-start/example.html' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default LeafletMap;
