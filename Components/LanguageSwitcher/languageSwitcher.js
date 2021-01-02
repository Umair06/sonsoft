import React from 'react';


const LanguageSwitcher = () => {
    return (
        <div className="languages" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a style={{ padding: '10px', fontSize: '16px' }} href="?locale=ar" >العربية</a>
            <a style={{ padding: '10px', fontSize: '16px' }} href="?locale=en" >English</a>
            <a style={{ padding: '10px', fontSize: '16px' }} href="?locale=es" >Español</a>
        </div>
    )
}

export default LanguageSwitcher;
