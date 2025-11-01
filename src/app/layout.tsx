import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Fridge Feast',
  description: 'Generate recipes from ingredients you have.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style>{`
          /* AGGRESSIVE N SIGN HIDING */
          #__next-build-watcher,
          [data-nextjs-dialog-overlay],
          [data-nextjs-toast],
          [data-nextjs-dialog],
          [data-nextjs-overlay],
          div[style*="position: fixed"],
          div[style*="bottom"],
          div[style*="left"],
          div[style*="z-index: 9999"],
          div[style*="z-index: 99999"],
          div[style*="bottom: 0"],
          div[style*="left: 0"],
          div[style*="bottom: 0px"],
          div[style*="left: 0px"],
          div[style*="position: fixed"][style*="bottom"],
          div[style*="position: fixed"][style*="left"],
          div[style*="position: fixed"][style*="z-index"],
          div[style*="position: fixed"][style*="bottom: 0"],
          div[style*="position: fixed"][style*="left: 0"],
          div[style*="position: fixed"][style*="bottom: 0px"],
          div[style*="position: fixed"][style*="left: 0px"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            left: -9999px !important;
            top: -9999px !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
          }
          
          /* Hide any element in bottom-left corner */
          div[style*="position: fixed"][style*="bottom"][style*="left"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            left: -9999px !important;
            top: -9999px !important;
          }
        `}</style>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Force hide N sign with JavaScript
            function hideNSign() {
              const selectors = [
                '#__next-build-watcher',
                '[data-nextjs-dialog-overlay]',
                '[data-nextjs-toast]',
                '[data-nextjs-dialog]',
                '[data-nextjs-overlay]'
              ];
              
              selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                  el.style.display = 'none';
                  el.style.visibility = 'hidden';
                  el.style.opacity = '0';
                  el.style.pointerEvents = 'none';
                  el.style.position = 'absolute';
                  el.style.left = '-9999px';
                  el.style.top = '-9999px';
                });
              });
              
              // Hide any fixed positioned elements in bottom-left
              const allDivs = document.querySelectorAll('div');
              allDivs.forEach(div => {
                const style = div.style;
                if (style.position === 'fixed' && 
                    (style.bottom === '0px' || style.bottom === '0' || style.bottom.includes('0')) &&
                    (style.left === '0px' || style.left === '0' || style.left.includes('0'))) {
                  div.style.display = 'none';
                  div.style.visibility = 'hidden';
                  div.style.opacity = '0';
                  div.style.pointerEvents = 'none';
                }
              });
            }
            
            // Run immediately and on DOM changes
            hideNSign();
            document.addEventListener('DOMContentLoaded', hideNSign);
            setInterval(hideNSign, 1000);
          `
        }} />
      </head>
      <body className="font-body antialiased subpixel-antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
