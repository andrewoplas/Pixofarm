import React from 'react';
import { geolocated } from 'react-geolocated';
import { injectIntl } from 'react-intl';
import Map from './map';

class MapFrame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {},
      zoom: 6.9,
      mapDetails: {},
      searchbox: '',
      showFarms: true,
      showOrchards: false,
      mapFarmInfoWindow: false,
    };
    this.dataloaded = false;
    this.mapref = null;
    this.searchSuggestions = [];
  }

  componentDidMount() {
    let defaultPosition = {
      lat: 50.59157,
      lng: 10.58547,
    };

    if (
      this.props.isGeolocationAvailable &&
      this.props.isGeolocationEnabled &&
      this.props.coords
    ) {
      defaultPosition.lat = this.props.coords.latitude;
      defaultPosition.lng = this.props.coords.longitude;
    }

    this.setState({
      position: defaultPosition,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('MapFrame componentDidUpdate', prevProps, this.props)
    if (
      prevProps &&
      prevProps.groupsFarms &&
      prevProps.groupsFarms.loading &&
      !this.props.groupsFarms.loading
    ) {
      this.dataloaded = true;
      if (this.dataloaded && this.mapref) {
        this.onDataRecived({ data: this.props.groupsFarms.data });
      }
    }
    if (
      prevState &&
      prevState.searchbox &&
      prevState.searchbox !== this.state.searchbox
    ) {
      let ret = {};
      ret.searchDo = this.searchDo({
        needle: this.state.searchbox,
        haistack: this.searchSuggestions,
      });
      if (ret.searchDo.resp) {
        ret.putOnMapSearchResult = this.putOnMapSearchResult(ret.searchDo.resp);
      }
      console.log('searchbox', ret);
    }
  }
  searchDo = (parr) => {
    let ret = { success: false, error: '', resp: null };
    ret.parr = parr;
    if (!parr || !parr.needle || !parr.haistack) {
      ret.error = 'parr';
      return ret;
    }
    ret.found = parr.haistack.find((element) => {
      return !(element.label.toLowerCase().indexOf(parr.needle) === -1);
    });
    if (typeof ret.found !== 'undefined') {
      ret.resp = ret.found;
    }
    ret.success = true;
    return ret;
  };
  putOnMapSearchResult = (parr) => {
    let ret = { success: false, error: '', resp: null };
    ret.parr = parr;
    if (!parr || !parr.label || !parr.type || !parr.position || !parr.data) {
      ret.error = 'parr';
      return ret;
    }
    switch (parr.type) {
      case 'farm':
        this.setState({
          position: parr.position,
          mapFarmInfoWindow: parr.data.id,
          zoom: 6,
        });
        // this.onAction({ type: 'onZoomChanged', payload: { zoom: 6.9 } })
        break;
      default:
        break;
    }
    ret.success = true;
    return ret;
  };
  mapDetails = (parr) => {
    let ret = { success: false, error: '', resp: {} };
    ret.parr = parr;
    if (!parr || !parr.dataGroupParse) {
      ret.error = 'parr';
      return ret;
    }
    ret.resp.farmMarkers = {};
    for (let farmi in parr.dataGroupParse.farmbyid) {
      let farm = parr.dataGroupParse.farmbyid[farmi];
      if (farm.center) {
        ret.resp.farmMarkers[farmi] = {
          marker: {
            key: 'farmMarker_' + farmi,
            position: farm.center,
          },
          farm: farm,
        };
      }
    }
    ret.resp.farmInfoWindows = {};
    for (let farmi in parr.dataGroupParse.farmbyid) {
      let farm = parr.dataGroupParse.farmbyid[farmi];
      if (farm.numberOfOrchards > 0) {
        ret.farmInfoWindowGet1 = this.farmInfoWindowGet1(farm);
        if (ret.farmInfoWindowGet1.success) {
          ret.resp.farmInfoWindows[farmi] = {
            content: ret.farmInfoWindowGet1.content,
          };
        }
      }
    }
    ret.resp.orchardPolygons = {};
    for (let orchardi in parr.dataGroupParse.orchardbyid) {
      let orchard = parr.dataGroupParse.orchardbyid[orchardi];
      if (orchard.position) {
        ret.resp.orchardPolygons[orchardi] = {
          polygon: {
            key: 'orchardPolygon_' + orchardi,
            path: orchard.position,
          },
          orchard: orchard,
        };
      }
    }
    ret.resp.orchardMarkers = {};
    for (let orchardi in parr.dataGroupParse.orchardbyid) {
      let orchard = parr.dataGroupParse.orchardbyid[orchardi];
      if (orchard.center) {
        ret.resp.orchardMarkers[orchardi] = {
          marker: {
            key: 'orchardMarker_' + orchardi,
            position: orchard.center,
          },
          orchard: orchard,
        };
      }
    }
    ret.resp.orchardMarkerLabels = {};
    for (let orchardi in parr.dataGroupParse.orchardbyid) {
      let orchard = parr.dataGroupParse.orchardbyid[orchardi];
      if (orchard.center) {
        ret.resp.orchardMarkerLabels[orchardi] = {
          content: orchard.orchardName,
          overlayView: {
            key: 'orchardMarkerLabel_' + orchardi,
            position: orchard.center,
          },
          orchard: orchard,
        };
      }
    }
    ret.resp.orchardMarkerInfos = {};
    for (let farmi in parr.dataGroupParse.farmbyid) {
      let farm = parr.dataGroupParse.farmbyid[farmi];
      if (farm.numberOfOrchards > 0) {
        for (let orchardi in farm.orchardbyid) {
          let orchard = farm.orchardbyid[orchardi];
          ret.orchardMarkerInfoGet1 = this.orchardMarkerInfoGet1({
            farm,
            orchard,
          });
          if (ret.orchardMarkerInfoGet1.success) {
            ret.resp.orchardMarkerInfos[orchardi] = {
              content: ret.orchardMarkerInfoGet1.content,
              overlayView: {
                key: 'orchardMarkerInfo_' + orchardi,
                position: orchard.center,
              },
              orchard: orchard,
            };
          }
        }
      }
    }
    ret.success = true;
    return ret;
  };
  onAction = (parr) => {
    // console.log(parr.type, parr.payload)
    switch (parr.type) {
      case 'onZoomChanged':
        this.onMap_onZoomChanged(parr.payload);
        break;
      case 'onCenterChanged':
        this.onMap_onCenterChanged(parr.payload);
        break;
      case 'onMapMounted':
        this.onMap_onMapMounted(parr.payload);
        break;
      case 'inputchange':
        if (Object.keys(this.state).includes(parr.payload.name)) {
          this.setState({
            [parr.payload.name]: parr.payload.value,
          });
        }
        break;
      default:
        break;
    }
  };
  onDataRecived = (parr) => {
    let ret = { success: false, error: '', resp: {} };
    ret.parr = parr;
    if (!parr || !parr.data) {
      ret.error = 'parr';
      return ret;
    }
    ret.dataGroupParse = this.dataGroupParse(parr.data);
    if (!ret.dataGroupParse.success) {
      ret.error = 'dataGroupParse';
      return ret;
    }
    ret.mapDetails = this.mapDetails({ dataGroupParse: ret.dataGroupParse });
    if (!ret.mapDetails.success) {
      ret.error = 'mapDetails';
      return ret;
    }
    ret.searchSuggestionsPopulate = this.searchSuggestionsPopulate({
      dataGroupParse: ret.dataGroupParse,
    });
    if (!ret.searchSuggestionsPopulate.success) {
      ret.error = 'searchSuggestionsPopulate';
      return ret;
    }
    this.searchSuggestions = ret.searchSuggestionsPopulate.resp;

    ret.farms_bounds = null;
    ret.farms_positions = [];
    if (ret.mapDetails.resp.farmMarkers) {
      let farmMarkers = Object.values(ret.mapDetails.resp.farmMarkers);
      if (farmMarkers.length > 0) {
        ret.farms_bounds = new window.google.maps.LatLngBounds();
        for (let fmi in farmMarkers) {
          let farmMarker = farmMarkers[fmi];
          ret.farms_bounds.extend(
            new window.google.maps.LatLng(
              farmMarker.marker.position.lat,
              farmMarker.marker.position.lng
            )
          );
          ret.farms_positions.push({
            lat: farmMarker.marker.position.lat,
            lng: farmMarker.marker.position.lng,
          });
        }
      }
    }

    this.setState(
      {
        mapDetails: ret.mapDetails.resp,
        position: ret.dataGroupParse.center,
      },
      () => {
        if (ret.farms_bounds) {
          ret.farms_bounds_onmap = true;
          let viewBounds = this.mapref.getBounds();
          if (!viewBounds) return;
          for (let fi in ret.farms_positions) {
            if (!viewBounds.contains(ret.farms_positions[fi])) {
              ret.farms_bounds_onmap = false;
            }
          }
          if (!ret.farms_bounds_onmap) {
            this.mapref.fitBounds(ret.bounds);
          }
        }
      }
    );

    ret.success = true;
    console.log('onDataRecived', ret);
    return ret;
  };
  searchSuggestionsPopulate = (parr) => {
    let ret = { success: false, error: '', resp: [] };
    ret.parr = parr;
    if (!parr || !parr.dataGroupParse) {
      ret.error = 'parr';
      return ret;
    }
    //add farm names to array
    for (let farmi in parr.dataGroupParse.farmbyid) {
      let farm = parr.dataGroupParse.farmbyid[farmi];
      if (farm.center) {
        ret.resp.push({
          label: farm.farmName,
          position: farm.center,
          type: 'farm',
          data: farm,
        });
      }
    }
    ret.success = true;
    return ret;
  };
  onMap_onZoomChanged = (parr) => {
    if (!parr || !parr.zoom) return;
    // console.log('onMap_onZoomChanged', parr)

    let showFarms = parr.zoom <= 12;
    let showOrchards = !showFarms;
    this.setState({
      showFarms: showFarms,
      showOrchards: showOrchards,
      zoom: parr.zoom,
    });
  };
  onMap_onCenterChanged = (parr) => {
    if (!parr || !parr.center) return;
    // console.log('onMap_onCenterChanged', parr)
    this.setState({
      position: parr.center.toJSON(),
    });
  };
  onMap_onMapMounted = (parr) => {
    if (!parr || !parr.map) return;
    console.log('onMap_onMapMounted', parr);
    this.mapref = parr.map;
    if (this.dataloaded && this.mapref) {
      this.onDataRecived({ data: this.props.groupsFarms.data });
    }
  };
  farmInfoWindowGet1 = (farm) => {
    let ret = { success: false, content: () => {} };
    ret.parr = farm;
    let onOrchardClick = async (orchard) => {
      let computeCenter = this.computeCenter(orchard.position);
      // console.log('onOrchardClick', orchard, computeCenter, this)
      let newzoom = 30;
      this.setState(
        {
          zoom: newzoom,
          position: computeCenter.center,
        },
        () => {
          this.mapref.fitBounds(computeCenter.bounds);
        }
      );
      this.onAction({ type: 'onZoomChanged', payload: { zoom: newzoom } });
    };
    let key = 0;
    ret.menuitems = Object.values(farm.orchardbyid).map((orchard) => {
      key++;
      return (
        <div
          className="map-popup-list"
          key={'infobutton_' + key}
          onClick={() => onOrchardClick(orchard)}
        >
          <div className="orchad-title link">{orchard.orchardName}</div>
          <div className="farm-name">{farm.farmName}</div>
        </div>
      );
    });
    ret.content = () => {
      return (
        <div className="uk-flex uk-flex-column uk-flex-center">
          {ret.menuitems}
        </div>
      );
    };

    ret.success = true;
    return ret;
  };
  orchardMarkerInfoGet1 = (parr) => {
    const {
      intl: { messages, locale },
    } = this.props;
    let ret = { success: false };

    let fruitType = null;
    if (parr.orchard.fruit && parr.orchard.fruit.type) {
      fruitType = parr.orchard.fruit.type;
    }
    let fruitVariety = null;
    if (parr.orchard.fruit && parr.orchard.fruit.variety) {
      fruitVariety = parr.orchard.fruit.variety;
    }

    ret.parr = parr;
    ret.content = () => {
      return (
        <div className="map-orchad-details">
          <div className="orchad-name">{parr.orchard.orchardName}</div>
          <div className="orchad-farm-name">{parr.farm.farmName}</div>
          <div className="orchad-detail detail uk-flex">
            <div className="label">{messages.orchad.details.orchadSize}:</div>
            <div className="value">{parr.orchard.calculatedSize | '--'}</div>
          </div>
          <div className="orchad-detail detail uk-flex">
            <div className="label">{messages.orchad.details.fruitType}:</div>
            <div className="value">{fruitType || '--'}</div>
          </div>
          <div className="orchad-detail detail uk-flex">
            <div className="label">{messages.orchad.details.fruitVariety}:</div>
            <div className="value">{fruitVariety || '--'}</div>
          </div>
          <div className="harvest-details uk-column-1-2">
            <div className="orchad-detail uk-flex uk-flex-column">
              <div className="label">
                {messages.orchad.details.averageDiameter}:123
              </div>
              <div className="value">{'--'}</div>
            </div>
            <div className="orchad-detail uk-flex uk-flex-column bottom">
              <div className="label">
                {messages.orchad.details.predictedDiameter}:
              </div>
              <div className="value">{'--'}</div>
            </div>
            <div className="orchad-detail uk-flex uk-flex-column">
              <div className="label">{messages.orchad.details.growthRate}:</div>
              <div className="value">{'--'}</div>
            </div>
            <div className="orchad-detail uk-flex uk-flex-column bottom">
              <div className="label">
                {messages.orchad.details.forecastProduction}:
              </div>
              <div className="value">{'--'}</div>
            </div>
          </div>
        </div>
      );
    };
    ret.success = true;
    return ret;
  };
  dataGroupParse = (parr) => {
    let ret = {
      success: false,
      error: '',
      farmbyid: {},
      orchardbyid: {},
      groupbyid: {},
    };
    ret.parr = parr;
    if (!parr || !Array.isArray(parr) || parr.length === 0) {
      ret.error = 'parr';
      return ret;
    }
    ret.coords = [];
    for (let groupi in parr) {
      //group
      let group = parr[groupi];
      let pathgroup = 'groupId_' + group.id;
      if (typeof ret.groupbyid[pathgroup] === 'undefined') {
        ret.groupbyid[pathgroup] = {};
      }
      ret.groupbyid[pathgroup].id = group.id;
      ret.groupbyid[pathgroup].name = group.name;
      ret.groupbyid[pathgroup].ownerID = group.ownerID;
      if (group.farms) {
        ret.groupbyid[pathgroup].farmbyid = {};
        ret.groupbyid[pathgroup].coords = [];
        for (let farmi in group.farms) {
          //farm
          let farm = group.farms[farmi];
          let pathfarm = 'farmId_' + farm.id;
          if (typeof ret.farmbyid[pathfarm] === 'undefined') {
            ret.farmbyid[pathfarm] = {};
          }
          ret.farmbyid[pathfarm].id = farm.id;
          ret.farmbyid[pathfarm].farmName = farm.farmName;
          ret.farmbyid[pathfarm].numberOfOrchards = farm.numberOfOrchards;
          if (farm.orchards) {
            ret.farmbyid[pathfarm].orchardbyid = {};
            ret.farmbyid[pathfarm].coords = [];
            for (let orchardi in farm.orchards) {
              //orchard
              let orchard = farm.orchards[orchardi];
              let pathorchard = 'orchardId_' + orchard.fID;
              if (typeof ret.orchardbyid[pathorchard] === 'undefined') {
                let orchardPolygonParse = this.orchardPolygonParse(orchard);
                ret.orchardbyid[pathorchard] = { ...orchard };
                if (orchardPolygonParse.success) {
                  ret.orchardbyid[pathorchard].position =
                    orchardPolygonParse.points;
                  if (ret.orchardbyid[pathorchard].position.length > 0) {
                    let computeCenter = this.computeCenter(
                      ret.orchardbyid[pathorchard].position
                    );
                    if (computeCenter.success) {
                      ret.orchardbyid[pathorchard].center =
                        computeCenter.center;
                      ret.farmbyid[pathfarm].coords.push(
                        ret.orchardbyid[pathorchard].center
                      );
                    }
                  }
                }
              }
              ret.farmbyid[pathfarm].orchardbyid[pathorchard] =
                ret.orchardbyid[pathorchard];
            }
            if (ret.farmbyid[pathfarm].coords.length > 0) {
              let computeCenter = this.computeCenter(
                ret.farmbyid[pathfarm].coords
              );
              if (computeCenter.success) {
                ret.farmbyid[pathfarm].center = computeCenter.center;
                ret.groupbyid[pathgroup].coords.push(
                  ret.farmbyid[pathfarm].center
                );
              }
            }
          }
          ret.groupbyid[pathgroup].farmbyid[pathfarm] = ret.farmbyid[pathfarm];
        }
        if (ret.groupbyid[pathgroup].coords.length > 0) {
          let computeCenter = this.computeCenter(
            ret.groupbyid[pathgroup].coords
          );
          if (computeCenter.success) {
            console.log('ret.coords.push', group);
            ret.groupbyid[pathgroup].center = computeCenter.center;
            ret.coords.push(ret.groupbyid[pathgroup].center);
          }
        }
      }
    }
    let computeCenter = this.computeCenter(ret.coords);
    if (computeCenter.success) {
      ret.center = computeCenter.center;
    }
    ret.success = true;
    return ret;
  };
  orchardPolygonParse = (parr) => {
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
  render() {
    const { messages } = this.props;

    const {
      position,
      zoom,
      farms,
      mapDetails,
      showFarms,
      showOrchards,
      searchbox,
      mapFarmInfoWindow,
    } = this.state;

    return (
      <div className="map-frame">
        <section className="uk-width-expand uk-width-1-1">
          <Map
            zoom={zoom}
            position={position}
            farms={farms}
            mapDetails={mapDetails}
            showFarms={showFarms}
            showOrchards={showOrchards}
            onAction={this.onAction}
            searchbox={searchbox}
            mapFarmInfoWindow={mapFarmInfoWindow}
          />
        </section>
      </div>
    );
  }
}

export default injectIntl(
  geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(MapFrame)
);
