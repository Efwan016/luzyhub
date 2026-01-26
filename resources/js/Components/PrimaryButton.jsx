import React from 'react';
import PropTypes from 'prop-types';

export default function PrimaryButton({ type = 'submit', className = '', variant = 'primary', processing, children }) {
    const variants = {
        'primary': 'btn-primary',
        'warning': 'btn-warning',
        'danger': 'btn-danger',
        'light-outline': 'btn-light-outline',
        'white-outline': 'btn-white-outline',
        'google-light': 'btn-google-light',
        'wallet-web3': 'btn-wallet-web3',
    };
    
    return (
        <button
            type={type}
            className={`rounded-md py-[13px] text-center
                ${
                processing && "opacity-30 cursor-not-allowed" } 
                ${variants[variant]} ${className}`}
            disabled={processing}
        >
            {children}
        </button>
    );
}

PrimaryButton.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
    variant: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "light-outline",
        "white-outline",
        "google-light",
        "wallet-web3",
    ]),
    processing: PropTypes.bool,
    children: PropTypes.node,
}
