import React from 'react';
import Header from '../Header/Header';
import Slider from '../Slider/Slider';
import Booking from '../Booking/Booking';
import Services from '../Services/Services';
import Barbers from '../Barbers/Barbers';
import Contacts from '../Contacts/Contacts';
import Footer from '../Footer/Footer';
import ScrollToTop from 'react-scroll-to-top';

const Layout = () => {
    return (
        <div id={'top'}>
            <Header/>
            <Slider/>
            <Booking/>
            <Services/>
            <Barbers/>
            <Contacts/>
            <Footer/>
            <ScrollToTop className={'top_scroll'} component={'↑'} smooth
                         style={{ backgroundColor: '#9e8a78', borderRadius: 3 }}/>

        </div>
    );
};

export default Layout;