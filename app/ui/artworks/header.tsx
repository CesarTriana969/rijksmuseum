import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function HeaderComponent() {
  return (

    <header className=" border-gray-200 py-0 rounded px-7 fixed w-full z-[100] bg-gray-50 flex flex-wrap justify-end items-center mx-auto mt-0 min-h-[80px]">

      <div className="w-full md:block md:w-auto">
        <ul
          className="flex flex-col  mt-10 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0"
        >
          <li>
            <div className="relative inline-block text-left">
              <div>
                <form
                  action={async () => {
                    'use server';
                    await signOut();
                  }}
                >
                  <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <PowerIcon className="w-6" />
                    <div className="block">Sign Out</div>
                  </button>
                </form>
              </div>
            </div>
          </li>
        </ul>
      </div >
    </header >

  );
}
