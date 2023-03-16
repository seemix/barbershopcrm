import React from 'react';
import { useTranslation } from 'react-i18next';

import './LangSwitch.css';

const LangSwitch = () => {
    const { i18n } = useTranslation();
    const handleChange = (e:any) => {
        e.preventDefault();
        changeLanguage(e.target.value);
    }
    const changeLanguage = (language:string) => {
        i18n.changeLanguage(language);
    }
    return (
        <div>
            <select className="select-css" onChange={handleChange}>
                <option value={'ru'}>RU</option>
                <option value={'ro'}>RO</option>
                <option value={'en'}>EN</option>
            </select>
        </div>
    );
};

export default LangSwitch;