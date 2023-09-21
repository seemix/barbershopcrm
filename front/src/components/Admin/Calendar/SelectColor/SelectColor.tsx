import React from 'react';

import './SelectColor.css';
import SingleColor from '../SingleColor/SingleColor';
import {orderColors} from '../../../../constants/orderColors';
const SelectColor = () => {

    return (
        <div style={{ display: 'flex', gap: '10px', marginTop:'20px' }}>
            {
                 orderColors.map(item => <SingleColor key={item} currentColor={item} />)
            }
        </div>
    );
};
export default SelectColor;