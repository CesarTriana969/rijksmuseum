import LoginForm from '@/app/ui/login-form';
import { lusitana } from '@/app/ui/fonts';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-gray-50 p-3 md:h-[auto]">

          <div className="text-gray-900">

            <h1 className={`${lusitana.className} mb-3 text-2xl`}>Welcome! Enter your email and password to continue</h1>
            <h2 className='text-center mb-3 text-lg font-medium'>Test data</h2>

            <ul className='flex flex-col gap-1'>
              <li><span className='font-medium'>Email:</span> user@test.com</li>
              <li><span className='font-medium'>Password:</span> 123456</li>
            </ul>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}