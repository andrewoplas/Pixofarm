import React from 'react'
import { injectIntl } from 'react-intl'
import { getParamsAsObject, getLocalizedPath, urlserialize } from '../../utils/funcs'

import ComponentFilter from './componentFilter'
import Section1 from './section1'
import Section2 from './section2'
import Section3 from './section3'
import Section4 from './section4'

class ComponentCorporateDetails extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeGroup: 0,
            orchardbyid: {},
            farmbyid: {},
            orchardbyid_filtered: {},
            orchardbyid_filtered_size: {},
            filtertypebyid: {},
            filtervarietybyid: {},
            filtertype: '',
            filtervariety: 0,
            filtervariety_text: '',
        }
    }
    componentDidMount() {
        let ret = {}

        ret.getParamsAsObject = getParamsAsObject(window.location.search)
        if (typeof (ret.getParamsAsObject.groupId) !== 'undefined' && parseInt(ret.getParamsAsObject.groupId) > 0) {
            ret.groupId = parseInt(ret.getParamsAsObject.groupId)
        }

        const groupsFarms = [...this.props.groupsFarms]
        ret.dataParse = this.dataParse({
            groupsFarms: groupsFarms,
            activeGroup: ret.groupId,
            fruitVarieties: this.props.fruitVarieties,
        })
        if (!ret.dataParse.success) {
            ret.error = 'dataParse'
            return ret
        }

        let orchardbyid = ret.dataParse.dataGroupParse.orchardbyid
        let farmbyid = ret.dataParse.dataGroupParse.farmbyid
        let filtertypebyid = ret.dataParse.dataFilterParse.filtertypebyid
        let filtervarietybyid = ret.dataParse.dataFilterParse.filtervarietybyid
        if (!Object.values(filtertypebyid).length){
            ret.error = 'empty'
            return ret
        }
        ret.filtertype = Object.values(filtertypebyid)[0].value
        ret.filtervariety = Object.values(filtervarietybyid)[0].value

        // console.log('componentDidMount', ret)
        this.setState({
            activeGroup: ret.groupId,
            orchardbyid: orchardbyid,
            farmbyid: farmbyid,
            filtertypebyid: filtertypebyid,
            filtervarietybyid: filtervarietybyid,
            filtertype: ret.filtertype,
            filtervariety: ret.filtervariety,
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState && (prevState.filtervariety !== this.state.filtervariety)) {
            // console.log('ComponentCorporateDetails componentDidUpdate', this.state)
            let dataFilterApply = this.dataFilterApply({
                filtervariety: this.state.filtervariety,
                orchardbyid: this.state.orchardbyid,
            })
            if (dataFilterApply.success) {
                this.setState({
                    orchardbyid_filtered: dataFilterApply.orchardbyid,
                    orchardbyid_filtered_size: dataFilterApply.size,
                    filtervariety_text: dataFilterApply.orchardFruitEncode.variety,
                })
            }
        }
    }
    handleAction = (parr) => {
        switch (parr.type) {
            case 'setState':
                this.setState({
                    ...parr.payload
                })
                break;
            default:
        }
    }
    dataFilterApply = (parr) => {
        let ret = { success: false, error: '' }
        ret.parr = parr
        if (!parr || !parr.filtervariety || !parr.orchardbyid) {
            ret.error = 'parr'
            return ret
        }
        ret.size = {
            averageDiameter: [],
            changes: [],
            forecastProduction: [],
            growthRate: [],
            predictedDiameter: [],
            predictedFruitsSizes: [],
            predictedFruitsWeights: [],
            calculatedSize: [],
            lastMeasurements: [],
        }
        ret.orchardbyid = {}


        ret.orchardFruitEncode = this.orchardFruitEncode({ variety: parr.filtervariety })
        if (!ret.orchardFruitEncode.success) {
            ret.error = 'orchardFruitEncode'
            return ret
        }
        let orchardbyid = Object.values(parr.orchardbyid)
        for (let orchardi in orchardbyid) {
            let orchard = orchardbyid[orchardi]
            if (orchard.fruit.variety === ret.orchardFruitEncode.variety) {
                // console.log('orchard', orchard)
                ret.orchardbyid['id_' + orchard.fID] = { ...orchard }
                if (orchard.lastBatch) {
                    if (!isNaN(parseFloat(orchard.lastBatch.predictedDiameter))) ret.size.predictedDiameter.push(parseFloat(orchard.lastBatch.predictedDiameter))
                    if (!isNaN(parseFloat(orchard.lastBatch.forecastProduction)) !== parseFloat(0)) ret.size.forecastProduction.push(parseFloat(orchard.lastBatch.forecastProduction))
                    if (!isNaN(parseFloat(orchard.lastBatch.averageDiameter)) !== parseFloat(0)) ret.size.averageDiameter.push(parseFloat(orchard.lastBatch.averageDiameter))
                    if (!isNaN(parseFloat(orchard.lastBatch.growthRate)) !== parseFloat(0)) ret.size.growthRate.push(parseFloat(orchard.lastBatch.growthRate))
                    if (typeof orchard.lastBatch.lastMeasurements === 'string' && orchard.lastBatch.lastMeasurements.length) ret.size.lastMeasurements.push(orchard.lastBatch.lastMeasurements)
                }
                if (!isNaN(parseInt(orchard.calculatedSize)) > 0) ret.size.calculatedSize.push(parseInt(orchard.calculatedSize))
            }

        }
        // console.log('dataFilterApply', ret)
        ret.success = true
        return ret
    }
    orchardFruitEncode = (parr) => {
        //id to string
        let ret = { success: false, error: '' }
        ret.parr = parr
        if (!parr || !parr.variety) {
            ret.error = 'parr'
            return ret
        }
        ret.found = false
        for (let typei in this.props.fruitVarieties) {
            let type = this.props.fruitVarieties[typei]
            for (let varietyi in type) {
                let variety = type[varietyi]
                if (parr.variety === variety) {
                    ret.variety = varietyi
                    ret.found = true
                    break
                }
            }
            if (ret.found) break
        }
        if (ret.found) {
            ret.success = true
        }
        return ret
    }
    dataParse = (parr) => {
        let ret = { success: false, error: '' }
        ret.parr = parr
        if (!parr || !parr.activeGroup || !parr.groupsFarms || !parr.fruitVarieties) {
            ret.error = 'parr'
            return ret
        }

        ret.dataGroupParse = this.dataGroupParse({
            groupsFarms: parr.groupsFarms,
            activeGroup: parr.activeGroup
        })
        if (!ret.dataGroupParse.success) {
            ret.error = 'dataGroupParse'
            return ret
        }

        ret.dataFilterParse = this.dataFilterParse({
            fruitVarieties: parr.fruitVarieties,
            orchardbyid: ret.dataGroupParse.orchardbyid
        })
        if (!ret.dataFilterParse.success) {
            ret.error = 'dataFilterParse'
            return ret
        }

        ret.success = true
        return ret
    }
    dataFilterParse = (parr) => {
        let ret = { success: false, error: '', filtervarietybyid: {}, filtertypebyid: {} }
        ret.parr = parr
        if (!parr || !parr.orchardbyid || !parr.fruitVarieties) {
            ret.error = 'parr'
            return ret
        }

        for (let typei in parr.fruitVarieties) {
            let type = parr.fruitVarieties[typei]
            for (let varietyi in type) {
                let variety = type[varietyi]
                for (let orchardi in parr.orchardbyid) {
                    let orchard = parr.orchardbyid[orchardi]
                    if (orchard.fruit.type === typei) {
                        ret.filtertypebyid['id_' + typei] = {
                            label: typei,
                            value: typei,
                        }
                    }
                    if (orchard.fruit.variety === varietyi) {
                        ret.filtervarietybyid['id_' + variety] = {
                            label: varietyi,
                            value: variety,
                            parent: typei,
                        }
                    }
                }
            }
        }

        ret.success = true
        return ret
    }
    dataGroupParse = (parr) => {
        let ret = { success: false, error: '', farmbyid: {}, orchardbyid: {}, groupbyid: {} }
        ret.parr = parr
        if (!parr || !parr.activeGroup || !parr.groupsFarms || !Array.isArray(parr.groupsFarms) || parr.groupsFarms.length === 0) {
            ret.error = 'parr'
            return ret
        }
        ret.coords = []
        for (let groupi in parr.groupsFarms) {
            //group
            let group = parr.groupsFarms[groupi]
            if (group.id !== parr.activeGroup) continue
            let pathgroup = 'id_' + group.id
            if (typeof (ret.groupbyid[pathgroup]) === 'undefined') {
                ret.groupbyid[pathgroup] = {}
            }
            ret.groupbyid[pathgroup].id = group.id
            ret.groupbyid[pathgroup].name = group.name
            ret.groupbyid[pathgroup].ownerID = group.ownerID
            if (group.farms) {
                ret.groupbyid[pathgroup].farmbyid = {}
                ret.groupbyid[pathgroup].coords = []
                for (let farmi in group.farms) {
                    //farm
                    let farm = group.farms[farmi]
                    let pathfarm = 'id_' + farm.id
                    if (typeof (ret.farmbyid[pathfarm]) === 'undefined') {
                        ret.farmbyid[pathfarm] = {}
                    }
                    ret.farmbyid[pathfarm].id = farm.id
                    ret.farmbyid[pathfarm].farmName = farm.farmName
                    ret.farmbyid[pathfarm].numberOfOrchards = farm.numberOfOrchards
                    if (farm.orchards) {
                        ret.farmbyid[pathfarm].orchardbyid = {}
                        ret.farmbyid[pathfarm].coords = []
                        for (let orchardi in farm.orchards) {
                            //orchard
                            let orchard = farm.orchards[orchardi]
                            let pathorchard = 'id_' + orchard.fID
                            if (typeof (ret.orchardbyid[pathorchard]) === 'undefined') {
                                ret.orchardbyid[pathorchard] = { ...orchard }
                            }
                            ret.farmbyid[pathfarm].orchardbyid[pathorchard] = ret.orchardbyid[pathorchard]
                        }
                    }
                    ret.groupbyid[pathgroup].farmbyid[pathfarm] = ret.farmbyid[pathfarm]
                }
            }
        }

        ret.success = true
        return ret
    }
    render() {
        const {
            intl: {
                messages
            },
            fruitVarieties
        } = this.props
        const groupsFarms = [...this.props.groupsFarms]
        const {
            activeGroup,
            farmbyid,
            orchardbyid_filtered,
            orchardbyid_filtered_size,
            filtertypebyid,
            filtervarietybyid,
            filtertype,
            filtervariety,
            filtervariety_text,
        } = this.state

        if (!(activeGroup > 0)) return 'Choose a group with orchards'
        return (
            <div className='corporate-holder'>
                <div className='dark-bg'>
                    <ComponentFilter
                        filtertypebyid={filtertypebyid}
                        filtervarietybyid={filtervarietybyid}
                        filtertype={filtertype}
                        filtervariety={filtervariety}
                        onAction={this.handleAction}
                    />
                    <Section1
                        orchardbyid_filtered={orchardbyid_filtered}
                        filtertype={filtertype}
                        filtervariety_text={filtervariety_text}
                        orchardbyid_filtered_size={orchardbyid_filtered_size}
                    />
                    <Section2 />
                </div>
                <Section3
                    orchardbyid_filtered={orchardbyid_filtered}
                    orchardbyid_filtered_size={orchardbyid_filtered_size}
                />
                <Section4
                    orchardbyid_filtered={orchardbyid_filtered}
                    farmbyid={farmbyid}
                />
            </div>
        )
    }
}

export default injectIntl(ComponentCorporateDetails)