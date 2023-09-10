import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
    closeCustomerEditModal, closeCustomerInfoModal,
    getAllCustomers,
    openCustomerEditModal, resetCustomer,
    setCustomerForEdit
} from '../../../store/customer';
import { Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import SingleCustomer from './SingleCustomer';
import { ISingleCustomer } from '../../../interfaces/customer.model';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import './Customers.css';
import CustomerFullForm from './CustomerFullForm';
import CustomerInfo from './CustomerInfo/CustomerInfo';

const Customers = () => {
    const { customers, pages } = useAppSelector(state => state.customersStore).getCustomers;
    const { customerEditModal, customerInfoModal } = useAppSelector(state => state.customersStore);

    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllCustomers({
            page: searchParams.get('page') || 1,
            search: searchParams.get('search'),
            sort: null
        }));
    }, [searchParams, dispatch]);
    const handlePage = (e: React.ChangeEvent<unknown>, selectedPage: number) => {
        searchParams.set('page', String(selectedPage));
        setSearchParams(searchParams);
    };

    const   handleCloseInfo = () => {
        dispatch(closeCustomerInfoModal());
        dispatch(resetCustomer());
    }

    useEffect(() => {
        if ((search && search?.length > 2) || search?.length === 0) {
            searchParams.set('search', search);
        }
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    }, [search]);
    return (
        <div className={'admin_content'}>
            <div className={'customers_wrapper'}>
                <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-evenly', width: '100%' }}>
                    <Button onClick={() => {
                        dispatch(setCustomerForEdit(null));
                        dispatch(openCustomerEditModal());
                    }}>+ Добавить клиента</Button>
                    <div>
                        {search && search.length > 2 && <><h4>search results for <b>'{search}'</b></h4></>}
                    </div>
                    <div style={{ display: 'flex' }}>
                        <TextField label={'поиск'} variant={'outlined'}
                                   onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>
                </div>
                <Table className={'customers_table'} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Customer name</b></TableCell>
                            <TableCell><b>phone number</b></TableCell>
                            <TableCell align={'center'}><b>email</b></TableCell>
                            <TableCell><b>tag</b><LocalOfferOutlinedIcon/></TableCell>
                            <TableCell align={'center'} style={{ minWidth: '200px' }}><b>actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.length > 0 && customers.map((customer: ISingleCustomer) => (
                            <SingleCustomer key={customer._id} _id={customer._id} name={customer.name}
                                            phone={customer.phone} email={customer.email} tag={customer.tag}/>
                        ))}
                    </TableBody>
                </Table>
                {pages && pages > 1 &&
                    <Pagination shape={'rounded'} count={pages || 1} onChange={handlePage}/>
                }
            </div>
            <Dialog open={customerEditModal} onClose={() => {
                dispatch(closeCustomerEditModal());
                dispatch(setCustomerForEdit(null));
            }}>
                <CustomerFullForm/>
            </Dialog>
            <Dialog open={customerInfoModal} onClose={handleCloseInfo}>
                <CustomerInfo/>
            </Dialog>
        </div>
    );
};

export default Customers;