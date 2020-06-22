import React from 'react';
import { compose, withProps } from 'recompose';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
} from 'react-google-maps';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';

class SectionMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'path',
    };
  }
  computeCenter = (coords) => {
    let ret = { success: false, center: null };
    ret.parr = coords;
    ret.bounds = new window.google.maps.LatLngBounds();
    for (var i = 0; i < coords.length; i++) {
      ret.bounds.extend(
        new window.google.maps.LatLng(coords[i].lat, coords[i].lng)
      );
    }
    ret.getCenter = ret.bounds.getCenter();
    ret.center = {
      lat: ret.getCenter.lat(),
      lng: ret.getCenter.lng(),
    };
    ret.success = true;
    return ret;
  };
  parsePolygon = (parr) => {
    let ret = { success: false, points: [], error: '' };
    ret.parr = parr;
    if (
      !parr ||
      !parr.gpsLatitude ||
      typeof parr.gpsLatitude !== 'string' ||
      !parr.gpsLongitude ||
      typeof parr.gpsLongitude !== 'string'
    ) {
      ret.error = 'parr';
      return ret;
    }
    ret.gpsLatitude = parr.gpsLatitude.split(',').map((item) => {
      return parseFloat(item);
    });
    ret.gpsLongitude = parr.gpsLongitude.split(',').map((item) => {
      return parseFloat(item);
    });
    if (ret.gpsLatitude.length <= 2) {
      ret.error = 'polygon points count';
      return ret;
    }
    if (ret.gpsLatitude.length !== ret.gpsLongitude.length) {
      ret.error = 'polygon points count mismach';
      return ret;
    }
    for (let i in ret.gpsLatitude) {
      ret.points.push({
        lat: ret.gpsLatitude[i],
        lng: ret.gpsLongitude[i],
      });
    }
    ret.success = true;
    return ret;
  };
  parseHeatmapData = (parr) => {
    let ret = { success: false, points: [], error: '' };
    ret.parr = parr;
    if (
      !parr ||
      !parr.points ||
      !Array.isArray(parr.points) ||
      parr.points.length === 0
    ) {
      ret.error = 'parr';
      return ret;
    }
    for (let i in parr.points) {
      ret.points.push(
        new window.google.maps.LatLng(parr.points[i].lat, parr.points[i].lng)
      );
    }
    ret.success = true;
    return ret;
  };
  getBounds = (points) => {
    const bounds = new window.google.maps.LatLngBounds();
    points.map((point) => {
      console.log(point);
      bounds.extend(point);
    });
    return bounds;
  };
  render() {
    const orchardDetailsData = this.props.orchardDetails;
    let parsePolygon = this.parsePolygon(orchardDetailsData);
    if (!parsePolygon.success) {
      return '';
    }
    let computeCenter = this.computeCenter(parsePolygon.points);
    if (!computeCenter.success) {
      return '';
    }

    let PolygonComponent = () => '';
    if (this.state.mode === 'path') {
      PolygonComponent = () => (
        <Polygon
          path={parsePolygon.points}
          options={{
            fillColor: 'white',
            fillOpacity: 0.4,
            strokeColor: '#000',
            strokeOpacity: 1,
            strokeWeight: 1,
          }}
        />
      );
    }

    let HeatmapLayerComponent = () => '';
    if (this.state.mode === 'heatmap') {
      let parseHeatmapData = this.parseHeatmapData({
        points: parsePolygon.points,
      });
      if (!parseHeatmapData.success) {
        return '';
      }
      HeatmapLayerComponent = () => (
        <HeatmapLayer data={parseHeatmapData.points} />
      );
    }

    let bounds = this.getBounds(parsePolygon.points);

    console.log('parsePolygon', parsePolygon);
    console.log('bounds', bounds);

    return (
      <div className="orchad-map-buttons">
        <div className="uk-button-group inputRadioButtonSwitch">
          <button
            className={`btns alternative uk-width-2-3 ${
              this.state.mode === 'heatmap' ? 'active' : ''
            }`}
            onClick={() => this.setState({ mode: 'heatmap' })}
          >
            heat map
          </button>
          <button
            className={`btns alternative uk-width-1-3 ${
              this.state.mode === 'path' ? 'active' : ''
            }`}
            onClick={() => this.setState({ mode: 'path' })}
          >
            path
          </button>
        </div>
        <div className="section-map">
          <GoogleMap
            mapTypeId={window.google.maps.MapTypeId.HYBRID}
            ref={(map) => {
              if (map) {
                map.fitBounds(bounds);
              }
            }}
          >
            <HeatmapLayerComponent />
            <PolygonComponent />
          </GoogleMap>
        </div>
      </div>
    );
  }
}

export default compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyC6Ymhf4-41lJD3dAWE3MVr8GI6BodCLjQ&v=3.exp&libraries=geometry,drawing,places,visualization',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div
        className="uk-flex uk-flex-column orchad-map"
        style={{ height: `100%`, width: `100%` }}
      />
    ),
    mapElement: (
      <div className="section-map" style={{ height: `250px`, width: `100%` }} />
    ),
  }),
  withScriptjs,
  withGoogleMap
)(SectionMap);
