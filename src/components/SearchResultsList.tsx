import { pokemonStringUrl } from '@/types/types';

export const SearchResultsList = ({ results }) => {
  return (
    <div
      className='flex flex-col bg-zinc-100 dark:bg-neutral-900 border border-zinc-600 dark:border-zinc-400  w-full
     absolute z-10 rounded-lg -mt-3 max-h-80 overflow-y-auto'
    >
      {results.map((result: pokemonStringUrl) => (
        <div className='border-zinc-600 dark:border-zinc-400 border-b-[1px] last:border-none hover:bg-zinc-200 dark:hover:bg-neutral-950'>
          <div className='text-lg font-light py-2 px-6 capitalize'>{result?.name}</div>
        </div>
      ))}
    </div>
  );
};
