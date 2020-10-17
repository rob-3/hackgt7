import React, { Component } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View } from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: null,
      found: false
    };
    this.goToInitialRegion = this.goToInitialRegion.bind(this);
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
          />
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

export default Map;