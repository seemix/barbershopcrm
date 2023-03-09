import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const MainAdmin = () => {
    const {user} = useAppSelector(state => state.authStore);
    return (
        <div>
            <h2>MAIN admin</h2>
            {user.role === '2996' && <h3>UUUUUSSSEER</h3>}
        </div>
    );
};

export default MainAdmin;