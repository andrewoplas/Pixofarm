import React from 'react'
import config from '../../../config'
import { geolocated } from 'react-geolocated'
import PXMap from './components/px-map'
import Map from './map'
import PropTypes from 'prop-types'
import { injectIntl } from "react-intl";
import './style.css'

class PXGoogleMap extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			position: {},
			markers: [],
			polygon: [],
			map_polygons: [],
			polygonComplete: false,
			area: 0,
			drawBy: 'pins',
		}
		this.mapref = null
		this.geocoder = null
	}

	componentDidMount() {
		let defaultPosition = {
			latitude: 0,
			longitude: 0
		}

		if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) {
			defaultPosition.latitude = this.props.coords.latitude
			defaultPosition.longitude = this.props.coords.longitude
		} else {
			defaultPosition.latitude = config.googleMaps.defaultCenter.lat
			defaultPosition.longitude = config.googleMaps.defaultCenter.long
		}

		this.setState({
			position: {
				lat: defaultPosition.latitude,
				lng: defaultPosition.longitude,
			},
		})
	}
	mapInit = (parr) => {
		let ret = { success: false, error: '', resp: {} }
		ret.parr = parr
		if (!parr || !parr.data) {
			ret.error = 'parr'
			return ret
		}

		ret.markers = []
		ret.polygon = []
		if (parr.data) {
			ret.orchardPolygonParse = this.orchardPolygonParse(parr.data)
			if (ret.orchardPolygonParse.success) {
				let key = 0
				ret.markers = ret.orchardPolygonParse.points.map(point => {
					key++
					return {
						key: 'marker_' + key,
						position: point,
					}
				})
				ret.polygon = ret.orchardPolygonParse.points.map(point => {
					return point
				})
				ret.computeCenter = this.computeCenter(ret.orchardPolygonParse.points)
				if (ret.computeCenter.success) {
					this.mapref.fitBounds(ret.computeCenter.bounds)
				}
			}
		}
		this.setState({
			markers: ret.markers,
			polygon: ret.polygon,
		}, () => {
			this.calculatePolygonArea()
		})
		ret.success = true
		return ret
	}
	onAction = (parr) => {
		console.log(parr.type, parr.payload)
		switch (parr.type) {
			case 'onClick':
				this.onMap_onClick(parr.payload)
				break;
			case 'onPolygonComplete':
				this.onMap_onPolygonComplete(parr.payload)
				break;
			case 'onMapMounted':
				this.onMap_onMapMounted(parr.payload)
				break;
			default:
				break;
		}
	}
	onMap_onMapMounted = (parr) => {
		if (!parr || !parr.map) return
		console.log('onMap_onMapMounted', parr, this.props, this.state)
		this.mapref = parr.map
		this.geocoder = new window.google.maps.Geocoder
		if (this.props.newOrchardData && this.mapref) {
			console.log('mapInit...')
			let mapInit = this.mapInit({ data: this.props.newOrchardData })
			console.log('mapInit', mapInit)
		}

	}
	onMap_onClick = (event) => {
		let markers = [...this.state.markers]
		let polygon = [...this.state.polygon]

		polygon.push({
			lat: event.latLng.lat(),
			lng: event.latLng.lng(),
		})

		markers.push({
			position: {
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
			},
			defaultAnimation: 2,
			key: 'marker_' + (markers.length + 1),
		})

		

		this.setState({
			markers,
			polygon,
		}, () => {
			this.parentUpdate(polygon)
			this.calculatePolygonArea()
		})
	}
	onMap_onPolygonComplete = (objpolygon) => {
		if (!objpolygon) return
		let markers = [...this.state.markers]
		let polygon = [...this.state.polygon]
		let keyid = 0;
		objpolygon.getPath().i.map((point) => {
			console.log(point.lat(), point.lng())
			polygon.push({
				lat: point.lat(),
				lng: point.lng(),
			})
			markers.push({
				position: {
					lat: point.lat(),
					lng: point.lng(),
				},
				defaultAnimation: 2,
				key: 'point_' + keyid,
			})
			keyid++
		})
		objpolygon.setMap(null)

		
		this.setState({
			markers,
			polygon,
			polygonComplete: true,
		}, () => {
			this.parentUpdate(polygon)
			this.calculatePolygonArea()
		})
	}
	orchardPolygonParse = (parr) => {
		let ret = { success: false, points: [], error: '' };
		ret.parr = parr
		if (!parr || !parr.gpsLatitude || typeof (parr.gpsLatitude) !== 'string' || !parr.gpsLongitude || typeof (parr.gpsLongitude) !== 'string') {
			ret.error = 'parr'
			return ret
		}
		ret.gpsLatitude = parr.gpsLatitude.split(',').map(item => { return parseFloat(item) })
		ret.gpsLongitude = parr.gpsLongitude.split(',').map(item => { return parseFloat(item) })
		if (ret.gpsLatitude.length <= 2) {
			ret.error = 'polygon points count'
			return ret
		}
		if (ret.gpsLatitude.length !== ret.gpsLongitude.length) {
			ret.error = 'polygon points count mismach'
			return ret
		}
		for (let i in ret.gpsLatitude) {
			ret.points.push({
				lat: ret.gpsLatitude[i],
				lng: ret.gpsLongitude[i],
			})
		}
		ret.success = true
		return ret
	}
	geocodeUpdate = (parr) => {
		let ret = { success: false, error: '', resp: {} }
		ret.parr = parr
		if (!parr || !parr.position || !parr.position.lat || !parr.position.lng) {
			ret.error = 'parr'
			return ret
		}
		this.geocoder.geocode({ 'location': parr.position }, (results, status) => {
			if (status === 'OK') {
				if (results[0]) {
					console.log(results[0].formatted_address)
					this.props.onAction({
						type: 'setState',
						payload: {
							location: results[0].formatted_address,
						}
					})
				} else {
					window.alert('No results found');
				}
			} else {
				window.alert('Geocoder failed due to: ' + status);
			}
		});
		ret.success = true
		return ret
	}
	computeCenter = (coords) => {
		let ret = { success: false, center: null };
		ret.parr = coords
		ret.bounds = new window.google.maps.LatLngBounds();
		for (var i = 0; i < coords.length; i++) {
			ret.bounds.extend(new window.google.maps.LatLng(coords[i].lat, coords[i].lng));
		}
		ret.getCenter = ret.bounds.getCenter();
		ret.center = {
			lat: ret.getCenter.lat(),
			lng: ret.getCenter.lng(),
		}
		ret.success = true
		return ret
	}
	parentUpdate = (polygon) => {
		if (polygon && polygon.length) {
			const gpsLatitude = Object.values(polygon).map((point) => {
				return point.lat
			})
			const gpsLongitude = Object.values(polygon).map((point) => {
				return point.lng
			})
			const gmapPolygon = new window.google.maps.Polygon({
				paths: polygon,
			});
			var calculatedSize = window.google.maps.geometry.spherical.computeArea(gmapPolygon.getPath());
			this.props.onAction({
				type: 'setState',
				payload: {
					gpsLatitude: gpsLatitude.join(','),
					gpsLongitude: gpsLongitude.join(','),
					calculatedSize: parseInt(calculatedSize),
					orchardSize: parseInt(calculatedSize),
				}
			})
			let computeCenter = this.computeCenter(polygon)
			if (computeCenter.success) {
				// this.mapref.fitBounds(ret.computeCenter.bounds)
				this.geocodeUpdate({ position: computeCenter.center })
			}
		}
	}
	searchLocationOnMap = (position) => {
		this.setState({
			position
		})
	}
	calculatePolygonArea = () => {
		const {
			polygon,
		} = this.state

		if (polygon && polygon.length) {
			const gmapPolygon = new window.google.maps.Polygon({
				paths: polygon,
			});
			var area = window.google.maps.geometry.spherical.computeArea(gmapPolygon.getPath());

			this.setState({
				area,
			})
		}
	}
	onMarkerRightClick = (event) => {
		const {
			markers,
			polygon,
		} = this.state

		const markerIndex = markers.findIndex((marker) => marker.key === event.key)

		markers.splice(markerIndex, 1)
		polygon.splice(markerIndex, 1)

		this.calculatePolygonArea()

		this.setState({
			markers,
			polygon,
		})
	}
	resetGoogleMapPolygon = () => {
		this.setState({
			markers: [],
			polygon: [],
			area: 0,
		})
	}
	undoDrawPolygon = () => {
		let markers = [...this.state.markers]
		let polygon = [...this.state.polygon]

		markers.splice(markers.length - 1, 1)
		polygon.splice(polygon.length - 1, 1)

		

		this.setState({
			markers,
			polygon,
		}, () => {
			this.parentUpdate(polygon)
			this.calculatePolygonArea()
		})

	}
	drawPolygonByPins = () => {
		this.setState({
			drawBy: 'pins'
		})
	}
	drawPolygonByLines = () => {
		let polygon = [...this.state.polygon]
		if (polygon.length > 0) return
		this.setState({
			drawBy: 'polygon'
		})
	}
	onNext = () => {
		let polygon = this.state.polygon
		if (polygon.length < 3) {
			alert('draw polygon first')
			return
		}
		this.props.onAction({
			type: 'submitStep',
			payload: { step: 2 }
		})
	}
	render() {
		const {
			intl: {
				messages
			},
		} = this.props

		const {
			position,
			area,
			drawBy,
		} = this.state
		let markers = [...this.state.markers]
		let polygon = [...this.state.polygon]
		return (
			<div className='draw-map'>
				<section className="uk-width-expand uk-width-1-1 map-actions">
					<span className='area'>Your selected area : {Math.round(area)}sqm</span>
					<div className='actions uk-flex'>
						<div className='action'><span uk-icon='icon: refresh' className='reset' onClick={() => this.resetGoogleMapPolygon()}></span></div>
						<div className='action'><span uk-icon='icon: location' className={drawBy === 'pins' ? 'selected' : ''} onClick={() => this.drawPolygonByPins()}></span></div>
						<div className='action'><span uk-icon='icon: social' id='polygon' className={drawBy === 'polygon' ? 'selected' : ''} onClick={() => this.drawPolygonByLines()}></span></div>
						<div className='action'><span uk-icon='icon: history' className='undo' onClick={() => this.undoDrawPolygon()}></span></div>
					</div>
				</section>

				<section className="uk-width-expand uk-width-1-1" id='map' >
					<Map
						zoom={18}
						position={position}
						markers={markers}
						polygonpath={polygon}
						drawBy={this.state.drawBy}
						onAction={this.onAction}
					/>
				</section>
				<section className="uk-width-1-1 uk-flex uk-flex-center">
					<div className='button-holder uk-width-1-4@s uk-width-1-1 uk-text-center'>
						<div
							className='btns'
							style={{ background: polygon.length < 3 ? 'gray' : '' }}
							onClick={this.onNext}
						>
							{messages.add_orchard.next}
						</div>
						<div
							className='link'
							onClick={() => this.props.onAction({
								type: 'submitStep',
								payload: { step: 0 }
							})}
						>
							{messages.add_orchard.cancel}
						</div>
					</div>
				</section>
			</div>
		)
	}
}

PXGoogleMap.propTypes = {
	onSelect: PropTypes.func
}

export default injectIntl(geolocated({
	positionOptions: {
		enableHighAccuracy: false,
	},
	userDecisionTimeout: 5000,
})(PXGoogleMap));
