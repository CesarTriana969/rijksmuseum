import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Carousel from '@/app/ui/home/carousel';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">

      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center items-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-full md:px-20">

          <Carousel/>

          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base mx-auto my-0"
          >
            <span>Enjoy Us</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>

        </div>

      </div>
    </main>
  );
}
