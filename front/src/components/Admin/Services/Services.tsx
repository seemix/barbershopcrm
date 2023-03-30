import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllServices, servicesReorder } from '../../../store/services';
import SingleService from './SingleService';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Reorder } from 'framer-motion';

const Services = () => {
    const dispatch = useAppDispatch();
    const { allServices } = useAppSelector(state => state.serviceStore);
    useEffect(() => {
        dispatch(getAllServices());
    }, [dispatch]);

    console.log(allServices);
    const reOrder = (newOrder: any) => {

        dispatch(servicesReorder(newOrder));
    };
    return (
        <div>
            <Reorder.Group values={allServices} onReorder={(newOrder) => reOrder(newOrder)} as={'ol'}>
                {allServices.map(item => (
                    <Reorder.Item key={item._id} value={item}>
                        <SingleService _id={item._id} name={item.name} description={item.description}
                                       order={item.order}/>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};

export default Services;