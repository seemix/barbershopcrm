import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './LangSwitch.css';

const LangSwitch = () => {
    const [back, setBack] = useState(false);
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);

    useEffect(() => {
        setCurrentLang(i18n.language);
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
        <div style={{marginLeft: '15px'}}>
            <select className={back ? 'select_css select_active' : 'select_css'} onChange={handleChange}
                    onBlur={handleBlur} onFocus={handleFocus} defaultValue={currentLang}>
                <option value={'RU'}>RU</option>
                <option value={'RO'}>RO</option>
                <option value={'EN'}>EN</option>
            </select>
        </div>
    );
};

export default LangSwitch;