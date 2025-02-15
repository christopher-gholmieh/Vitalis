// Written by: Christopher Gholmieh
// Client:
"use client"

// Imports:

// Components:
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Lucide:
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

// Table:
import { ColumnDef } from "@tanstack/react-table";


// Patient:
export type Patient = {
    /* Email: */
    email: string,
    
    /* Status: */
    status: string,
    
    /* Name: */
    name: string,
    
    /* ID: */
    id: string,
}


// Columns:
export const columns: ColumnDef<Patient>[] = [
    /* Name: */
    {
        /* Key: */
        accessorKey: "name",
        
        /* Header: */
        header: "Name"
    },
    
    /* Email: */
    {
        /* Key: */
        accessorKey: "email",
        
        /* Header: */
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    
    /* Status: */
    {
        /* Key: */
        accessorKey: "status",
        
        /* Header: */
        header: "Status"
    },

    /* Actions: */
    {
        /* ID: */
        id: "actions",
        
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    {/* Trigger: */}
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>

                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    {/* Content: */}
                    <DropdownMenuContent align="end">
                        {/* Label: */}
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        {/* Separator: */}
                        <DropdownMenuSeparator />

                        {/* Items: */}
                        <DropdownMenuItem>Diagnose</DropdownMenuItem>
                        <DropdownMenuItem>Contact</DropdownMenuItem>
                        <DropdownMenuItem>Request</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },

    /* Select: */
    {
        /* Identifier: */
        id: "select",

        /* Header: */
        header: ({ table }) => (
            /* Checkbox: */
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }

                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),

        /* Cell: */
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),

        /* Sorting: */
        enableSorting: false,

        /* Hiding: */
        enableHiding: false,
    },
];