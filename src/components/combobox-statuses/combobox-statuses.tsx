'use client'
import * as React from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '../ui/badge'
import { useStatuses } from '@/hooks/use-statuses'
import { getStatusName } from '@/lib/utils'

export function ComboBoxResponsiveStatus({ statusValue }: any) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [selectedStatus, setSelectedStatus] = React.useState(() => statusValue)
  const { statuses, createStatus } = useStatuses()

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="border-none bg-transparent w-fit p-0 ">
          <Badge
            variant="secondary"
            className={`w-fit ${
              getStatusName(selectedStatus) === 'todo' &&
              'bg-zinc-200/50 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-900/50'
            } ${
              getStatusName(selectedStatus) === 'pending' &&
              'bg-amber-200/50 text-amber-800 dark:text-amber-200 dark:bg-amber-950/50'
            } ${
              getStatusName(selectedStatus) === 'done' &&
              'bg-emerald-200/50 text-emerald-800 dark:text-emerald-200 dark:bg-emerald-950/50'
            }`}
          >
            {getStatusName(selectedStatus) ? (
              <>{getStatusName(selectedStatus)}</>
            ) : (
              <>+ Set status</>
            )}
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="border-none bg-transparent w-fit p-0 ">
        <Badge
          variant="secondary"
          className={`w-fit ${
            getStatusName(selectedStatus) === 'todo' &&
            'bg-zinc-200/50 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-900/50'
          } ${
            getStatusName(selectedStatus) === 'pending' &&
            'bg-amber-200/50 text-amber-800 dark:text-amber-200 dark:bg-amber-950/50'
          } ${
            getStatusName(selectedStatus) === 'done' &&
            'bg-emerald-200/50 text-emerald-800 dark:text-emerald-200 dark:bg-emerald-950/50'
          }`}
        >
          {getStatusName(selectedStatus) ? (
            <>{getStatusName(selectedStatus)}</>
          ) : (
            <>+ Set status</>
          )}
        </Badge>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (statusId: number | null) => void
}) {
  const { statuses, createStatus } = useStatuses()
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.id}
              value={status.name}
              defaultValue={status.name}
              onSelect={(value) => {
                const selectedStatus = statuses.find(
                  (status) => status.name === value,
                )
                setSelectedStatus(selectedStatus ? selectedStatus.id : null)
                setOpen(false)
              }}
            >
              <Badge
                variant="secondary"
                className={`w-fit ${
                  status.name === 'todo' &&
                  'bg-zinc-200/50 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-900/50'
                } ${
                  status.name === 'pending' &&
                  'bg-amber-200/50 text-amber-800 dark:text-amber-200 dark:bg-amber-950/50'
                } ${
                  status.name === 'done' &&
                  'bg-emerald-200/50 text-emerald-800 dark:text-emerald-200 dark:bg-emerald-950/50'
                }`}
              >
                {status.name}
              </Badge>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
