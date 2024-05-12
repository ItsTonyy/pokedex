import { PokemonStatsSheetType } from '@/types/types';
import { Progress } from '@/components/ui/progress';

export const PokemonStatsSheet: React.FC<PokemonStatsSheetType> = ({
  mainType,
  hp,
  attack,
  defense,
  spAttack,
  spDefense,
  speed,
}) => {
  return (
    <div className='space-y-3 flex flex-col'>
      <h2 className='font-medium text-xl mb-2'>Base Stats</h2>

      <div className='flex flex-row items-center'>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Hp</span>
          <span className='text-zinc-500'>{hp}</span>
        </div>

        <Progress value={hp} className='w-[66%] h-1.5' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Attack</span>
          <span className='text-zinc-500'>{attack}</span>
        </div>

        <Progress value={attack} className='w-[66%] h-1.5' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Defense</span>
          <span className='text-zinc-500'>{defense}</span>
        </div>

        <Progress value={defense} className='w-[66%] h-1.5' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Sp Attack</span>
          <span className='text-zinc-500'>{spAttack}</span>
        </div>

        <Progress value={spAttack} className='w-[66%] h-1.5' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Sp Defense</span>
          <span className='text-zinc-500'>{spDefense}</span>
        </div>

        <Progress value={spDefense} className='w-[66%] h-1.5' fill={`background-type-${mainType}`} />
      </div>
      <div className='flex flex-row justify-between items-center '>
        <div className='flex justify-between items-center w-[33%] mr-4'>
          <span className='text-sm'>Speed</span>
          <span className='text-zinc-500'>{speed}</span>
        </div>

        <Progress value={speed} className='w-[66%] h-1.5' fill={`background-type-${mainType}`} />
      </div>
    </div>
  );
};
