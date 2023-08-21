import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { getAllServices } from '../../../../store/services';
import { getAllAdditionals } from '../../../../store/additional';
import { getAdditionalsByBarber } from '../../../../store/barberAdditional';
import { getServicesByBarber } from '../../../../store/barberService';
import SingleServicePrice from '../SingleServicePrice';
import SingleAdditionalPrice from '../SingleAdditionalPrice';
import { Avatar, Dialog } from '@mui/material';
import AdditionalPriceForm from '../AdditionalPriceForm/AdditionalPriceForm';
import { IAdd } from '../../../../interfaces/additional.model';
import { getBarberById } from '../../../../store/barbers';
import UnactiveAdditional from '../UnactiveAdditional/UnactiveAdditional';
import './SingleBarberPrice.css';
import { IAllService } from '../../../../interfaces/service.model';
import UnactiveService from '../UnactiveService/UnactiveService';
import ServicePriceForm from '../ServicePriceForm/ServicePriceForm';

const SingleBarberPrice = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllServices());
        dispatch(getAllAdditionals());
    }, [dispatch]);

    const { barberId } = useParams();

    useEffect(() => {
        dispatch(getServicesByBarber(String(barberId)));
        dispatch(getAdditionalsByBarber(String(barberId)));
        dispatch(getBarberById(String(barberId)));
    }, [barberId, dispatch]);

    const { allServices } = useAppSelector(state => state.serviceStore);
    const { barberServices, barberServiceModal } = useAppSelector(state => state.barberServiceStore);
    const { barberAdditionals, barberAddEditModal } = useAppSelector(state => state.barberAdditionalStore);
    const { allAdditionals } = useAppSelector(state => state.additionalStore);
    const { currentBarber } = useAppSelector(state => state.barberStore);

    const [filteredAdd, setFilteredAdd] = useState<IAdd[]>([]);
    const [filteredServices, setFilteredServices] = useState<IAllService[]>([]);
    useEffect(() => {
        const filteredArr = allAdditionals.filter(item1 =>
            //@ts-ignore
            !barberAdditionals.some(item2 => item2.additional._id === item1._id)
        );
        setFilteredAdd(filteredArr);
    }, [barberAdditionals]);

    useEffect(() => {
        const filteredServices = allServices.filter(item1 => !barberServices.some(item2 => item2.service._id === item1._id));
        setFilteredServices(filteredServices);
    }, [barberServices]);
    return (
        <div className={'content'}>
            {currentBarber &&
                <div className={'single_barber_header'}>
                    <Avatar src={currentBarber.picture}
                            sx={{ width: 70, height: 70 }}/>
                    <h2>{currentBarber?.name} prices</h2>
                </div>
            }

            <div className={'price_services_wrapper'}>
                <div className={'price_services_internal_wrapper'}>

                    <div>
                        {filteredServices.map(item => <UnactiveService key={item._id} name={item.name}
                                                                       description={item.description} barber={barberId}
                                                                       _id={item._id}/>)}
                        {barberServices.map(item => <SingleServicePrice key={item._id} service={item.service}
                                                                        _id={item._id} services={item.services}
                                                                        price={item.price} duration={item.duration}
                                                                        additionals={item.additionals}/>)}
                    </div>
                    <div>
                        {filteredAdd.length > 0 && filteredAdd.map(item => <UnactiveAdditional key={item._id}
                                                                                               name={item.name}
                                                                                               _id={item._id}
                                                                                               order={item.order}
                                                                                               barberId={barberId}
                        />)}

                        {barberAdditionals.map(item => <SingleAdditionalPrice key={item._id} _id={item._id}
                                                                              barber={item.barber}
                                                                              price={item.price}
                                                                              duration={item.duration}
                                                                              additional={item.additional}/>)}
                    </div>
                </div>
            </div>
            <Dialog open={barberServiceModal}>
                <ServicePriceForm/>
            </Dialog>
            <Dialog open={barberAddEditModal}>
                <AdditionalPriceForm/>
            </Dialog>
        </div>
    );
};

export default SingleBarberPrice;