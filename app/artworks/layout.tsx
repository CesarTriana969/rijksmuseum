import { Metadata } from 'next';
import Header from "../ui/artworks/header";
import SideNav from "../ui/artworks/sidenav";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Artworks by Rijksmuseum',
};

export default function layout(
  { children } : {children:React.ReactNode}
){
  return(
    <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">

      <Header />

      <div className="w-full flex-none md:w-64 mt-[80px]">
        <SideNav />
      </div>
      
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 mt-[80px]">
        {children}
      </div>

      <Toaster />

    </div>
  )
}