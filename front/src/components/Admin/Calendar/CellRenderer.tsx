import React from 'react';
import { openOrderEditModal } from '../../../store/order';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../../hooks/redux';

const CellRenderer = ({ ...props }) => {
    const dispatch = useAppDispatch();
    return (
        <>
            <Button
                {...props}
                onClick={() => {
                    dispatch(openOrderEditModal(props));
                }}>
            </Button>
        </>
    );
};

export default CellRenderer;