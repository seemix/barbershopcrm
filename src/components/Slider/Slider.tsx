import React, { FC } from 'react';
import { Link } from 'react-scroll';
import './Slider.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { openBooking } from '../../store/order';

const Slider: FC = () => {
    const isShowBooking = useAppSelector(state => state.orderStore.showBooking);
    const dispatch = useAppDispatch();
    const handleBooking = () => {
        dispatch(openBooking());
    };
    return (
        <div>
            <div className="overlay_container">
                <div className="pic" id="pic1"/>
                <div className="pic" id="pic2"/>
                <div className="pic" id="pic3"/>
                <div className="pic" id="pic4"/>
                <div className={'overlay'}>
                    <div className={'slider_welcome'}>
                        <h1>Welcome to LevelUP Barbershop</h1>
                        <div>
                            <Link to={'booking'} smooth={true} spy={false}
                                  duration={800}>
                                <button className={'button-5 booking'} onClick={handleBooking}>ЗАПИСАТЬСЯ</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slider;