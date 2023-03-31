import React from 'react';
import Services from './Services';
import AdditionalServices from './AdditionalServices/AdditionalServices';

const ServicesWrapper = () => {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-evenly'}}>
            <div><Services/></div>
            <div><AdditionalServices/></div>
        </div>
    );
};

export default ServicesWrapper;