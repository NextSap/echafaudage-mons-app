"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {MoreHorizontal} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {TicketSchemaType} from "@/prisma/schema/TicketSchema";

const columns: ColumnDef<TicketSchemaType>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: () => <div className="text-left">Email</div>,
        cell: ({row}) => <div
            className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "phoneNumber",
        header: () => <div className="text-left">Téléphone</div>,
        cell: ({row}) => <div
            className="lowercase">{row.getValue("phoneNumber")}</div>,
    },
    {
        accessorKey: "area",
        header: () => <div className="text-left">Surface - m²</div>,
        cell: ({row}) => <div
            className="lowercase">{row.getValue("area")}</div>,
    },
    {
        accessorKey: "sale",
        header: () => <div className="text-left">Vente/Location</div>,
        cell: ({row}) => <div>{row.getValue("sale") ? "Vente" : "Location"}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const ticket: TicketSchemaType = row.original
            const router = useRouter();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => router.push(`/panel/consult/${ticket.id}`)}
                        >
                            Voir le détail
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onClick={() => {
                                window.location.href = `mailto:${ticket.email}`;
                            }}
                        >Envoyer un mail</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

type PanelPageProps = {
    tickets: TicketSchemaType[],
    totalPages: number,
}


export default function PanelPage(props: PanelPageProps) {

    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    const table = useReactTable({
        // I WANT TO sort props.tickets by date descending
        data: props.tickets,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
        state: {
            pagination,
        },
    })

    return (
        <div className="w-full p-5">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Aucun résultat
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-center mt-4">
                <div className="flex justify-center gap-10">
                    {props.totalPages !== 0 &&
                        <div className="flex justify-center items-center gap-3 p-5">
                            <Button className="w-20" onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}>Précédent</Button>
                            <p>{pagination.pageIndex + 1} / {props.totalPages - 1}</p>
                            <Button className="w-20" onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}>Suivant</Button>
                        </div>}
                </div>
            </div>
        </div>
    )
}
