import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

export const CountdownTimer = ({ endDate }) => {
    
    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = new Date(endDate) - now;
        
        if ( difference <= 0 ) {
            // Timer has reached or passed the target date
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        return { days, hours, minutes, seconds };
    };
    
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        
        return () => clearInterval(interval);
    }, [endDate]);

    return (
        <span className="font-light text-text-secondary">
            { new Date( endDate ) > new Date() 
                ? ` ${timeLeft.days}d:${timeLeft.hours}h:${timeLeft.minutes}m:${timeLeft.seconds}s`
                : ' Ended'
            }
           
        </span>
    )
};

CountdownTimer.propTypes = {
    endDate: PropTypes.string.isRequired,
};