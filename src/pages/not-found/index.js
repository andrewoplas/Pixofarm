import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

import {getLocalizedPath} from "../../utils/funcs";

const NotFound = ({ intl }) => (
  <section className="onboarding forofor uk-flex uk-flex-row">
    <section className="uk-width-1-1 content-area not-found uk-flex uk-flex-column uk-flex-center">
      <div className="uk-flex uk-flex-row uk-flex-center uk-flex-middle uk-flex-wrap">
        <div className="uk-width-1-1">
          <div className="uk-width-1-6@xl uk-width-1-5@l uk-width-1-4@m uk-width-1-3@s uk-width-1-2"></div>
          <p className="not-found-big">Not found</p>
          <div className="not-found-medium">            
            <p className="back-home"><a href={getLocalizedPath('/', intl.locale)}>Home</a></p>
          </div>
        </div>
      </div>
    </section>
  </section>
)

NotFound.propTypes = {
  intl: PropTypes.object,
}

export default injectIntl(NotFound)
