import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const sendContactEmail = async (formData) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_CONTACT_TEMPLATE_ID,
      formData
    );
    return response;
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
};

export const sendNewsletterSubscription = async (formData) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_DOWNLOAD_TEMPLATE_ID,
      formData
    );
    return response;
  } catch (error) {
    console.error("Error sending newsletter subscription:", error);
    throw error;
  }
};
