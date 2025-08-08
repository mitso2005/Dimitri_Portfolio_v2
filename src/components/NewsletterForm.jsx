import React, { useState, useEffect } from 'react';
import { sendNewsletterSubscription } from '../utils/emailService';
import NotionImage from '../assets/img/notion_preview.jpg';

const NewsletterForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [touched, setTouched] = useState(false);
    const [errors, setErrors] = useState({});
    const [imageHovered, setImageHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    // Detect if we're on mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = true;
        return newErrors;
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Don't allow new submissions after success
        if (status === 'success') return;

        const newErrors = validate();
        setTouched(true);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setStatus('');
            return;
        }

        setStatus('sending');
        try {
            // Prepare form data for newsletter subscription
            const formData = {
                email,
                subscribe_date: new Date().toISOString()
            };

            // Send email using EmailJS
            await sendNewsletterSubscription(formData);

            setStatus('success');
            // Keep email value to prevent editing after successful subscription
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
        }
    };

    // Helper for label style with floating behavior
    const labelClass = (field, value) => {
        const hasValue = value.length > 0;
        const hasError = errors[field] && touched[field];

        return `absolute left-3 pointer-events-none transition-all duration-200 ease-in-out
            ${hasValue || document.activeElement?.name === field
            ? '-top-2 text-xs bg-[var(--color-light)] px-1'
            : 'top-2 text-base'
            }
            ${hasError
            ? 'text-red-500 font-semibold'
            : hasValue || document.activeElement?.name === field
                ? 'text-gray-600'
                : 'text-gray-400'
            }`;
    };

    // Placeholder style (solid color)
    const placeholderStyle = {
        backgroundColor: 'var(--color-light)',
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: '15px',
        display: 'block',
    };

    return (
        <div className = 'w-full flex items-center justify-center'>
            <div className="max-w-5xl w-full p-4 sm:p-8 shadow-md border-2 border-[var(--color-dark)] rounded-[15px]"
                style={{ background: 'var(--color-light)', color: 'var(--color-dark)' }}>
                <h3 className = "">Start your tech job search today!</h3>
                <p className="text-sm sm:text-base mb-2 md:mb-4">Get the latest tech news and free resources.</p>
                
                {/* Image with caption - different behavior for mobile vs desktop */}
                <div className="mb-6">
                    {!isMobile ? (
                        /* Desktop: hover effect with overlay caption */
                        <div 
                            className="relative cursor-pointer rounded-[15px] overflow-hidden w-1/2 mx-auto"
                            onMouseEnter={() => setImageHovered(true)}
                            onMouseLeave={() => setImageHovered(false)}
                        >
                            {/* Solid color placeholder */}
                            {!imgLoaded && (
                                <div
                                    style={placeholderStyle}
                                    className="absolute inset-0 animate-pulse"
                                />
                            )}
                            <img 
                                src={NotionImage} 
                                alt="Notion Tool" 
                                className={`rounded-[15px] border-2 border-[var(--color-dark)] shadow-[15px] w-full transition-all duration-300 ${imageHovered ? 'blur-md scale-105' : ''} ${imgLoaded ? 'relative' : 'opacity-0'}`}
                                onLoad={() => setImgLoaded(true)}
                                style={{ position: 'relative', zIndex: 2 }}
                            />
                            {imageHovered && imgLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center text-center">
                                    <p className="text-[var(--color-light)] text-lg font-medium px-4 py-2 bg-black/50 rounded-[15px] z-10">
                                        Free Notion template with your subscription!
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Mobile: image with caption below (no hover, no blur) */
                        <figure className="space-y-2 w-3/5 mx-auto relative">
                            {!imgLoaded && (
                                <div
                                    style={placeholderStyle}
                                    className="absolute inset-0 animate-pulse"
                                />
                            )}
                            <img 
                                src={NotionImage} 
                                alt="Notion Tool" 
                                className={`rounded-[15px] shadow-[15px] w-full ${imgLoaded ? 'relative' : 'opacity-0'}`}
                                onLoad={() => setImgLoaded(true)}
                                style={{ position: 'relative', zIndex: 2 }}
                            />
                            <p className="text-center italic relative z-10">
                                Free Notion template with your subscription!
                            </p>
                        </figure>
                    )}
                </div>
                
                <div className="space-y-2">
                    {/* Email Field */}
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onBlur={() => setTouched(true)}
                            required
                            disabled={status === 'success'}
                            className={`w-full px-3 py-3 border rounded-[15px] shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200 ${
                                errors.email && touched.email
                                    ? 'border-primary-pink focus:ring-primary-pink focus:border-primary-pink'
                                    : 'border-gray-300 focus:ring-secondary-blue focus:border-secondary-blue'
                            }`}
                            style={{ background: 'var(--color-light)', color: 'var(--color-dark)' }}
                            autoComplete="on"
                        />
                        <label htmlFor="email" className={labelClass('email', email)}>
                            Email Address*
                        </label>
                    </div>

                    <button 
                        type="button" 
                        disabled={
                            status === 'sending' ||
                            status === 'success' ||
                            !email ||
                            !isValidEmail(email)
                        }
                        onClick={handleSubmit}
                        className={`btn-custom w-full${
                            status === 'sending' || !email || !isValidEmail(email)
                              ? ' inactive' 
                              : status === 'success' 
                                ? ' active'
                                : ''
                        }`}
                    >
                        {status === 'sending' 
                          ? 'Subscribing...' 
                          : status === 'success'
                            ? 'Subscribed!'
                            : 'Subscribe!'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsletterForm;