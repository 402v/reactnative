/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  SegmentedControlIOS,
} = React;

// Scenes
var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  snapVelocity: 8,
  edgeHitWidth: SCREEN_WIDTH,
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
  springTension: 100,
  springFriction: 1,

  gestures: {
    pop: CustomLeftToRightGesture,
  }
});

// detail page
var DetailPage = React.createClass({
  render: function() {
    <View style={styles.container} />
  }
});

// list page
var ListPage = React.createClass({
  getInitialState() {
    return {
      titles: ['最新', '分类'],
      selectedIndex: 0,
      welcomeText: '最新',
    };
  },

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.welcome}>{this.state.welcomeText}</Text>

        // pre selected & color & event segmented control
        <SegmentedControlIOS 
          style={styles.segment} 
          values={this.state.titles}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}
          onValueChange={this._onValueChange} />
      </View>
    );
  },

  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  },

  _onValueChange(value) {
    this.setState({
      welcomeText: value
    });
  }
});

// my App
var Firststep = React.createClass({

  _renderScene(route, navigator) {
    if (route.id === 1) {
      return <ListPage navigator={navigator} />
    } else if (route.id === 2) {
      return <DetailPage navigator={navigator} />
    };
  },

  _configureScene(route) {
    return CustomSceneConfig;
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{id: 1, }}
        renderScene={this._renderScene}
        configureScene={this._configureScene} />
    );
  }
});

var styles = StyleSheet.create({
  container: {  // ListView, ListCell
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    // marginBottom: 10,
    backgroundColor: 'purple',//'#F5FCFF',
  },
  segment: {
    tintColor: "#ff0000",
  },
  welcome: {  // text
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: { // button
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('firststep', () => Firststep);
