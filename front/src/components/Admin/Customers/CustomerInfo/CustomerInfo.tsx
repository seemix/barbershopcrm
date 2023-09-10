import React from 'react';
import Face6Icon from '@mui/icons-material/Face6';
import { Avatar, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { closeCustomerInfoModal, resetCustomer } from '../../../../store/customer';
import './CustomerInfo.css';

const CustomerInfo = () => {
    const { customerInfo, customer } = useAppSelector(state => state.customersStore);
    const dispatch = useAppDispatch();
    return (
        <div className={'customer_info_main_wrap'}>
            <div className={'customer_info_second_wrap'}>
                <Avatar><Face6Icon/></Avatar>
                <h4>{customer?.name} detailed info</h4>
            </div>
            <Table>
                <TableHead></TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Номер телефона:</TableCell><TableCell>{customer?.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>email</TableCell><TableCell>{customer?.email}</TableCell>
                    </TableRow>
                    {customer?.tag && <TableRow>
                        <TableCell>tag</TableCell><TableCell>{customer?.tag}</TableCell>
                    </TableRow> }
                    <TableRow>
                        <TableCell>добавлен</TableCell>
                        <TableCell>{dayjs(customerInfo.createdAt).toDate().toLocaleDateString('ru-RU')}</TableCell>
                    </TableRow>
                    {customerInfo.lastOrderDate && <TableRow>
                        <TableCell>последний визит</TableCell>
                        <TableCell>{dayjs(customerInfo?.lastOrderDate).toDate().toLocaleDateString('ru-RU')}</TableCell>
                    </TableRow>}
                    {customerInfo.allOrdersPayed && <TableRow>
                        <TableCell>последняя оплата</TableCell><TableCell>{customerInfo.lastOrderPayed} MDL</TableCell>
                    </TableRow>}
                    {customerInfo.allOrdersPayed && <TableRow>
                        <TableCell>всего оплачено</TableCell><TableCell>{customerInfo.allOrdersPayed} MDL</TableCell>
                    </TableRow>}
                    {customerInfo.averageBill && <TableRow>
                        <TableCell>средний чек</TableCell><TableCell>{customerInfo.averageBill} MDL</TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
            <Button variant={'contained'} onClick={() => {
                dispatch(closeCustomerInfoModal());
                dispatch(resetCustomer());
            }}>закрыть</Button>
        </div>
    );
};

export default CustomerInfo;