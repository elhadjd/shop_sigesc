import Header from '@/app/components/Header'
import { Metadata } from 'next';
import './globals.css'
import { Inter } from 'next/font/google'
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css";
import { RequestCardProvider } from './contexts/cardContrext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StateProgressProvider } from './contexts/progress';
import Footer from './components/footer';
const inter = Inter({ subsets: ['latin'] })
import {neobrutalism} from "@clerk/themes";
import { CheckoutProvider } from './contexts/checkout';
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { ProductsProvider } from './contexts/productsContext';
import { RedirectAfterLoginProvider } from './contexts/redirectAfterLoginContext';
import { ClientProvider } from './contexts/clientContext';

export const metadata: Metadata = {
  title: 'SIGESC SHOP',
  applicationName: "SIGESC-SHOP",
  description: 'Loja online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider localization={ptBR} appearance={{baseTheme:neobrutalism}}>
    <html lang="pt-br">
      <link rel="shortcut icon" href="/logos/favicon.ico" type="image/x-icon" />
      <body className={inter.className}>
        <div className='w-full h-scree flex flex-col relative'>
        <div id="google_translate_element"></div>
          <ToastContainer/>
          <StateProgressProvider>
            <RedirectAfterLoginProvider>
              <ProductsProvider>
                <RequestCardProvider>
                  <ClientProvider>
                    <CheckoutProvider>
                      <Header/>
                      <div className='absolute top-32 w-full flex-auto overflow-y-auto'>
                          {children}
                        <Footer/>
                      </div>
                    </CheckoutProvider>
                  </ClientProvider>
                </RequestCardProvider>
              </ProductsProvider>
            </RedirectAfterLoginProvider>
          </StateProgressProvider>
        </div>
      </body>
    </html>
    </ClerkProvider>
  )
}