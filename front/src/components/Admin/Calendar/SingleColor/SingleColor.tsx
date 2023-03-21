import React, { CSSProperties } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import '../SelectColor/SelectColor.css';
import { setColor } from '../../../../store/order';
interface Props {
    currentColor: string;
}
const SingleColor = ({currentColor}: Props) => {

    const dispatch = useAppDispatch();
    const { color } = useAppSelector(state => state.orderStore);

    let style: CSSProperties = { border: `2px solid ${currentColor}` };
    if (color !== currentColor) style = {marginTop: '2px' };
    return (
        <>
            <div className={'color_button_outer'}
                 onClick={() => dispatch(setColor(currentColor))}
                 style={style}>
                <div className={'color_button'} style={{ backgroundColor: currentColor}}></div>
            </div>
        </>
    );
};

export default SingleColor;