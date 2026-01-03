import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: string;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Tesla Model π - Revolutionary Smart Phone with Starlink Integration | Pre-order Now',
  description = 'Experience the future with Tesla Model π, featuring Starlink satellite connectivity, solar charging, and revolutionary AI. Pre-order now with 30% deposit.',
  keywords = 'Tesla, Model π, smart phone, Starlink, satellite phone, solar charging, revolutionary technology, AI phone, 5G smartphone',
  url = 'https://model-pi.xyz/',
  image = 'https://zlbemopcgjohrnyyiwvs.supabase.co/storage/v1/object/public/materials/model/shouye1.jpg',
  type = 'website',
  noIndex = false
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'keywords';
      newMeta.content = keywords;
      document.head.appendChild(newMeta);
    }

    // Update or create robots meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', noIndex ? 'noindex, nofollow' : 'index, follow');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'robots';
      newMeta.content = noIndex ? 'noindex, nofollow' : 'index, follow';
      document.head.appendChild(newMeta);
    }

    // Update Open Graph tags
    const ogTags = [
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:site_name', content: 'Tesla Model π' }
    ];

    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (ogTag) {
        ogTag.setAttribute('content', tag.content);
      } else {
        const newMeta = document.createElement('meta');
        newMeta.setAttribute('property', tag.property);
        newMeta.content = tag.content;
        document.head.appendChild(newMeta);
      }
    });

    // Update Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image }
    ];

    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (twitterTag) {
        twitterTag.setAttribute('content', tag.content);
      } else {
        const newMeta = document.createElement('meta');
        newMeta.setAttribute('name', tag.name);
        newMeta.content = tag.content;
        document.head.appendChild(newMeta);
      }
    });

  }, [title, description, keywords, url, image, type, noIndex]);

  return null; // This component doesn't render anything
};

export default SEO;