// DataTableSkeleton.tsx
interface DataTableSkeletonProps {
  /**
   * Number of rows to display
   * @default 5
   */
  rowCount?: number;

  /**
   * Number of columns to display
   * @default 6
   */
  columnCount?: number;

  /**
   * Show filter row skeleton
   * @default true
   */
  showFilters?: boolean;

  /**
   * Show header with title and buttons
   * @default true
   */
  showHeader?: boolean;

  /**
   * Show pagination skeleton
   * @default true
   */
  showPagination?: boolean;
}

export function DataTableSkeleton({
  rowCount = 5,
  columnCount = 6,
  showFilters = true,
  showHeader = true,
  showPagination = true,
}: DataTableSkeletonProps) {
  return (
    <div className="w-full space-y-4">
      {/* Header Skeleton */}
      {showHeader && (
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-muted rounded animate-pulse" />
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-muted rounded animate-pulse" />
            <div className="h-10 w-10 bg-muted rounded animate-pulse" />
          </div>
        </div>
      )}

      {/* Filters Skeleton */}
      {showFilters && (
        <div className="flex items-center gap-4 py-4">
          <div className="h-10 flex-1 max-w-sm bg-muted rounded animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 bg-muted rounded animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Table Skeleton */}
      <div className="rounded-md border">
        {/* Table Header */}
        <div className="border-b bg-muted/50">
          <div className="flex items-center p-4">
            <div className="h-4 w-4 bg-muted rounded animate-pulse mr-3" />
            {Array.from({ length: columnCount }).map((_, i) => (
              <div
                key={i}
                className="h-4 flex-1 bg-muted rounded animate-pulse mx-2"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y">
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center p-4"
              style={{ animationDelay: `${rowIndex * 100}ms` }}
            >
              <div className="h-4 w-4 bg-muted rounded animate-pulse mr-3" />
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="h-4 flex-1 bg-muted rounded animate-pulse mx-2"
                  style={{
                    animationDelay: `${rowIndex * 100 + colIndex * 50}ms`,
                    maxWidth:
                      colIndex === 0
                        ? "150px"
                        : colIndex === 1
                        ? "200px"
                        : colIndex === 2
                        ? "120px"
                        : "auto",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      {showPagination && (
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="h-9 w-20 bg-muted rounded animate-pulse" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-9 bg-muted rounded animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <div className="h-9 w-20 bg-muted rounded animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}
