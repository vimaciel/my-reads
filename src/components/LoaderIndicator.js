import React from 'react';
import PropTypes from 'prop-types';

const LoaderIndicator = prop => (
    <svg className={prop.className} style={{ display: prop.show ? 'block' : 'none' }}>
        <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
            <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.1" />
        </circle>
        <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
            <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.2" />
        </circle>
        <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
            <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.3" />
        </circle>
    </svg>
)

LoaderIndicator.defaultProps = {
    className: 'loader-indicator'
}

LoaderIndicator.propTypes = {
    show: PropTypes.bool.isRequired,
    className: PropTypes.string
}

export default LoaderIndicator;