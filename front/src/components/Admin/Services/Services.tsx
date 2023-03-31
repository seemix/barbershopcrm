import React, { useEffect } from 'react';
import { Button, Dialog, DialogActions } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Reorder } from 'framer-motion';

import ServiceForm from './ServiceForm/ServiceForm';
import {
    closeDeleteDialog,
    closeDialog, deleteService,
    getAllServices,
    openDialog,
    saveOrder,
    servicesReorder
} from '../../../store/services';
import SingleService from '../Services/SingleService/SingleService';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const Services = () => {
    const dispatch = useAppDispatch();
    const { allServices, deleteDialogOpen, serviceToDelete, dialogOpen } = useAppSelector(state => state.serviceStore);
    useEffect(() => {
        dispatch(getAllServices());
    }, [dispatch]);
    const reOrder = (newOrder: any) => {
        dispatch(servicesReorder(newOrder));
    };
    return (
        <div className={'container'} style={{ flexDirection: 'column' }}>
            <Dialog
                open={deleteDialogOpen}
                onClose={() => dispatch(closeDeleteDialog())}>
                <div style={{ margin: '10px', padding: '15px' }}>
                    <h4>Подтвердите удаление элемента</h4>
                    <DialogActions>
                        <Button onClick={() => dispatch(closeDeleteDialog())}>Отмена</Button>
                        <Button autoFocus onClick={() => dispatch(deleteService(serviceToDelete))}>
                            Удалить
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>

            <Dialog open={dialogOpen} onClose={() => dispatch(closeDialog())}>
                <ServiceForm/>
            </Dialog>
            <h2>Услуги <Button onClick={() => dispatch(openDialog())}><AddCircleIcon/><span
                style={{ marginLeft: '5px' }}> Добавить</span></Button>
                <Button style={{ maxWidth: '350px' }}
                        onClick={() => dispatch(saveOrder(allServices))}>Сохранить</Button>
            </h2>

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