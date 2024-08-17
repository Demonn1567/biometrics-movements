import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserBehaviorTracker = () => {
    const [mouseMovements, setMouseMovements] = useState([]);
    const [typingPatterns, setTypingPatterns] = useState([]);
    const [scrollPatterns, setScrollPatterns] = useState([]);

    const getBrowserInfo = () => {
        return {
            browserName: navigator.appName,
            browserVersion: navigator.appVersion,
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
        };
    };

    /* const getBrowserName = () => {
        const userAgent = navigator.userAgent;
    
        if (userAgent.indexOf("Firefox") > -1) {
            return "Mozilla Firefox";
        } else if (userAgent.indexOf("SamsungBrowser") > -1) {
            return "Samsung Internet";
        } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
            return "Opera";
        } else if (userAgent.indexOf("Edg") > -1) {
            return "Microsoft Edge";
        }else if (userAgent.indexOf("Arc") > -1) {
            return "Arc";
        }
         else if (userAgent.indexOf("Chrome") > -1) {
            return "Google Chrome";
        } else if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } else {
            return "Unknown";
        }
    };
    
    console.log(getBrowserName()); */
    
    

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMouseMovements((prevMovements) => [
                ...prevMovements,
                { x: event.clientX, y: event.clientY, timestamp: Date.now() },
            ]);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            setTypingPatterns((prevPatterns) => [
                ...prevPatterns,
                { key: event.key, type: 'keydown', timestamp: Date.now() },
            ]);
        };

        const handleKeyUp = (event) => {
            setTypingPatterns((prevPatterns) => [
                ...prevPatterns,
                { key: event.key, type: 'keyup', timestamp: Date.now() },
            ]);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPatterns((prevPatterns) => [
                ...prevPatterns,
                { scrollY: window.scrollY, timestamp: Date.now() },
            ]);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const sendBehaviorData = () => {
        const data = {
            user_id: 'user123',  
            behavior_data: {
                mouseMovements: mouseMovements,
                typingPatterns: typingPatterns,
                scrollPatterns: scrollPatterns,
            },
            browser_info: getBrowserInfo(),  
        };
    
        axios.post('http://localhost:8000/api/behavior/', data)
            .then(response => {
                console.log('Data sent successfully:', response.data);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };
    

    useEffect(() => {
        window.addEventListener('beforeunload', sendBehaviorData);

        return () => {
            window.removeEventListener('beforeunload', sendBehaviorData);
        };
    }, [mouseMovements, typingPatterns, scrollPatterns]);

    return (
        <div>
            <h1>User Behavior Tracking</h1>
            <p>Move your mouse, press keys on the keyboard, do anything aarrggrhghghhh.</p>
        </div>
    );
};

export default UserBehaviorTracker;