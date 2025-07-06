import {
	type ColumnDef,
	ColumnMeta,
	flexRender,
	getCoreRowModel,
	type RowData,
	useReactTable,
} from '@tanstack/react-table';
import type {ReactNode} from 'react';
import {Table} from '@/components/Table';
import {Icon} from '@/components/Icon';
import {ArrowDownNarrowWide, ArrowDownWideNarrow} from 'lucide-react';
import clsx from '@/lib/clsx';
import {LoadingIcon} from '@/components/Loading';

declare module '@tanstack/react-table' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ColumnMeta<TData extends RowData, TValue> {
		className?: string;
		headClassName?: string;
		bodyClassName?: string;
	}
}

type ColumnCommonProps = {
	title?: string;
	fill?: boolean;
};

export type DataTableColumn<Data> =
	| {
			[K in keyof Data]: {
				type?: 'accessor';
				id?: string;
				data: K;
				render?: (value: Data[K], row: Data) => ReactNode;
			} & (ColumnCommonProps & ColumnMeta<Data, Data[K]>);
	  }[keyof Data]
	| ({
			type: 'display';
			id: string;
			render: (row: Data) => ReactNode;
	  } & (ColumnCommonProps & ColumnMeta<Data, never>));
export type DataTableProps<Data> = {
	data: Data[] | undefined;
	columns: DataTableColumn<Data>[];
	isLoading?: boolean;
};

export const DataTable = <Data extends object>({data = [], columns, isLoading}: DataTableProps<Data>) => {
	const table = useReactTable({
		data,
		columns: columns.map((column): ColumnDef<Data> => {
			switch (column.type) {
				case 'display': {
					const {id, title, render, fill, ...meta} = column;
					return {
						id,
						header: title ?? id,
						cell: ({row}) => render(row.original),
						meta: {
							...meta,
							className: clsx(
								fill === true ? 'w-full' : fill === false ? 'w-px' : undefined,
								meta.className,
							),
						},
					};
				}

				default: {
					const {id, title, render, data, fill, ...meta} = column;
					return {
						id,
						header: String(title ?? data ?? id),
						accessorKey: data,
						cell: ({getValue, row}) =>
							render ? render(getValue() as Data[keyof Data], row.original) : getValue(),
						meta: {
							...meta,
							className: clsx(
								fill === true ? 'w-full' : fill === false ? 'w-px' : undefined,
								meta.className,
							),
						},
					};
				}
			}
		}),
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Table>
			<Table.Head>
				{table.getHeaderGroups().map((headerGroup) => (
					<Table.HeadRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<Table.Head.Cell
									key={header.id}
									colSpan={header.colSpan}
									className={clsx(
										header.column.id === 'actions' && 'whitespace-nowrap w-px text-center',
										header.column.columnDef.meta?.className,
										header.column.columnDef.meta?.bodyClassName,
										header.column.getCanSort() && 'cursor-pointer select-none',
									)}
									onClick={header.column.getToggleSortingHandler()}>
									{header.isPlaceholder ? null : (
										<>
											{flexRender(header.column.columnDef.header, header.getContext())}
											{header.column.getIsSorted() && (
												<>
													<Icon
														icon={
															header.column.getIsSorted() === 'asc'
																? ArrowDownNarrowWide
																: ArrowDownWideNarrow
														}
														className="inline size-4 ml-1"
													/>
												</>
											)}
										</>
									)}
								</Table.Head.Cell>
							);
						})}
					</Table.HeadRow>
				))}
			</Table.Head>
			<Table.Body>
				{isLoading ? (
					<Table.Row>
						<Table.Cell colSpan={table.getAllColumns().length}>
							<LoadingIcon className="mx-auto" />
						</Table.Cell>
					</Table.Row>
				) : !table.getRowModel().rows.length ? (
					<Table.Row>
						<Table.Cell className="text-center" colSpan={table.getAllColumns().length}>
							No results found
						</Table.Cell>
					</Table.Row>
				) : (
					table
						.getRowModel()
						.rows.slice(0, 10)
						.map((row) => {
							return (
								<Table.Row key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<Table.Cell
												key={cell.id}
												className={clsx(
													cell.column.columnDef.meta?.className,
													cell.column.columnDef.meta?.bodyClassName,
													cell.column.id === 'actions' &&
														'whitespace-nowrap w-px text-center space-x-2',
												)}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</Table.Cell>
										);
									})}
								</Table.Row>
							);
						})
				)}
			</Table.Body>
		</Table>
	);
};
