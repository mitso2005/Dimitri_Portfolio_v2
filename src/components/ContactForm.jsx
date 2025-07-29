import React, { useState } from 'react';

const ContactForm = () => {
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [touched, setTouched] = useState({ email: false, topic: false, message: false });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = true;
        if (!topic) newErrors.topic = true;
        if (!message) newErrors.message = true;
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        setTouched({ email: true, topic: true, message: true });
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
            setEmail('');
            setTopic('');
            setMessage('');
            setTouched({ email: false, topic: false, message: false });
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
                ? '-top-2 text-xs bg-white px-1' 
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
        <div className="bg-gray-100 w-full flex items-center justify-center mb-8 py-8 sm:py-12">
            <div className="max-w-3xl w-full mx-4 p-4 sm:p-8 bg-white shadow-md rounded-lg">
                <p className="text-sm sm:text-base mb-6">If you're a brand looking to collaborate, please send me an email using the form below.</p>
                {status === 'success' && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        Message sent successfully!
                    </div>
                )}
                {status === 'error' && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        Failed to send message. Please try again.
                    </div>
                )}
                <div className="space-y-6">
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
                                    ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                            }`}
                            autoComplete="off"
                        />
                        <label htmlFor="email" className={labelClass('email', email)}>
                            Email Address
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
                                    ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                            }`}
                            autoComplete="off"
                        />
                        <label htmlFor="topic" className={labelClass('topic', topic)}>
                            Topic
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
                                    ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                            }`}
                            rows={4}
                        />
                        <label htmlFor="message" className={labelClass('message', message)}>
                            Message
                        </label>
                    </div>

                    <button 
                        type="button" 
                        disabled={status === 'sending'}
                        onClick={handleSubmit}
                        className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-200 ${
                            status === 'sending'
                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
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