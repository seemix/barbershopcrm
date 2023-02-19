import React, { FC } from 'react';
import Header from './components/Header/Header';
import Services from './components/Services/Services';
import Slider from './components/Slider/Slider';
import Barbers from './components/Barbers/Barbers';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import ScrollToTop from "react-scroll-to-top";
import Booking from './components/Booking/Booking';
import { ThemeProvider } from '@mui/material';
import theme from './themes/theme';
import './App.css';

const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
        <div id={'top'}>
            <Header/>
            <Slider/>
            <Services/>
            <Barbers/>
            <Booking/>
            <Contacts/>
            <Footer/>
            <ScrollToTop className={'top_scroll'} component={'↑'} smooth style={{backgroundColor: '#9e8a78', borderRadius: 3}}/>
        </div>
        </ThemeProvider>
    );
};

export default App;