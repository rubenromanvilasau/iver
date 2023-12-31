import { Link } from 'react-router-dom';
const instagramIcon = '/icons/instagram.svg';
const facebookIcon = '/icons/facebook.svg';
const twitterIcon = '/icons/twitter.svg';
const linkedinIcon = '/icons/linkedin.svg';

export const Footer = () => {
     return (
        <footer>
            <div className="flex justify-center h-28 bottom-0 w-full bg-footer mt-4 p-4 box-border">
                <div className="flex items-center gap-4">
                    <Link to={'/instagram'}>
                        <img className='w-6 h-6 cursor-pointer' src={ instagramIcon } alt="instagram icon" />
                    </Link>
                    <Link to={'/facebook'}>
                        <img className='w-6 h-6 cursor-pointer' src={ facebookIcon } alt="facebook icon" />
                    </Link>
                    <Link to={'/twitter'}>
                        <img className='w-6 h-6 cursor-pointer' src={ twitterIcon} alt="twitter icon" />
                    </Link>
                    <Link to={'/linkedin'}>
                        <img className='w-6 h-6 cursor-pointer' src={ linkedinIcon } alt="linkedin icon" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}