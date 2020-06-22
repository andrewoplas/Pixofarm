import React from "react"
import { compose, withProps, withHandlers } from "recompose"
import markerfarmbig from '../../assets/images/farm/markerfarmbig.svg'
import markerfarmsmall from '../../assets/images/farm/markerfarmsmall.svg'

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polygon,
    InfoWindow,
    OverlayView,
    InfoBox,
} from 'react-google-maps'


class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            farmHover: false,
            farmInfoWindow: false,
            orchardHover: false,
        }
    }
    markerIconGet = (parr) => {
        //parr = {orchardscount:integer,size:'normal'/'big}
        let sizenormal = 55
        let sizebig = 65
        let iniparr = { orchardscount: 0, size: sizenormal }
        if (parr) {
            if (parr.size === 'normal') {
                iniparr.size = sizenormal
            }
            if (parr.size === 'big') {
                iniparr.size = sizebig
            }
            if (parr.orchardscount) {
                iniparr.orchardscount = parr.orchardscount
            }
        }
        let markericon = iniparr.orchardscount > 1 ? markerfarmbig : markerfarmsmall;
        return {
            url: markericon,
            scaledSize: new window.google.maps.Size(iniparr.size, iniparr.size),
        }
    }
    onChangeInput = (e) => {
        if (this.props.onAction) {
            this.props.onAction({
                type: 'inputchange',
                payload: {
                    name: e.target.name,
                    value: e.target.value,
                }
            })
        }
    }
    render() {
        const {
            searchbox,
            mapFarmInfoWindow,
            zoom,
        } = this.props
        // console.log('map render zoom', zoom)
        return (
            <GoogleMap
                mapTypeId={window.google.maps.MapTypeId.HYBRID}
                defaultZoom={this.props.zoom}
                center={this.props.position}
                zoom={zoom}
                ref={this.props.onMapMounted}
                onZoomChanged={this.props.onZoomChanged}
                onCenterChanged={this.props.onCenterChanged}
            >
                <div className='search uk-flex big-map-search'>
                    <a className='over-map uk-flex uk-flex-center uk-flex-middle' type='button' ><span uk-icon="search"></span></a>
                    <div uk-dropdown='mode: hover; pos: left-center; animation: uk-animation-slide-left-small; delay-hide: 10000' className='uk-dropdown'>
                        <a className='over-map uk-flex uk-flex-right uk-flex-middle' type='button'><span uk-icon="triangle-right"></span></a>
                        <div uk-dropdown='mode: click; pos: left-center; animation: uk-animation-slide-left' className='uk-dropdown'>
                            <input
                                type="text"
                                name="searchbox"
                                className="form-control"
                                value={searchbox || ''}
                                onChange={(e) => this.onChangeInput(e)}
                            />
                        </div>
                    </div>
                </div>
                {
                    this.props.showFarms && this.props.mapDetails.farmMarkers && Object.values(this.props.mapDetails.farmMarkers).map(farm => {
                        let InfoWindowContent = this.props.mapDetails.farmInfoWindows['farmId_' + farm.farm.id].content
                        let showContent = ((farm.farm.id === this.state.farmHover || farm.farm.id === mapFarmInfoWindow) && this.props.mapDetails.farmInfoWindows['farmId_' + farm.farm.id])
                        // console.log('Map render farm marker', showContent)
                        return (
                            <Marker
                                {...farm.marker}
                                icon={this.markerIconGet({ orchardscount: farm.farm.numberOfOrchards, size: farm.farm.id === this.state.farmHover ? 'big' : 'normal' })}
                                onMouseOver={() => {
                                    this.setState({
                                        farmHover: farm.farm.id,
                                        // farmInfoWindow: farm.farm.id
                                    })
                                    this.props.onAction({
                                        type: 'inputchange',
                                        payload: {
                                            name: 'mapFarmInfoWindow',
                                            value: farm.farm.id,
                                        }
                                    })
                                }}
                                onMouseOut={() => this.setState({ farmHover: false })}
                            >
                                {showContent && (
                                    <InfoWindow
                                        options={{
                                            pane: 'mapPane',
                                            pixelOffset: new window.google.maps.Size(0, 0),
                                            boxStyle: {
                                                width: '300px'
                                            },
                                            closeBoxURL: ``,
                                            enableEventPropagation: true
                                        }}
                                        onCloseClick={() => {
                                            // this.setState({ farmInfoWindow: false })
                                            this.props.onAction({
                                                type: 'inputchange',
                                                payload: {
                                                    name: 'mapFarmInfoWindow',
                                                    value: false,
                                                }
                                            })
                                        }}
                                    >
                                        <InfoWindowContent />
                                    </InfoWindow>
                                )}
                            </Marker>
                        )
                    })
                }

                {
                    this.props.showOrchards && this.props.mapDetails.orchardPolygons && Object.values(this.props.mapDetails.orchardPolygons).map(orchard =>
                        // console.log('Map render farm polygon', farm)
                        <Polygon
                            {...orchard.polygon}
                            options={{
                                fillColor: "white",
                                fillOpacity: 0.4,
                                strokeColor: "#000",
                                strokeOpacity: 1,
                                strokeWeight: 1
                            }}
                        />
                    )
                }

                {
                    this.props.showOrchards && this.props.mapDetails.orchardMarkers && Object.values(this.props.mapDetails.orchardMarkers).map(orchard =>
                        <Marker
                            {...orchard.marker}
                            icon={this.markerIconGet({ orchardscount: 1, size: 'normal' })}
                            onMouseOver={() => { this.setState({ orchardHover: orchard.orchard.fID }) }}
                            onMouseOut={() => { this.setState({ orchardHover: false }) }}
                        />
                    )
                }

                {
                    this.props.showOrchards && this.props.mapDetails.orchardMarkerLabels && Object.values(this.props.mapDetails.orchardMarkerLabels).map(orchard => {
                        // console.log('orchardMarkerLabels',orchard)
                        return <OverlayView
                            {...orchard.overlayView}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            getPixelPositionOffset={(width, height) => ({ x: 0, y: 0 })}
                        >
                            <div
                                style={{
                                    background: `transparent`,
                                    padding: `7px 12px`,
                                    fontSize: '11px',
                                    color: `white`,
                                    borderRadius: '4px',
                                }}
                            >
                                {orchard.content}
                            </div>
                        </OverlayView>

                    })
                }

                {
                    this.props.showOrchards && this.props.mapDetails.orchardMarkerInfos && Object.values(this.props.mapDetails.orchardMarkerInfos).map(orchard => {
                        return <OverlayView
                            {...orchard.overlayView}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            getPixelPositionOffset={(width, height) => ({ x: 30, y: 30 })}
                        >
                            <div
                                style={{
                                    display: (this.state.orchardHover !== orchard.orchard.fID) ? 'none' : '',
                                    background: `white`,
                                    padding: `7px 12px`,
                                    fontSize: '11px',
                                    color: `black`,
                                    borderRadius: '4px',
                                }}
                            >
                                <orchard.content />
                            </div>
                        </OverlayView>
                    })
                }
            </GoogleMap >
        )
    }
}

export default compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC6Ymhf4-41lJD3dAWE3MVr8GI6BodCLjQ&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100vh` }} />,
    }),
    withHandlers(() => {
        const refs = {
            map: undefined,
        }
        return {
            onMapMounted: (props) => ref => {
                refs.map = ref
                props.onAction({ type: 'onMapMounted', payload: { map: refs.map } })
            },
            onZoomChanged: (props) => () => {
                props.onAction({ type: 'onZoomChanged', payload: { zoom: refs.map.getZoom() } })
            },

            onCenterChanged: (props) => () => {
                props.onAction({ type: 'onCenterChanged', payload: { center: refs.map.getCenter() } })
            }
        }
    }),
    withScriptjs,
    withGoogleMap
)(Map);