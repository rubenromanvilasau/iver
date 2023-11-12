import { Link } from 'react-router-dom';
import './footer.scss';

export const Footer = () => {
     return (
        <footer>
            <div className="center">
                <div className="rrss">
                    <Link to={'/instagram'}>
                        <img src="/icons/instagram.svg" alt="instagram icon" />
                    </Link>
                    <Link to={'/facebook'}>
                        <img src="/icons/facebook.svg" alt="facebook icon" />
                    </Link>
                    <Link to={'/twitter'}>
                        <img src="/icons/twitter.svg" alt="twitter icon" />
                    </Link>
                    <Link to={'/linkedin'}>
                        <img src="/icons/linkedin.svg" alt="linkedin icon" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}