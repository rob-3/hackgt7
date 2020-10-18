import React, { Component } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View, TouchableOpacity, Text, TouchableHighlight, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import API from '../utils/API';

const places = new Map();
places.set(28.60576, 'UCF');

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: null,
      foundLocation: false,
      popupPlace: null,
      selectedMarker: null
    };
    this.goToInitialRegion = this.goToInitialRegion.bind(this);
  }

  async componentDidMount() {
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
          foundLocation: true
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
    const { foundLocation, selectedMarker } = this.state;
    const { loadingTrans, fraudulentTransactions } = this.props;
    console.log('found location');
    console.log(foundLocation);
    console.log('loading trans');
    console.log(loadingTrans);
    return (
      <>
        {(foundLocation && !loadingTrans) ? (
          <View style={styles.container}>
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
              {
                fraudulentTransactions ? 
                  fraudulentTransactions.map((trans, index) => {
                    const { longitude, latitude, count } = trans;
                    const fixedLat = latitude.toFixed(6);
                    const fixedLong = longitude.toFixed(6);
                    return (
                      <Marker
                        key={index}
                        coordinate={{ latitude: parseFloat(fixedLat), longitude: parseFloat(fixedLong)}}
                        onPress={() => this.setState({ selectedMarker: trans })}
                      >
                        <View style={{backgroundColor: `${count > 10 ? '#FF3B30' : '#FFF67D'}`, height: 20, width: 20, borderColor: 'black', borderWidth: 2, borderRadius: 1}}>
                        </View>
                      </Marker>
                    );
                  }) : null
              }
            </MapView>
            {
              selectedMarker && (
                <TouchableOpacity style={styles.overlay}>
                  <View style={styles.infoCard}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{selectedMarker.name}</Text>
                    <Text>Reports: {selectedMarker.count}</Text>
                    <Text>Last Report: February 3rd</Text>
                    <Text>Overall Rating: {selectedMarker.count < 10 ? 'Suspicious' : 'Dangerous'}</Text>
                    <TouchableHighlight onPress={() => {this.setState({ selectedMarker: null });}} style={styles.closeButton}>
                      <Text style={{ color: 'white' }}>Close</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableOpacity>
              )
            }
          </View>
        ) : (
          <View style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </>
    );
  }
}

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
  },
  closeButton: {
    width: '100%',
    backgroundColor: '#FF3B30',
    color: 'white',
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
    borderRadius: 10,
    borderColor: '#FF3B30',
    borderWidth: 1
  },
  infoCard: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 25,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  overlay: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: Dimensions.get('window').width - 30,
    height: 130,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Maps;
