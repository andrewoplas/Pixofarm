import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import './style.css'

class PXModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.element,
    onRequestClose: PropTypes.func,
    size: PropTypes.string,
    shouldCloseOnEsc: PropTypes.bool,
    shouldCloseOnOverlayClick: PropTypes.bool,
  }

  static defaultProps = {
    isOpen: false,
    shouldCloseOnEsc: true,
    shouldCloseOnOverlayClick: false,
    children: null,
  }

  render() {
    const {
      children,
      isOpen,
      onRequestClose,
      size,
      shouldCloseOnEsc,
      shouldCloseOnOverlayClick,
    } = this.props

    return (
      <Modal
        className={`modal-trans modal-${size}`}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        shouldCloseOnEsc={shouldCloseOnEsc}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        closeTimeoutMS={200}
      >
        <div className={`modal-dialog modal-${size}`}>
          <button className="uk-modal-close" type="button" uk-close></button>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </Modal>
    )
  }
}

export default PXModal
