'use client';

import { useSocialMedia } from '@/lib/hooks';

export default function Footer() {
  const { socialData, loading, error } = useSocialMedia();

  // Fungsi untuk mendapatkan SVG icon berdasarkan nama platform
  const getIcon = (platformName: string) => {
    const iconClass = "h-6 w-6";

    switch (platformName.toLowerCase()) {
      case 'instagram':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        );
      case 'twitter':
      case 'x':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61782L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
          </svg>
        );
      case 'tiktok':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.03-2.9.71-.58.58-.9 1.4-.86 2.28.03.74.47 1.41 1.06 1.74 1.07.6 2.31.53 3.29-.09.8-.51 1.27-1.34 1.37-2.25.08-.74.13-1.49.14-2.24.09-1.99-.08-3.99-.08-5.98v-.01c-.01-1.83-.04-3.66 0-5.49.01-.58-.18-1.15-.55-1.63-.68-1.04-1.89-1.65-3.12-1.7-1.23-.05-2.48.42-3.43 1.25C1.29 4.29.36 6.11.17 8.01.1 8.51.08 9.02.07 9.52c-.08 1.4.25 2.81.94 4.01.83 1.45 2.2 2.54 3.79 2.91 1.33.31 2.76.05 3.95-.65 1.24-.71 2.13-1.89 2.48-3.21.01-1.45.06-2.91.05-4.36-.01-1.69-.01-3.38-.01-5.07z"/>
          </svg>
        );
      default:
        // Default icon if platform is not recognized
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // Fungsi untuk mendapatkan warna hover berdasarkan nama platform
  const getHoverColor = (platformName: string) => {
    switch (platformName.toLowerCase()) {
      case 'instagram':
        return 'hover:text-purple-400';
      case 'facebook':
        return 'hover:text-blue-400';
      case 'twitter':
      case 'x':
        return 'hover:text-blue-300';
      case 'tiktok':
        return 'hover:text-pink-500';
      default:
        return 'hover:text-gray-300';
    }
  };

  if (error) {
    console.error('Error loading social links:', error);
  }

  return (
    <footer className="bg-black/50 border-t border-purple-500/20 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">&copy; 2019 KangFoto. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            {loading ? (
              <p className="text-gray-400">Loading social links...</p>
            ) : error ? (
              <p className="text-red-400">Error loading social links</p>
            ) : (
              <>
                <a
                  href={socialData.facebook}
                  target={socialData.facebook !== '#' ? '_blank' : '_self'}
                  rel={socialData.facebook !== '#' ? 'noopener noreferrer' : ''}
                  className={`text-gray-400 transition-colors duration-300 ${getHoverColor('facebook')}`}
                >
                  <span className="sr-only">Facebook</span>
                  {getIcon('facebook')}
                </a>
                <a
                  href={socialData.instagram}
                  target={socialData.instagram !== '#' ? '_blank' : '_self'}
                  rel={socialData.instagram !== '#' ? 'noopener noreferrer' : ''}
                  className={`text-gray-400 transition-colors duration-300 ${getHoverColor('instagram')}`}
                >
                  <span className="sr-only">Instagram</span>
                  {getIcon('instagram')}
                </a>
                <a
                  href={socialData.tiktok}
                  target={socialData.tiktok !== '#' ? '_blank' : '_self'}
                  rel={socialData.tiktok !== '#' ? 'noopener noreferrer' : ''}
                  className={`text-gray-400 transition-colors duration-300 ${getHoverColor('tiktok')}`}
                >
                  <span className="sr-only">TikTok</span>
                  {getIcon('tiktok')}
                </a>
                <a
                  href={socialData.twitter}
                  target={socialData.twitter !== '#' ? '_blank' : '_self'}
                  rel={socialData.twitter !== '#' ? 'noopener noreferrer' : ''}
                  className={`text-gray-400 transition-colors duration-300 ${getHoverColor('twitter')}`}
                >
                  <span className="sr-only">Twitter</span>
                  {getIcon('twitter')}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}