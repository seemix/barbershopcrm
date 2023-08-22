import React, { FC, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import './Barbers.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllBarbers } from '../../store/barbers';
import BarberSingle from './BarberSingle';
import { useTranslation } from 'react-i18next';

const Barbers: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllBarbers());
    }, [dispatch]);
    const { barbers, status } = useAppSelector(state => state.barberStore);

    return (
        <div className={'barbers'}>
            <div className={'section_caption'}>
                <h3>LevelUP Barbershop</h3>
                <h2>{t('Наши барберы')}</h2>
                <Swiper
                    // @ts-ignore
                    autoHeight={true}
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        '@0.00': {
                            slidesPerView: 1.2,
                            spaceBetween: 5,
                        },
                        '@0.50': {
                            slidesPerView: 1.2,
                            spaceBetween: 5,
                        },
                        '@0.60': {
                            slidesPerView: 1.3,
                            spaceBetween: 5,
                        },
                        '@0.75': {
                            slidesPerView: 1.8,
                            spaceBetween: 10,
                        },
                        '@1.00': {
                            slidesPerView: 2.5,
                            spaceBetween: 10,
                        },
                        '@1.25': {
                            slidesPerView: 2.9,
                            spaceBetween: 10,
                        },
                        '@1.50': {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        '@1.80': {
                            slidesPerView: 4,
                            spaceBetween: 10
                        }

                    }}
                    loop={false}
                    navigation
                    modules={[Pagination, Navigation]}
                    className="swiper_wrap"
                >
                    {
                        status === 'fulfilled' &&
                        barbers && barbers.map(barber =>
                            <SwiperSlide key={barber._id}>
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
                </Swiper>
            </div>
        </div>
    );
};

export default Barbers;