import { useEffect } from 'react';
import { Product } from '../types';

interface StructuredDataProps {
  products: Product[];
  selectedProduct: Product;
}

const StructuredData: React.FC<StructuredDataProps> = ({ products, selectedProduct }) => {
  useEffect(() => {
    // Add product schema
    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": selectedProduct.model,
      "description": selectedProduct.description,
      "image": [selectedProduct.imageUrl],
      "offers": {
        "@type": "Offer",
        "price": selectedProduct.price,
        "priceCurrency": "USD",
        "availability": selectedProduct.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Model π Exclusive Store"
        }
      },
      "brand": {
        "@type": "Brand",
        "name": "Tesla"
      },
      "sku": selectedProduct.id,
      "gtin": selectedProduct.id // Using ID as GTIN for this example
    };

    // Add organization schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Model π Exclusive Store",
      "url": "https://model-pi.xyz",
      "logo": "https://model-pi.xyz/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-415-123-4567",
        "contactType": "customer service",
        "email": "model-pi@protonmail.com"
      }
    };

    // Add website schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Model π",
      "url": "https://model-pi.xyz",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://model-pi.xyz/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // Add breadcrumb schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Model π",
        "item": "https://model-pi.xyz"
      }, {
        "@type": "ListItem",
        "position": 2,
        "name": selectedProduct.model,
        "item": `https://model-pi.xyz/products/${selectedProduct.id}`
      }]
    };

    // Add all schemas to the page
    const schemas = [productSchema, organizationSchema, websiteSchema, breadcrumbSchema];
    
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function to remove scripts when component unmounts
    return () => {
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => {
        if (script.innerHTML.includes(selectedProduct.id) || 
            script.innerHTML.includes('Product') || 
            script.innerHTML.includes('Organization') ||
            script.innerHTML.includes('WebSite') ||
            script.innerHTML.includes('BreadcrumbList')) {
          document.head.removeChild(script);
        }
      });
    };
  }, [selectedProduct]);

  return null; // This component doesn't render anything visible
};

export default StructuredData;