import React from 'react'
import {
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native'
import PropTypes from 'prop-types'
import Modal from 'react-native-modalbox'
import styles from './styles'
import { createImageProgress } from 'react-native-image-progress'
import FastImage from 'react-native-fast-image'

const Image = createImageProgress(FastImage)

const { width, height } = Dimensions.get('window')
const swipeArea = Math.floor(height * 0.2)
const circleSnailProps = { thickness: 1, color: '#ddd', size: 80 }

export default class TNMediaViewerModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      heights: {
        default: Math.floor(height * 0.6),
      },
    }
    this.imageLoading = false
    this.imageDoneLoading = false
    this.mediaLayouts = []
    this.scrollviewRef = React.createRef()
  }

  onScrollView = scrollviewRef => {
    setTimeout(() => {
      if (scrollviewRef) {
        scrollviewRef.scrollTo({
          y: 0,
          x: this.mediaLayouts[this.props.selectedMediaIndex],
          animated: false,
        })
      }
    }, 50)
  }

  onImageLoad = (evt, uri) => {
    const { heights } = this.state
    const ImageHeight =
      evt.nativeEvent?.source?.height || evt.nativeEvent?.height
    const ImageWidth = evt.nativeEvent?.source?.width || evt.nativeEvent?.width

    const newHeight = Math.floor((ImageHeight / ImageWidth) * width)

    if (newHeight) {
      this.setState({
        heights: { ...heights, [uri]: newHeight },
      })
    }
  }

  renderCloseButton() {
    return (
      <TouchableOpacity
        style={styles.closeButton}
        onPress={this.props.onClosed}>
        <View
          style={[styles.closeCross, { transform: [{ rotate: '45deg' }] }]}
        />
        <View
          style={[styles.closeCross, { transform: [{ rotate: '-45deg' }] }]}
        />
      </TouchableOpacity>
    )
  }

  render() {
    const { isModalOpen, onClosed } = this.props
    const { heights } = this.state

    return (
      <Modal
        style={styles.container}
        isOpen={isModalOpen}
        onClosed={onClosed}
        position="center"
        swipeToClose
        swipeArea={swipeArea}
        swipeThreshold={4}
        coverScreen={true}
        backButtonClose={true}
        useNativeDriver={Platform.OS === 'android' ? true : false}
        animationDuration={500}>
        {this.renderCloseButton()}
        <ScrollView
          ref={this.onScrollView}
          style={{ flex: 1 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}>
          {this.props.mediaItems.length > 0 &&
            this.props.mediaItems.map((uri, index) => (
              <View
                key={index}
                style={styles.container}
                onLayout={event => {
                  const layout = event.nativeEvent.layout
                  this.mediaLayouts[index] = layout.x
                }}>
                {uri && (
                  <Image
                    source={{
                      uri,
                    }}
                    style={[
                      styles.deck,
                      { height: heights[uri] || heights['default'] },
                    ]}
                    indicatorProps={circleSnailProps}
                    resizeMode={'contain'}
                    onLoad={e => this.onImageLoad(e, uri)}
                  />
                )}
              </View>
            ))}
        </ScrollView>
      </Modal>
    )
  }
}

TNMediaViewerModal.propTypes = {
  mediaItems: PropTypes.array,
  onClosed: PropTypes.func,
  isModalOpen: PropTypes.bool,
}
