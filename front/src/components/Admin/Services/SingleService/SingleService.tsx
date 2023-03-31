import React from 'react';

import './SingleService.css';
import { IAllService } from '../../../../interfaces/service.model';
import { Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../../../hooks/redux';
import { setDelete, setServiceForUpdate } from '../../../../store/services';

const SingleService = (item: IAllService) => {
    const dispatch = useAppDispatch();
    return (
        <div className={'container'}>
            <Card className={'service_card'}>
                <div className={'card_inside_wrapper'}>
                    <div>
                        <p>{item.name}</p>
                        <small><i>{item.description}</i></small>
                    </div>
                    <div>
                        <Button color={'secondary'} onClick={()=> dispatch(setServiceForUpdate(item))}><EditIcon/></Button>
                        <Button color={'secondary'} onClick={() => dispatch(setDelete(item._id))}><DeleteIcon/></Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SingleService;