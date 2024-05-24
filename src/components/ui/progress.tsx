import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    fill?: `background-light-type-${string}` | `background-type-${string}` | `bg-background-light-type-${string}` | `bg-background-type-${string}`;
  }
>(({ className, value, fill = 'primary', ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-2 w-full overflow-hidden rounded-full bg-neutral-300/50', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={`h-full w-full flex-1 bg-${fill} transition-all`}
      style={{ transform: `translateX(-${100 - ((value || 0) / (255 || 100)) * 100}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
