import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className='bg-text-primary text-white py-16 px-5 md:px-8 lg:px-20'>
      <div className='max-w-[600px] mx-auto text-center'>
        {/* Wordmark */}
        <h3 className='font-display font-bold text-[32px] text-white mb-2'>
          Twogether
        </h3>
        <p className='font-body font-normal text-sm text-bg-primary mb-6'>
          Questions that bring people closer.
        </p>

        {/* Links */}
        <div className='flex items-center justify-center gap-8 mb-8'>
          <a
            href='/privacy'
            className='font-body font-medium text-sm text-bg-primary hover:text-white transition-colors duration-200'
          >
            Privacy
          </a>
          <a
            href='/terms-of-service'
            className='font-body font-medium text-sm text-bg-primary hover:text-white transition-colors duration-200'
          >
            Terms Of Service
          </a>
          <a
            href='/contact'
            className='font-body font-medium text-sm text-bg-primary hover:text-white transition-colors duration-200'
          >
            Contact
          </a>
        </div>

        {/* Divider */}
        <div className='border-t border-[#333333] pt-6 flex items-center justify-between'>
          <span className='font-body font-normal text-xs text-bg-primary'>
            &copy; 2026 Twogether
          </span>
          <a
            href='mailto:zerotoproduct@proton.me'
            className='text-bg-primary hover:text-white transition-colors duration-200'
          >
            <Mail className='w-[18px] h-[18px]' />
          </a>
        </div>
      </div>
    </footer>
  );
}
