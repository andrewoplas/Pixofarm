import React, { useState } from "react"
import { compose } from "recompose"
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	Polygon,
} from 'react-google-maps'
import PXGoogleMapSearchInput from './search-input'
import config from '../../../../config'
import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager'

const PXMap = compose(
	withScriptjs,
	withGoogleMap
)((props) => {
	const {
		markers,
		drawBy,
	} = props
	const [polygonEdit, setpolygonEdit] = useState(false);
	let polygonEdit_current = (drawBy === 'polygon' && markers.length === 0)
	if (polygonEdit_current !== polygonEdit) { setpolygonEdit(polygonEdit_current) }
	console.log('polygonEdit', polygonEdit)
	return (
		<GoogleMap
			mapTypeId='satellite'
			defaultZoom={config.googleMaps.defaultZoom}
			center={{ lat: props.mapDefaultPosition.latitude, lng: props.mapDefaultPosition.longitude }}
			onClick={props.clickMap}
		>

			<PXGoogleMapSearchInput
				position={{
					latitude: props.mapDefaultPosition.latitude,
					longitude: props.mapDefaultPosition.longitude
				}}
				onSearch={props.searchLocation}
			/>

			{markers && markers.map(marker => {
				return (
					<Marker
						{...marker}
						onRightClick={() => props.rightClickMarker(marker)}
					/>
				)
			})}

			<Polygon
				path={props.polygon}
				key={new Date().getTime()}
				editable
				draggable
				options={{
					fillColor: "#000",
					fillOpacity: 0.4,
					strokeColor: "#000",
					strokeOpacity: 1,
					strokeWeight: 1
				}}
			/>

			{polygonEdit && <DrawingManager
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
						zIndex: 1
					},
				}}
				onPolygonComplete={props.polygonComplete}
			/>}
		</GoogleMap>
	)
})

export default PXMap