import React from 'react';
import { Link } from 'react-router-dom';
import payment from '../../assets/images/payment-getways.png';
import MobileAppIcon from '../../assets/icons/Icons-App-Store-Google-play.png';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <div>
            <footer className="footer p-10 bg-base-200 text-base-content">
                <div>
                    <span className="footer-title">{t('COMPANY')}</span> 
                    <Link to ="/about" className="link link-hover">{t('About')}</Link> 
                    <Link to ="/contact" className="link link-hover">{t('Contact')}</Link> 
                    <Link to =" " className="link link-hover">{t('Latest')}</Link> 
                </div> 
                <div>
                    <span className="footer-title">{t('LEGAL')}</span> 
                    <Link to ="/terms-condition" className="link link-hover">{t('Terms')}</Link> 
                    <Link to ="/privacy-policy" className="link link-hover">{t('Privacy')} </Link> 
                    <Link to =" " className="link link-hover">{t('Cookie')}</Link>
                </div> 
                
                <div>
                    <span className="footer-title">{t('DOWNLOAD')}</span> 
                    <img src={MobileAppIcon} className='w-[200px]' alt='app icon'/>
                </div>
                <div>
                    <span className="footer-title">{t('SCAN')}</span>
                    <img src="https://cdn-icons-png.freepik.com/256/14021/14021431.png?uid=R95679985&ga=GA1.1.1242648836.1702358523&semt=ais" className='w-[150px]' alt='qr code'/>
                    
                </div>
                </footer>
                <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <div>
                    <p>Copyright © 2022 - All right reserved by Hardware</p> 
                    <img src={payment} alt="payment gateway" className='text-end'/>
                </div>
                
                </footer>
                
        </div>
    );
};

export default Footer;