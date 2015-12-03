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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return {
      // segment control
      titles: ['最新', '分类'],
      selectedIndex: 0,
      welcomeText: '最新',

      // list view
      dataSource: ds.cloneWithRows(this._genRow({})),
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    this._pressData = {};
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.welcome}>{this.state.welcomeText}</Text>

        <SegmentedControlIOS 
          style={styles.segment} 
          values={this.state.titles}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}
          onValueChange={this._onValueChange} />

        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} />
      </View>
    );
  },

  // list
  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)}>
        <View />
      </TouchableHighlight>
    );
  },

  _genRow: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var idx = 0; idx < 100; idx++) {
      var pressText = pressData[idx] ? ' (pressed' : '';
        dataBlob.push('Row ' + idx + pressText);
    }
    return dataBlob;
  },

  _pressRow: function(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._genRow(this._pressData))
    });
  },

  // segment actions
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
  container: {  // ListPage,DetailPage
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    // marginBottom: 10,
    backgroundColor: 'purple',//'#F5FCFF',
  },

  // segment
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

  // list
  row: {
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  thumb: {

  },
  press_title: {

  }
});

AppRegistry.registerComponent('firststep', () => Firststep);
