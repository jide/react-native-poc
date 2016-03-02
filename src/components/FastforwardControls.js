import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  PanResponder,
  Animated
} from 'react-native';

export default class FastforwardControls extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.paused !== this.props.paused);
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x
      }]),
      onPanResponderRelease: (event, gestureState) => {
        if (this.props.onSeeked) {
          this.props.onSeeked(gestureState.dx / 100);
        }

        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 }
        }).start();
      }
    });
  }

  render() {
    return (
      <View {...this.panResponder.panHandlers} style={ styles.wrapper }>
        <Animated.View style={ [ styles.indicator, {
          transform: this.state.pan.getTranslateTransform() }] }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: 526,
    height: 79,
    position: 'absolute',
    top: (768 / 2) - (79 / 2),
    left: (1024 / 2) - (526 / 2),
    borderWidth: 2,
    borderColor: '#595959',
    borderRadius: 39.5,
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },

  indicator: {
    position: 'relative',
    top: 0,
    left: (526 / 2),
    width: 71.5,
    height: 71.5,
    marginLeft: -37.75,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 100,
  }
});
