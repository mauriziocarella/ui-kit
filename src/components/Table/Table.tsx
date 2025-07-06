import type {ComponentPropsWithoutRef} from 'react';
import clsx from '@/lib/clsx';

export const Table = ({className, ...props}: ComponentPropsWithoutRef<'table'>) => (
	<table {...props} className={clsx('border-separate border-spacing-0', className)} />
);
export const TableHead = ({className, ...props}: ComponentPropsWithoutRef<'thead'>) => (
	<thead {...props} className={clsx('bg-background-600', className)} />
);
export const TableHeadRow = ({className, ...props}: ComponentPropsWithoutRef<'tr'>) => (
	<tr {...props} className={clsx('group', className)} />
);
export const TableHeadCell = ({className, ...props}: ComponentPropsWithoutRef<'th'>) => (
	<th
		{...props}
		className={clsx(
			'px-4 py-2 text-start border-y first:border-l last:border-r group-first:first:rounded-tl-md group-first:last:rounded-tr-md',
			'font-medium',
			className,
		)}
	/>
);
export const TableBody = ({...props}: ComponentPropsWithoutRef<'tbody'>) => <tbody {...props} />;
export const TableRow = ({className, ...props}: ComponentPropsWithoutRef<'tr'>) => (
	<tr {...props} className={clsx('group', className)} />
);
export const TableCell = ({className, ...props}: ComponentPropsWithoutRef<'td'>) => (
	<td
		{...props}
		className={clsx(
			'px-4 py-2 text-start border-y first:border-l last:border-r group-first:border-t-0 group-last:border-b group-last:first:rounded-bl-md group-last:last:rounded-br-md',
			className,
		)}
	/>
);
export const TableFoot = ({...props}: ComponentPropsWithoutRef<'tfoot'>) => <tfoot {...props} />;

TableHead.Row = TableHeadRow;
TableHead.Cell = TableHeadCell;
Table.Head = TableHead;
Table.HeadRow = TableHeadRow;
Table.HeadCell = TableHeadCell;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Foot = TableFoot;
