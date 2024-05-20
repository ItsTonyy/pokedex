import { PokemonStatsSheetType } from '@/types/types';
import { Progress } from '@/components/ui/progress';

const PokemonStatsSheet: React.FC<PokemonStatsSheetType> = ({
	mainType,
	hp,
	attack,
	defense,
	spAttack,
	spDefense,
	speed,
}) => {
	const textColorTernary =
    mainType === 'grass'
      ? 'text-type-grass'
      : mainType === 'dark'
      ? 'text-type-dark'
      : mainType === 'dragon'
      ? 'text-type-dragon'
      : mainType === 'fairy'
      ? 'text-type-fairy'
      : mainType === 'fighting'
      ? 'text-type-fighting'
      : mainType === 'fire'
      ? 'text-type-fire'
      : mainType === 'ghost'
      ? 'text-type-ghost'
      : mainType === 'bug'
      ? 'text-type-bug'
      : mainType === 'ground'
      ? 'text-type-ground'
      : mainType === 'normal'
      ? 'text-type-normal'
      : mainType === 'poison'
      ? 'text-type-poison'
      : mainType === 'psychic'
      ? 'text-type-psychic'
      : mainType === 'steel'
      ? 'text-type-steel'
      : mainType === 'water'
      ? 'text-type-water'
      : mainType === 'electric'
      ? 'text-type-electric'
      : mainType === 'flying'
      ? 'text-type-flying'
      : mainType === 'ice'
      ? 'text-type-ice'
      : 'text-type-rock';

	return (
		<div className='space-y-3 flex flex-col'>
			<h2 className={`font-medium text-xl mb-2 ${textColorTernary}`}>Base Stats</h2>

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

export default PokemonStatsSheet;
