import React from 'react';
import { compose, withProps, withHandlers } from 'recompose';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
} from 'react-google-maps';
import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('map construcopr props', props);
  }

  render() {
    let markers = [...this.props.markers];
    let polygonpath = [...this.props.polygonpath];
    const { zoom, position, drawBy } = this.props;
    let polygonEdit = drawBy === 'polygon' && markers.length === 0;
    console.log('Map render', this.props);

    return (
      <GoogleMap
        mapTypeId={window.google.maps.MapTypeId.SATELLITE}
        defaultZoom={zoom}
        center={position}
        zoom={zoom}
        ref={this.props.onMapMounted}
        onClick={(parr) =>
          this.props.onAction({ type: 'onClick', payload: parr })
        }
      >
        <div className="search uk-flex big-map-search">
          <a
            className="over-map uk-flex uk-flex-center uk-flex-middle"
            type="button"
          >
            <span uk-icon="search" />
          </a>
          <div
            uk-dropdown="mode: hover; pos: left-center; animation: uk-animation-slide-left-small; delay-hide: 10000"
            className="uk-dropdown"
          >
            <a
              className="over-map uk-flex uk-flex-right uk-flex-middle"
              type="button"
            >
              <span uk-icon="triangle-right" />
            </a>
            <div
              uk-dropdown="mode: click; pos: left-center; animation: uk-animation-slide-left"
              className="uk-dropdown"
            >
              <input type="text" name="searchbox" className="form-control" />
            </div>
          </div>
        </div>

        {markers &&
          markers.length &&
          markers.map((marker) => <Marker {...marker} />)}
        {polygonpath && polygonpath.length && (
          <Polygon
            path={[...polygonpath]}
            editable
            draggable
            options={{
              fillColor: '#000',
              fillOpacity: 0.4,
              strokeColor: '#000',
              strokeOpacity: 1,
              strokeWeight: 1,
            }}
          />
        )}
        {polygonEdit && (
          <DrawingManager
            defaultDrawingMode={window.google.maps.drawing.OverlayType.POLYGON}
            defaultOptions={{
              drawingControl: false,
              drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                  window.google.maps.drawing.OverlayType.POLYGON,
                  window.google.maps.drawing.OverlayType.CIRCLE,
                  window.google.maps.drawing.OverlayType.POLYLINE,
                  window.google.maps.drawing.OverlayType.RECTANGLE,
                ],
              },
              polygonOptions: {
                clickable: true,
                draggable: true,
                editable: true,
                zIndex: 1,
              },
            }}
            onPolygonComplete={(parr) =>
              this.props.onAction({ type: 'onPolygonComplete', payload: parr })
            }
          />
        )}
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyC6Ymhf4-41lJD3dAWE3MVr8GI6BodCLjQ&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `547px` }} />,
  }),
  withHandlers(() => {
    const refs = {
      map: undefined,
    };
    return {
      onMapMounted: (props) => (ref) => {
        refs.map = ref;
        props.onAction({ type: 'onMapMounted', payload: { map: refs.map } });
      },
    };
  }),
  withScriptjs,
  withGoogleMap
)(Map);
