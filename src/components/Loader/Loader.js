import React from 'react'
import PropTypes from 'prop-types'

import './Loader.css'

const Loader = (props) => {
    const {width, height} = props
    return <div className="Loading" style={{width, height}}/>
}

Loader.defaultProps = {
    width: '28px',
    height: '28px'
}

Loader.propTypes = {
    height : PropTypes.string,
    width: PropTypes.string
}

export default Loader