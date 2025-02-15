// Written by: Christopher Gholmieh
// Client:
"use client"

// Components:
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Table:
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table";

// React:
import { useState as use_state } from "react";


// Types:
interface DataTableProps<TData, TValue> {
    /* Columns: */
    columns: ColumnDef<TData, TValue>[];

    /* Data: */
    data: TData[];
}

// Table:
export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    // Variables (Assignment):
    // Sorting:
    const [ sorting, set_sorting ] = use_state<SortingState>([]);

    // Filters:
    const [ column_filters, set_column_filters ] = use_state<ColumnFiltersState>([]);

    // Visibility:
    const [ column_visibility, set_column_visibility ] = use_state<VisibilityState>({});

    // Selection:
    const [ row_selection, set_row_selection] = use_state({});

    // Configuration:
    const table = useReactTable({
        /* Data: */
        data,

        /* Columns: */
        columns,

        /* Model: */
        getCoreRowModel: getCoreRowModel(),

        /* Model: */
        getPaginationRowModel: getPaginationRowModel(),

        /* Model: */
        getSortedRowModel: getSortedRowModel(),

        /* Filters: */
        onColumnFiltersChange: set_column_filters,

        /* Model: */
        getFilteredRowModel: getFilteredRowModel(),

        /* Visibility: */
        onColumnVisibilityChange: set_column_visibility,

        /* Selection: */
        onRowSelectionChange: set_row_selection,

        /* State: */
        state: {
            /* Sorting: */
            sorting,

            /* Filters: */
            columnFilters: column_filters,

            /* Visibility: */
            columnVisibility: column_visibility,

            /* Selection: */
            rowSelection: row_selection,
        },
    });

    
    // Logic:
    return (
        <div>
            {/* Controls: */}
            <div className="flex items-center py-4">
                {/* Filter: */}
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
                    className="max-w-sm bg-white"
                />

                {/* Dropdown: */}
                <DropdownMenu>
                    {/* Trigger: */}
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">Columns</Button>
                    </DropdownMenuTrigger>

                    {/* Content: */}
                    <DropdownMenuContent align="end">
                        {table.getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table: */}
            <div className="rounded-md border bg-white overflow-hidden">
                <Table className="rounded-md">
                    {/* Header: */}
                    <TableHeader className="bg-white rounded-md">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="rounded-md">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    {/* Body: */}
                    <TableBody className="bg-white rounded-md overflow-hidden">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="rounded-md">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="rounded-md">
                                <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination: */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </div>
    );
}