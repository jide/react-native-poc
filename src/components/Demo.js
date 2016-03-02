import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  Animated
} from 'react-native';

import Drawer from 'react-native-drawer';
import Video from 'react-native-video';

import FastForward from './FastforwardControls';

export default class Demo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cardWrapperY: new Animated.ValueXY({ x: 0, y: -768 }),
      cardVisible: false
    };
  }

  openCard() {
    this.state.cardWrapperY.setValue({ x: 0, y: -768 });
    Animated.spring(this.state.cardWrapperY, {
      fromValue: { x: 0, y: -768 },
      toValue: { x: 0, y: 0 }
    }).start();
  }

  closeCard() {
    Animated.spring(this.state.cardWrapperY, {
      toValue: { x: 0, y: 768 }
    }).start();
  }

  openMenu() {
    this.drawer.toggle();
  }

  handleFastForward(time) {
    this.video.seek(time);
  }

  render() {
    return (
      <Drawer ref={ ref => this.drawer = ref } side='right' openDrawerOffset={ 100 } content={ <View><Text>hello</Text></View> }>
        <View style={styles.container}>
          <Video ref={ ref => this.video = ref } style={styles.video} source={{uri: 'http://d1t2zcjoi6ycwy.cloudfront.net/streams/home/en/TheHunt_Opening_preview_en-964.mp4'}}/>
          <TouchableHighlight onPress={ this.openCard.bind(this) }>
            <Text>Open card</Text>
          </TouchableHighlight>
          <View style={styles.menu}>
            <TouchableHighlight onPress={ this.openMenu.bind(this) }><Text>Index</Text></TouchableHighlight>
          </View>
          <FastForward onSeeked={ this.handleFastForward.bind(this) }/>
          <Animated.View style={ [ styles.cardWrapper, {
            transform: this.state.cardWrapperY.getTranslateTransform() }] }>
            <ScrollView directionalLockEnabled={true} decelerationRate='fast' showsVerticalScrollIndicator={false} alwaysBounceVertical={true} snapToInterval={768} style={[styles.scroll]}>
              <ScrollView directionalLockEnabled={true} decelerationRate='fast' horizontal={true} showsHorizontalScrollIndicator={false} alwaysBounceHorizontal={true} snapToInterval={640} style={styles.innerScroll}>
                <Image style={styles.image} source={{uri:"http://d1t2zcjoi6ycwy.cloudfront.net/output/species/arctic-fox/facts/general/0-landscape-opt@2x.jpg"}}/>
                <Image style={styles.image} source={{uri:"http://d1t2zcjoi6ycwy.cloudfront.net/output/species/arctic-fox/facts/general/1-landscape-opt@2x.jpg"}}/>
                <Image style={styles.image} source={{uri:"http://d1t2zcjoi6ycwy.cloudfront.net/output/species/arctic-fox/facts/general/2-landscape-opt@2x.jpg"}}/>
                <Image style={styles.image} source={{uri:"http://d1t2zcjoi6ycwy.cloudfront.net/output/species/arctic-fox/facts/hunt/1-landscape-opt@2x.jpg"}}/>
                <Image style={styles.image} source={{uri:"http://d1t2zcjoi6ycwy.cloudfront.net/output/species/arctic-fox/facts/hunt/2-landscape-opt@2x.jpg"}}/>
              </ScrollView>
              <View style={styles.page}><Text>hello</Text></View>
              <View style={styles.page}><Text>hello</Text></View>
              <View style={styles.page}><Text>hello</Text></View>
              <View style={styles.page}><Text>hello</Text></View>
            </ScrollView>
            <TouchableHighlight style={[styles.close]} onPress={ this.closeCard.bind(this) }>
              <Text style={[styles.closeText]}>X</Text>
            </TouchableHighlight>
          </Animated.View>
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  video: {
    width: 640,
    height: 480
  },
  scroll: {
    height: 768,
    width: 640,
    top: 0
  },
  innerScroll: {
    height: 768
  },
  image: {
    height: 768,
    width: 640
  },
  page: {
    height: 768,
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: 'blue'
  },
  close: {
    position: 'absolute',
    left: 640 + 30,
    top: 30
  },
  closeText: {
    color: '#000000'
  },
  menu: {
    position: 'absolute',
    right: 30,
    top: 200,
    height: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardWrapper: {
    height: 768,
    width: 640,
    position: 'absolute',
    left: (1024 / 2) - (640 / 2),
    top: 0
  }
});
