import React from 'react';

import './SingleService.css';
import { IAllService } from '../../../interfaces/service.model';
import { Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SingleService = (item:IAllService) => {
    return (
        <div className={'container'}>

                <Card className={'service_card'}>
                    <div className={'card_inside_wrapper'}>
                        <div>
                            <p>{item.name}</p>
                            <small><i>{item.description}</i></small>
                        </div>
                        <div>
                            <Button color={'secondary'}><EditIcon/></Button>
                            <Button color={'error'}><DeleteIcon/></Button>
                        </div>
                    </div>
                </Card>

        </div>
    );
};

export default SingleService;