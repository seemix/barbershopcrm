import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './LangSwitch.css';

const LangSwitch = () => {
    const [back, setBack] = useState(false);
    const { i18n } = useTranslation();
    const [currentLang, serCurrentLang] = useState(i18n.language);
    useEffect(() => {
        serCurrentLang(i18n.language);
    }, [i18n.language]);
    const handleChange = (e: any) => {
        e.preventDefault();
        changeLanguage(e.target.value);

    };
    const handleBlur = () => {
        setBack(false);
    };
    const handleFocus = () => {
        setBack(true);
    };
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };
    return (
        <div>
            <select className={back ? 'select_css select_active' : 'select_css'} onChange={handleChange}
                    onBlur={handleBlur} onFocus={handleFocus} defaultValue={currentLang}>
                <option value={'ru'}>RU</option>
                <option value={'ro'}>RO</option>
                <option value={'en'}>EN</option>
            </select>
        </div>
    );
};

export default LangSwitch;