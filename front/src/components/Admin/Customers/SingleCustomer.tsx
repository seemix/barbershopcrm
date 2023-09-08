import React, { useState } from 'react';
import { Button, TableCell, TableRow } from '@mui/material';
import { ISingleCustomer } from '../../../interfaces/customer.model';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../../../hooks/redux';
import { deleteCustomer, setCustomerForEdit } from '../../../store/customer';

const SingleCustomer = (customer: ISingleCustomer) => {
    const [deleteState, setDeleteState] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    return (
        <>
            <TableRow
                key={customer._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {customer.name}
                </TableCell>
                <TableCell align="left">{customer.phone}</TableCell>
                <TableCell align="left">{customer.email}</TableCell>
                <TableCell align="right">{customer?.tag}</TableCell>
                <TableCell align="right">
                    {!deleteState && <>
                        <Button onClick={() => setDeleteState(true)}><DeleteForeverIcon/></Button>
                        <Button onClick={() => dispatch(setCustomerForEdit(customer))}><EditIcon/></Button>
                        <Button>info</Button>
                    </>}
                    {deleteState &&
                    <>
                        <Button onClick={() => setDeleteState(false)}>отмена</Button>
                        <Button onClick={() => dispatch(deleteCustomer(String(customer._id)))}>удалить</Button>
                    </>}
                </TableCell>
            </TableRow>
        </>
    );
};

export default SingleCustomer;