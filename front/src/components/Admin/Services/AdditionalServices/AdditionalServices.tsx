import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
    additionalsReorder,
    closeAddDeleteDialog, closeAddDialog, deleteAdditional,
    getAllAdditionals, openAddDialog,
    saveAdditionalOrder
} from '../../../../store/additional';
import { Button, Dialog, DialogActions } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Reorder } from 'framer-motion';
import SingleAdditional from '../SingleAdditional/SingleAdditional';
import AdditionalForm from '../AdditionalForm/AdditionalForm';

const AdditionalServices = () => {
    const dispatch = useAppDispatch();
    const { allAdditionals, addDialogOpen, additionalToDelete, deleteDialogOpen } = useAppSelector(state => state.additionalStore);
    useEffect(() => {
        dispatch(getAllAdditionals());
    }, [dispatch]);
    const reOrder = (newOrder: any) => {
        dispatch(additionalsReorder(newOrder));
    }
    return (
        <div className={'container'} style={{ flexDirection: 'column' }}>
            <Dialog
                open={deleteDialogOpen}
                onClose={() => dispatch(closeAddDeleteDialog())}>
                <div style={{ margin: '10px', padding: '15px' }}>
                    <h4>Подтвердите удаление элемента</h4>
                    <DialogActions>
                        <Button onClick={() => dispatch(closeAddDeleteDialog())}>Отмена</Button>
                        <Button autoFocus onClick={() => dispatch(deleteAdditional(String(additionalToDelete)))}>
                            Удалить
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>

            <Dialog open={addDialogOpen} onClose={() => dispatch(closeAddDialog())}>
               <AdditionalForm/>
            </Dialog>
            <h2>Доп. услуги <Button onClick={() => dispatch(openAddDialog())}><AddCircleIcon/><span
                style={{ marginLeft: '5px' }}> Добавить</span></Button>
                <Button style={{ maxWidth: '350px' }}
                        onClick={() => dispatch(saveAdditionalOrder(allAdditionals))}>Сохранить</Button>
            </h2>

            <Reorder.Group values={allAdditionals} onReorder={(newOrder) => reOrder(newOrder)} as={'ol'}>
                {allAdditionals.map(item => (
                    <Reorder.Item key={item._id} value={item}>
                        <SingleAdditional _id={item._id} name={item.name}
                                       order={item.order}/>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};

export default AdditionalServices;