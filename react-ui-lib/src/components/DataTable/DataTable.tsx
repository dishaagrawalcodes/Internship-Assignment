import React, { useState, useId } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  caption?: string;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
  caption,
  striped = false,
  hoverable = true,
  compact = false,
  emptyMessage = "No data available",
  loadingMessage = "Loading...",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());
  const tableId = useId();

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const column = columns.find(col => col.key === sortKey);
        if (!column) return 0;

        const valA = a[column.dataIndex];
        const valB = b[column.dataIndex];

        // Handle different data types
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      })
    : data;

  const toggleRow = (id: string | number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
    onRowSelect?.(data.filter((row) => newSelected.has(row.id)));
  };

  const toggleAllRows = () => {
    if (selected.size === data.length) {
      setSelected(new Set());
      onRowSelect?.([]);
    } else {
      const allIds = new Set(data.map(row => row.id));
      setSelected(allIds);
      onRowSelect?.(data);
    }
  };

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    if (sortKey === column.key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(column.key);
      setSortAsc(true);
    }
  };

  const getAlignmentClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center": return "text-center";
      case "right": return "text-right";
      default: return "text-left";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8" role="status" aria-live="polite">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-500 mr-3"></div>
        <span className="text-gray-600">{loadingMessage}</span>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center p-8 text-gray-500" role="status">
        <div className="text-4xl mb-2">📄</div>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table
        id={tableId}
        className={`w-full border border-gray-300 rounded-lg shadow-sm ${
          compact ? "text-sm" : ""
        }`}
        role="table"
        aria-label={caption || "Data table"}
      >
        {caption && (
          <caption className="text-left text-gray-700 font-medium mb-2 px-1">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {selectable && (
              <th
                className={`${compact ? "p-2" : "p-3"} w-12`}
                scope="col"
              >
                <input
                  type="checkbox"
                  checked={selected.size === data.length && data.length > 0}
                  onChange={toggleAllRows}
                  aria-label="Select all rows"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`${compact ? "p-2" : "p-3"} font-medium text-gray-900 ${getAlignmentClass(col.align)} ${
                  col.sortable ? "cursor-pointer hover:bg-gray-100 transition-colors" : ""
                }`}
                style={{ width: col.width }}
                scope="col"
                onClick={() => handleSort(col)}
                onKeyDown={(e) => {
                  if (col.sortable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleSort(col);
                  }
                }}
                tabIndex={col.sortable ? 0 : undefined}
                role={col.sortable ? "button" : undefined}
                aria-sort={
                  sortKey === col.key
                    ? (sortAsc ? "ascending" : "descending")
                    : col.sortable ? "none" : undefined
                }
              >
                <div className="flex items-center gap-1">
                  {col.title}
                  {col.sortable && (
                    <span className="text-gray-400">
                      {sortKey === col.key ? (sortAsc ? "↑" : "↓") : "↕"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={row.id}
              className={`border-b border-gray-100 last:border-b-0 ${
                striped && index % 2 === 1 ? "bg-gray-25" : ""
              } ${
                hoverable ? "hover:bg-gray-50 transition-colors" : ""
              }`}
            >
              {selectable && (
                <td className={`${compact ? "p-2" : "p-3"}`}>
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    aria-label={`Select row ${index + 1}`}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`${compact ? "p-2" : "p-3"} text-gray-900 ${getAlignmentClass(col.align)}`}
                  style={{ width: col.width }}
                >
                  {col.render
                    ? col.render(row[col.dataIndex], row, index)
                    : String(row[col.dataIndex] || "")
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
