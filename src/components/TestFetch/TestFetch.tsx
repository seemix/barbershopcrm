import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { getAllBarbers } from '../../store/barbers';

const TestFetch: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllBarbers());
    }, [dispatch]);
    return (
        <div>
            <h1>111</h1>
            {/*{barbers.map()}*/}
        </div>
    );
};

export default TestFetch;