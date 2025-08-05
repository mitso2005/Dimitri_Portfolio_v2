import { useEffect } from 'react';

// Import all critical assets
import heroImage from '../assets/img/hero_image.svg';
import portfoliov2Image from '../assets/img/projects/portfolio_v2.svg';
import cissaImage from '../assets/img/projects/cissa.svg';
// Add other critical images

const AssetPreloader = () => {
  useEffect(() => {
    const criticalAssets = [
      heroImage,
      portfoliov2Image,
      cissaImage,
      // Add other critical images
    ];

    // Preload images
    criticalAssets.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Preload fonts programmatically
    const fonts = [
      new FontFace('Junicode', 'url(/src/assets/fonts/Junicode-Regular.ttf)'),
      new FontFace('Satoshi', 'url(/src/assets/fonts/Satoshi-Bold.otf)'),
      new FontFace('Sentient', 'url(/src/assets/fonts/Sentient-Light.otf)'),
    ];

    fonts.forEach(font => {
      font.load().then(() => {
        document.fonts.add(font);
      }).catch(err => {
        console.warn('Font failed to load:', err);
      });
    });
  }, []);

  return null; // This component doesn't render anything
};

export default AssetPreloader;
