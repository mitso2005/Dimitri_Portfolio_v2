import React from 'react';
import PageNav from '../components/PageNav.jsx';
import heroImage from '../assets/img/hero_image.svg';
import NewsletterForm from '../components/NewsletterForm.jsx';
export default function Newsletter() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageNav />
      <div className="content">
        <h2 className="font-h2-sm">Sign up to my newsletter!</h2>
        
        <NewsletterForm />
      </div>
      <img src={heroImage} alt="Illustration of Dimitri" className="hero-image opacity-25" />
    </div>
  );
}
