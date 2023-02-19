import React, { FC, useEffect } from 'react';

import './Barbers.css';
import ben from '../../images/team-3.webp';
import nic from '../../images/team-4.webp';
import pet from '../../images/team-5.webp';
import dan from '../../images/team-6.webp';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllBarbers } from '../../store/barbers';
import BarberSingle from './BarberSingle';

const Barbers: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllBarbers());
    }, []);
    const { barbers } = useAppSelector(state => state.barberStore);
    return (
        <div className={'barbers'}>
            <div className={'section_caption'}>
                <h3>LevelUP Barbershop</h3>
                <h2>Наши барберы</h2>
                <div className={'heading_line'}></div>
                <div className={'cards_wrapper'}>
                    {
                        barbers && barbers.map(barber =>  <BarberSingle
                            key={barber._id}
                            description={barber.description}
                            name={barber.name}
                            picture={barber.picture}
                            rating={barber.rating}
                            isActive={barber.isActive}
                            _id={barber._id}
                        />)
                    }

                    {/*<div>*/}
                    {/*    <img className={'gray_scale'} width={'350px'} src={ben} alt="ben"/>*/}
                    {/*    <div className={'team_overlay'}>*/}
                    {/*        <h3>Benjamin</h3>*/}
                    {/*        <h4>owner</h4>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <img className={'gray_scale'} width={'350px'} src={nic} alt="ben"/>*/}
                    {/*    <div className={'team_overlay'}>*/}
                    {/*        <h3>Nicolae</h3>*/}
                    {/*        <h4>junior barber</h4>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <img className={'gray_scale'} width={'350px'} src={pet} alt="ben"/>*/}
                    {/*    <div className={'team_overlay'}>*/}
                    {/*        <h3>Petru</h3>*/}
                    {/*        <h4>student barber</h4>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <img className={'gray_scale'} width={'350px'} src={dan} alt="ben"/>*/}
                    {/*    <div className={'team_overlay'}>*/}
                    {/*        <h3>Daniel</h3>*/}
                    {/*        <h4>assistant</h4>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            </div>
        </div>
    );
};

export default Barbers;