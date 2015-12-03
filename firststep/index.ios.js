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

// defines
var THUMB_URLS = [
  './icons/page_add.png',
  './icons/page_attach.png',
  './icons/page_code.png',
  './icons/page_copy.png',
  './icons/page_delete.png',
  './icons/page_edit.png',
  './icons/page_error.png',
  './icons/page_excel.png',
  './icons/page_find.png',
  './icons/page_gear.png',
  './icons/page_go.png',
  './icons/page_key.png',
];

var presentURL = 'https://cdn-images-1.medium.com/max/800/1*AB_Bd-432p7VgGTcE7JgrQ@2x.jpeg';
var categoryURL = 'https://cdn-images-1.medium.com/max/2000/1*a9VEyeLJGDSZSbCAS_9zVg@2x.jpeg';

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

  _handlePress() {
    this.props.navigator.pop();
  },

  render: function() {
    return (
      <View style={[styles.container, {backgroundColor: 'orange'}]}>
        <Text style={styles.welcome}>This is page two!</Text>
        <Image style={styles.picture} source={{uri: presentURL}} />
        <TouchableOpacity onPress={this._handlePress}>
          <View style={{paddingVertical: 10, paddingHorizontal: 10, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Go back</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
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
  },

  render: function() {
    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <View style={[styles.container]}>
        <Text style={styles.welcome}>{this.state.welcomeText}</Text>

        <SegmentedControlIOS 
          style={styles.segment} 
          values={this.state.titles}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}
          onValueChange={this._onValueChange} />

        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} />
      </View>
    );
  },

  // list
  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));

    var row = rowHash % THUMB_URLS.length;
    // var imgSource = require(THUMB_URLS[rowHash % THUMB_URLS.length]);

    // console.log("row hash:" + rowHash + " row:" + rowHash % THUMB_URLS.length)

    // var imgPath = THUMB_URLS[rowHash % THUMB_URLS.length];
    // console.log("img path:" + imgPath)

    // var imgSource = {
    //   uri: THUMB_URLS[rowHash % THUMB_URLS.length],
    // };
    // console.log("image source:" + imgSource.uri)

    var testImgSource = (this.state.selectedIndex === 0 ? presentURL : categoryURL);

    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="transparent">
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri: testImgSource}} />
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  _genRow: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var idx = 0; idx < 10; idx++) {
      var pressText = pressData[idx] ? ' (pressed' : '';
        dataBlob.push('Cell ' + idx + pressText);
    }
    return dataBlob;
  },

  _pressRow: function(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._genRow(this._pressData))
    });

    // push detail page
    this.props.navigator.push({id: 2,});
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

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var idx = str.length - 1; idx >= 0; idx--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(idx);
  }
  return hash;
};

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
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    width: 130,
    height: 130,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  thumb: {
    width: 64,
    height: 64
  },
  press_title: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },

  // detail
  picture: {
    width: 200,
    height: 200,
    marginBottom: 30,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});

AppRegistry.registerComponent('firststep', () => Firststep);

// module.exports = Firststep;

