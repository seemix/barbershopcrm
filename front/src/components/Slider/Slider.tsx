import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

import './Slider.css';
import WelcomeButton from './WelcomeButton';

const Slider: FC = () => {
    const slides = ['/slides/1.webp', '/slides/2.webp', '/slides/3.webp', '/slides/4.webp', '/slides/5.webp'];
    return (
        <div>
            <div className={'overlay_container'}>
                <Swiper
                    speed={2500}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: 5500,
                        disableOnInteraction: false,
                    }}
                    effect={'fade'}
                    fadeEffect={{
                        crossFade: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, EffectFade, Navigation, Pagination]}
                    className={'slider_container'}
                    loop={true}
                >
                    {slides.map(slide => <SwiperSlide key={slide}>

                        <div className={'pic'} style={{ backgroundImage: `url(${slide})` }}>
                            <WelcomeButton/>
                        </div>
                    </SwiperSlide>)}
                </Swiper>

            </div>
        </div>
    );
};

export default Slider;