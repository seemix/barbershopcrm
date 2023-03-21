import React from 'react';

import './SelectColor.css';
import SingleColor from '../SingleColor/SingleColor';

const SelectColor = () => {
    const colors = ['#9e8a78', '#50b500', '#900000', '#1976d2'];
    return (
        <div style={{ display: 'flex', gap: '10px', marginTop:'20px' }}>
            {
                  colors.map(item => <SingleColor currentColor={item} />)
            }
        </div>
    );
};
export default SelectColor;