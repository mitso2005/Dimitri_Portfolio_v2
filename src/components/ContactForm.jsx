import React, { useState } from 'react';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [touched, setTouched] = useState({ name: false, email: false, company: false, topic: false, message: false });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = true;
        if (!email) newErrors.email = true;
        if (!topic) newErrors.topic = true;
        if (!message) newErrors.message = true;
        // company is optional
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        setTouched({ name: true, email: true, company: true, topic: true, message: true });
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setStatus('');
            return;
        }

        setStatus('sending');
        try {
            // Simulating email send since we don't have emailjs configured
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setStatus('success');
            setName('');
            setEmail('');
            setCompany('');
            setTopic('');
            setMessage('');
            setTouched({ name: false, email: false, company: false, topic: false, message: false });
            setErrors({});
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

    return (
        <div className = 'w-full flex items-center justify-center mb-8 py-8 sm:py-12'>
            <div className="max-w-3xl w-full mx-4 p-4 sm:p-8 shadow-md rounded-lg"
                style={{ background: 'var(--color-light)', color: 'var(--color-dark)' }}>
                <p className="text-sm sm:text-base mb-6">If you're a brand looking to collaborate, please send me an email using the form below.</p>
                {status === 'success' && (
                    <div
                        className="mb-4 p-3 border rounded"
                        style={{
                            background: 'rgba(173,204,238,0.25)', // faded primary blue
                            borderColor: 'var(--color-secondary-blue)',
                            color: 'var(--color-secondary-blue)'
                        }}
                    >
                        Message sent successfully!
                    </div>
                )}
                {status === 'error' && (
                    <div
                        className="mb-4 p-3 border rounded"
                        style={{
                            background: 'rgba(255,219,228,0.25)', // faded primary pink
                            borderColor: 'var(--color-primary-pink)',
                            color: 'var(--color-primary-pink)'
                        }}
                    >
                        Failed to send message. Please try again.
                    </div>
                )}
                <div className="space-y-6">
                    {/* Name & Company Fields Side by Side */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Name Field */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onBlur={() => setTouched(t => ({ ...t, name: true }))}
                                required
                                className={`w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200 ${
                                    errors.name && touched.name
                                        ? 'border-primary-pink focus:ring-primary-pink focus:border-primary-pink'
                                        : 'border-gray-300 focus:ring-secondary-blue focus:border-secondary-blue'
                                }`}
                                style={{ background: 'var(--color-light)', color: 'var(--color-dark)' }}
                                autoComplete="off"
                            />
                            <label htmlFor="name" className={labelClass('name', name)}>
                                Name*
                            </label>
                        </div>
                        {/* Company Field */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={company}
                                onChange={e => setCompany(e.target.value)}
                                onBlur={() => setTouched(t => ({ ...t, company: true }))}
                                className="w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200 border-gray-300 focus:ring-secondary-blue focus:border-secondary-blue"
                                style={{ background: 'var(--color-light)', color: 'var(--color-dark)' }}
                                autoComplete="on"
                            />
                            <label htmlFor="company" className={labelClass('company', company)}>
                                Company
                            </label>
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onBlur={() => setTouched(t => ({ ...t, email: true }))}
                            required
                            className={`w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200 ${
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

                    {/* Topic Field */}
                    <div className="relative">
                        <input
                            type="text"
                            id="topic"
                            name="topic"
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                            onBlur={() => setTouched(t => ({ ...t, topic: true }))}
                            required
                            className={`w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200 ${
                                errors.topic && touched.topic
                                    ? 'border-primary-pink focus:ring-primary-pink focus:border-primary-pink'
                                    : 'border-gray-300 focus:ring-secondary-blue focus:border-secondary-blue'
                            }`}
                            style={{ background: 'var(--color-light)', color: 'var(--color-dark)' }}
                            autoComplete="off"
                        />
                        <label htmlFor="topic" className={labelClass('topic', topic)}>
                            Topic*
                        </label>
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onBlur={() => setTouched(t => ({ ...t, message: true }))}
                            required
                            className={`w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200 resize-vertical ${
                                errors.message && touched.message
                                    ? 'border-primary-pink focus:ring-primary-pink focus:border-primary-pink'
                                    : 'border-gray-300 focus:ring-secondary-blue focus:border-secondary-blue'
                            }`}
                            style={{ background: 'var(--color-light)', color: 'var(--color-dark)' }}
                            rows={4}
                        />
                        <label htmlFor="message" className={labelClass('message', message)}>
                            Message*
                        </label>
                    </div>

                    <button 
                        type="button" 
                        disabled={
                            status === 'sending' ||
                            !name || !email || !topic || !message
                        }
                        onClick={handleSubmit}
                        className={`btn-custom w-full${
                            status === 'sending' || !name || !email || !topic || !message ? ' inactive' : ''
                        }`}
                    >
                        {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;