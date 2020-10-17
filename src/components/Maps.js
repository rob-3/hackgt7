import React, { Component } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const places = new Map();
places.set(28.60576, 'UCF');

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: null,
      found: false,
      popupPlace: null
    };
    this.goToInitialRegion = this.goToInitialRegion.bind(this);
    this.openPopup = this.openPopup.bind(this);
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 5,
          longitudeDelta: 5
        };
        this.setState({
          initialRegion: region,
          found: true
        });
        this.goToInitialRegion();
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  goToInitialRegion() {
    let initialRegion = Object.assign({}, this.state.initialRegion);
    initialRegion['latitudeDelta'] = 0.1;
    initialRegion['longitudeDelta'] = 0.1;
    this.mapView.animateToRegion(initialRegion, 2000);
  }

  openPopup(e) {
    console.log(e.nativeEvent);
    const coordinate = e.nativeEvent.coordinate;
    const place = places.get(coordinate.latitude);
    this.setState({popupPlace: place});
  }

  render() {
    return (
      <>
        {this.state.found ? (
          <MapView
            style={styles.mapStyle}
            region={this.state.mapRegion}
            followUserLocation={true}
            ref={ref => (this.mapView = ref)}
            zoomEnabled={true}
            showsUserLocation={true}
            onMapReady={this.goToInitialRegion}
            initialRegion={this.state.initialRegion}
          >
            <Marker
              key={0}
              coordinate={{ latitude: 28.60576, longitude: -81.196575}}
              title={'Title'}
              description={'Description that can be longer'}
              onPress={this.openPopup}
            >
              <View style={{backgroundColor: 'red', padding: 10}}>
              </View>
            </Marker>
          </MapView>
        ) : (
          <View style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </>
    );
  }
}////

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  indicatorStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Maps;
