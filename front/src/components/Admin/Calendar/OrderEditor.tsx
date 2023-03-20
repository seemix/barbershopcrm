import React, { useState } from 'react';

import { SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { useAppDispatch } from '../../../hooks/redux';

interface CustomEditorProps {
    scheduler: SchedulerHelpers;
}

const OrderEditor = ({ scheduler }: CustomEditorProps) => {
    const event = scheduler.edited;
    const dispatch = useAppDispatch();
    const [state, setState] = useState();
    return (
        <div>

        </div>
    );
};

export default OrderEditor;