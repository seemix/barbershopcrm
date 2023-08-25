import React from 'react';

import Services from './Services/Services';
import AdditionalServices from './AdditionalServices/AdditionalServices';
import './ServicesWrapper.css';
const ServicesWrapper = () => {
    return (
        <div className={'admin_content'}>
            <div className={'admin_services_wrapper'}>
                <div><Services/></div>
                <div><AdditionalServices/></div>
            </div>
        </div>
    
        
    );
};

export default ServicesWrapper;