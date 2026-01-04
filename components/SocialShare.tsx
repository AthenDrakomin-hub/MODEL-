import React from 'react';
import { Share2, Twitter, Facebook, Linkedin, Mail, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ 
  url = typeof window !== 'undefined' ? window.location.href : '', 
  title = 'Model π - Revolutionary Smart Phone with Starlink Integration', 
  description = 'Experience the future with Model π, featuring Starlink satellite connectivity, solar charging, and revolutionary AI. Pre-order now with 30% deposit.' 
}) => {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text: description,
    url: url
  };

  const platforms = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'text-blue-400',
      hoverColor: 'hover:text-blue-500',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      hoverColor: 'hover:text-blue-700',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank');
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700',
      hoverColor: 'hover:text-blue-800',
      action: () => {
        const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
        window.open(linkedinUrl, '_blank');
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'text-gray-600',
      hoverColor: 'hover:text-gray-700',
      action: () => {
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + ' ' + url)}`;
        window.location.href = mailtoUrl;
      }
    }
  ];

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Share:</span>
        {platforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <button
              key={platform.name}
              onClick={platform.action}
              className={`p-2 rounded-full border border-gray-200 ${platform.color} ${platform.hoverColor} transition-colors hover:bg-gray-50`}
              aria-label={`Share on ${platform.name}`}
              title={`Share on ${platform.name}`}
            >
              <IconComponent className="w-4 h-4" />
            </button>
          );
        })}
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full border border-gray-200 text-gray-600 hover:text-gray-700 transition-colors hover:bg-gray-50"
          aria-label={copied ? "Copied!" : "Copy link"}
          title={copied ? "Copied!" : "Copy link"}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default SocialShare;