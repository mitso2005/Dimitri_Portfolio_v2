import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const result = await emailjs.send(
                emailConfig.serviceId,
                emailConfig.contactTemplateId,
                {
                    from_email: email,
                    topic: topic,
                    message: message,
                    to_name: 'Dimitri',
                },
                emailConfig.publicKey
            );

            if (result.status === 200) {
                setStatus('success');
                setEmail('');
                setTopic('');
                setMessage('');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-gray-100 w-full flex items-center justify-center mb-8 py-8 sm:py-12">
            <div className="max-w-3xl w-full mx-4 p-4 sm:p-8 bg-white shadow-md rounded-lg">
                <p className="text-sm sm:text-base mb-6">If you're a brand looking to collaborate, please send me an email using the form below.</p>
                {status === 'success' && (
                    <div className="mb-4 text-green-600">Message sent successfully!</div>
                )}
                {status === 'error' && (
                    <div className="mb-4 text-red-600">Failed to send message. Please try again.</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="from_email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
                        <input
                            type="text"
                            id="topic"
                            name="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        disabled={status === 'sending'}
                        className="btn-custom w-full"
                    >
                        {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;