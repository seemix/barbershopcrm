import React from 'react';
import { Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { IAdd } from '../../../../interfaces/additional.model';
import { useAppDispatch } from '../../../../hooks/redux';
import { setAddForUpdate, setAddToDelete } from '../../../../store/additional';

const SingleAdditional = (item: IAdd) => {
    const dispatch = useAppDispatch();
    return (
        <div className={'container'}>
            <Card className={'service_card'}>
                <div className={'card_inside_wrapper'}>
                    <div className={'card_service_name'}>
                        <p>{item.name}</p>
                    </div>
                    <div>
                        <Button color={'secondary'}
                                onClick={() => dispatch(setAddForUpdate(item))}><EditIcon/></Button>
                        <Button color={'secondary'}
                                onClick={() => dispatch(setAddToDelete(item._id))}><DeleteIcon/></Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SingleAdditional;