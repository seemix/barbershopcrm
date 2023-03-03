import React, { FC, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import './Barbers.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllBarbers } from '../../store/barbers';
import BarberSingle from './BarberSingle';

const Barbers: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllBarbers());
    }, [dispatch]);
    const { barbers, status } = useAppSelector(state => state.barberStore);

    return (
        <div className={'barbers'}>
            <div className={'section_caption'}>
                <h3>LevelUP Barbershop</h3>
                <h2>Наши барберы</h2>
                <Swiper
                    autoHeight={true}
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        '@0.00': {
                            slidesPerView: 1.2,
                            spaceBetween: 5,
                        },
                        '@0.75': {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        '@1.00': {
                            slidesPerView: 2.4,
                            spaceBetween: 10,
                        },
                        '@1.25': {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        '@1.50': {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        '@2.00': {
                            slidesPerView: 4,
                            spaceBetween: 10
                        },
                    }}
                    loop={false}
                    // loopFillGroupWithBlank={true}
                    navigation
                    //pagination={true}
                    modules={[Pagination, Navigation]}
                    className="swiper_wrap"
                >
                    {/*<div className={'cards_wrapper'}>*/}
                        {
                            status === 'fulfilled' &&
                            barbers && barbers.map(barber =>
                                <SwiperSlide>
                                    <BarberSingle
                                        key={barber._id}
                                        description={barber.description}
                                        name={barber.name}
                                        picture={barber.picture}
                                        rating={barber.rating}
                                        isActive={barber.isActive}
                                        _id={barber._id}
                                    />
                                </SwiperSlide>)
                        }
                    {/*</div>*/}
                </Swiper>
            </div>
        </div>
    );
};

export default Barbers;