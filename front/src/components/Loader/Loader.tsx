import React from 'react';
import logo from './logo.webp';
import './Loader.css';

const Loader = () => {
    return (
        <div style={{
            backgroundColor: 'gray',
            width: '100%',
            height: '100vh',
            boxSizing: 'border-box',
            position: 'relative'
        }}>

            <div className={'loader_container'}>
                <div className={'loader'}>
                    <img src={logo} alt="logo"/>
                </div>
            </div>
        </div>
    );
};

export default Loader;