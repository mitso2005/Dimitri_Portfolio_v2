import React, { useState, useEffect } from 'react';
import PageNav from '../components/PageNav.jsx';
import heroImage from '../assets/img/hero_image.svg';

function Countdown() {
    const [gradCountdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    
    // Set target date for your Computer Science degree completion
    const targetDate = new Date("2026-11-20T00:00:00");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeDiff = targetDate - now;

            // Calculate days, hours, minutes, and seconds
            const daysLeft = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
            const hoursLeft = Math.max(0, Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            const minutesLeft = Math.max(0, Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)));
            const secondsLeft = Math.max(0, Math.floor((timeDiff % (1000 * 60)) / 1000));

            setCountdown({
                days: daysLeft,
                hours: hoursLeft,
                minutes: minutesLeft,
                seconds: secondsLeft,
            });
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="countdown">
            <div className="countdown-timer">
                <span>{gradCountdown.days} days </span>
                <span>{gradCountdown.hours} hours </span>
                <span>{gradCountdown.minutes} minutes </span>
                <span>{gradCountdown.seconds} seconds </span>
            </div>
        </div>
    );
}

export default function About() {
  return (
    <div className = "min-h-screen flex flex-col">
      <PageNav />
      <div className="text-center pt-10 pb-10 px-2">
        <h2 className="font-h2-sm">About Me</h2>
        <p>
          Hi my name's Dimitri, I'm a passionate Software Developer and Tech Content Creator based out of Melbourne, Australia. I'm currently completing a Bachelor of Computing and Software Systems at The University of Melbourne. You should hire me in <Countdown /> when I graduate.
        </p>
        <p>
          Right now I'm working as a Web Developer at Yella Terra
        </p>
      </div>
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-25" />
    </div>
  );
}
