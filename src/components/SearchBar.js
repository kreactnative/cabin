/*
  Copyright 2015 Skippbox, Ltd

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import Colors from 'styles/Colors';
import PStyleSheet from 'styles/PStyleSheet';

const {
  View,
  Image,
  TextInput,
  Dimensions,
  InteractionManager,
  DeviceEventEmitter,
  Platform,
} = ReactNative;


const styles = PStyleSheet.create({
  container: {
    marginLeft: Platform.OS === 'ios' ? 35 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    ios: {
      width: Dimensions.get('window').width - 50,
      height: 32,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      marginLeft: 35,
      marginTop: 6,
      paddingHorizontal: 10,
      borderRadius: 6,
    },
    android: {
      width: Dimensions.get('window').width - 70,
      height: 45,
    },
  },
  icon: {
    width: 15, height: 15,
    tintColor: Colors.WHITE,
    opacity: 0.4,
    marginRight: 5,
  },
  input: {
    flex: 1,
    marginTop: 2,
    color: Colors.WHITE,
    android: {
      fontSize: 20,
      height: 45,
    },
  },
});

export default class SearchBar extends Component {

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.refs.input.focus();
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <Image source={require('images/search.png')} style={styles.icon} />}
        <TextInput
          ref="input"
          style={styles.input}
          placeholder="Search by name or label"
          numberOfLines={1}
          placeholderTextColor={'rgba(255, 255, 255, 0.4)'}
          returnKeyType="search"
          autoCapitalize="none"
          clearButtonMode="while-editing"
          onChangeText={(text) => {
            DeviceEventEmitter.emit('search:change', {text});
          }}
        />
      </View>
    );
  }

}
