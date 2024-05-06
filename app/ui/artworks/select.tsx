'use client'

import AsyncSelect from 'react-select/async';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { fetchAuthorData } from '@/app/lib/data';


export interface AuthorOption {
  id: string;
  name: string;
}

export interface AuthorOptionFormat {
  value: string;
  label: string;
}

export const authorOptions: AuthorOption[] = [
  { id: 'Printshop', name: 'Printshop' },
  { id: 'Hendrick Goltzius', name: 'Hendrick Goltzius' },
  { id: 'Marius Bauer', name: 'Marius Bauer' },
  { id: 'Franse kroon', name: 'Franse kroon' },
  { id: 'Philips Galle', name: 'Philips Galle' },
  { id: 'Antonio Tempesta', name: 'Antonio Tempesta' },
  { id: 'Isaac Israels', name: 'Isaac Israels' },
  { id: 'Johannes Tavenraat', name: 'Johannes Tavenraat' },
  { id: 'Willem Witsen', name: 'Willem Witsen' },
  { id: 'Peter Paul Rubens', name: 'Peter Paul Rubens' },
  { id: 'Pieter Schenk (I)', name: 'Pieter Schenk (I)' },
];



const filterAuthors = (inputValue: string) => {

  const labeledOptions = authorOptions.map(option => ({
    value: option.id,
    label: option.name
  }));

  const options = labeledOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
  console.log(options)

  return options;
};

const promiseOptions = (inputValue: string) =>
  new Promise<AuthorOptionFormat[]>((resolve) => {
    setTimeout(() => {
      resolve(filterAuthors(inputValue));
    }, 1000);
  });



const WAIT_BETWEEN_CHANGE = 300;

export default function AuthorSelect({ placeholder }: { placeholder: string }) {


  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams((searchParams?? '').toString());
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`)
  }, WAIT_BETWEEN_CHANGE)


  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      placeholder={placeholder}
      onChange={(selectedOption) => {
        handleSearch(selectedOption?.value ?? '');
      }}
    />
  )
};

