import { Metadata } from 'next';
import { montserrat } from './ui/fonts';
import './ui/global.css';

export const metadata: Metadata = {
  title: 'Artwork system by Rijksmuseum',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        {children}

        <footer className='py-10 flex justify-center items-center'>
          Cesar Triana
        </footer>
      </body>
    </html>
  );
}
