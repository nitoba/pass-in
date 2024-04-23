import { Search } from 'lucide-react'
import { TableRow } from './table/table-row'
import { TableCell } from './table/table-cell'
import { Skeleton } from './skeleton'

export function AttendeeTableSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-[172px]" />
              <span className="sr-only">código do participante</span>
            </TableCell>

            <TableCell>
              <div className="flex flex-col gap-0.5">
                <Skeleton className="h-5 w-[64px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </TableCell>

            <TableCell className="font-mono text-xs font-medium">
              <Skeleton className="h-4 w-[172px]" />
            </TableCell>

            <TableCell className="text-muted-foreground">
              <Skeleton className="h-4 w-[148px]" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-[92px]" />
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
