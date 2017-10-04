import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getMetricMetaInfo } from './utils/helpers'

export default class App extends React.Component {
  render() {
    return (
      <View>
        {getMetricMetaInfo('bike').getIcon()}
      </View>
    );
  }
}
