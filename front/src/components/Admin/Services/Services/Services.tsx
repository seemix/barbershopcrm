import React, { useEffect } from 'react';
import { Button, Dialog, DialogActions } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Reorder } from 'framer-motion';

import ServiceForm from '../ServiceForm/ServiceForm';
import {
    closeDeleteDialog,
    closeDialog, deleteService,
    getAllServices,
    openDialog,
    saveOrder,
    servicesReorder
} from '../../../../store/services';
import SingleService from '../SingleService/SingleService';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import './Services.css';

const Services = () => {
    const dispatch = useAppDispatch();
    const {
        allServices,
        deleteDialogOpen,
        serviceToDelete,
        dialogOpen,
        reorderButton
    } = useAppSelector(state => state.serviceStore);

    useEffect(() => {
        dispatch(getAllServices());
    }, [dispatch]);

    const reOrder = (newOrder: any) => {
        dispatch(servicesReorder(newOrder));
    };
    return (
        <div className={'container admin_services_container'}>
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
            <h4>Основные услуги <Button onClick={() => dispatch(openDialog())}><AddCircleIcon/><span
                style={{ marginLeft: '5px' }}> Добавить</span></Button>
                {reorderButton &&
                    <Button color={'success'}
                            onClick={() => dispatch(saveOrder(allServices))}>Сохранить</Button>
                }
            </h4>

            <Reorder.Group values={allServices} onReorder={(newOrder) => reOrder(newOrder)} as={'ol'}>
                {allServices.map(item => (
                    <Reorder.Item key={item._id} value={item} whileDrag={{ scale: 1.05 }}>
                        <SingleService _id={item._id} name={item.name} description={item.description}
                                       order={item.order}/>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};

export default Services;