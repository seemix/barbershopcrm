import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './LangSwitch.css';

const LangSwitch = () => {
    const [back, setBack] = useState(false);
    const { i18n } = useTranslation();
    const handleChange = (e: any) => {
        e.preventDefault();
        changeLanguage(e.target.value);

    };
    const handleBlur = (e: any) => {
        setBack(false);
    };
    const handleFocus = (e: any) => {
        setBack(true);
    };
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };
    return (
        <div>
            <select className={back ? 'select_css select_active' : 'select_css'} onChange={handleChange}
                    onBlur={handleBlur} onFocus={handleFocus}>
                <option value={'ru'} selected={i18n.language === 'ro'}>RU</option>
                <option value={'ro'} selected={i18n.language === 'ro'}>RO</option>
                <option value={'en'} selected={i18n.language === 'en'}>EN</option>
            </select>
        </div>
    );
};

export default LangSwitch;