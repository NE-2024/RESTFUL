import {
  Button,
  Checkbox,
  Input,
  Table,
  TableProps,
  Pagination,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { GoPlus } from "react-icons/go";
import {
  CellContext,
  Column,
  IPagination,
  RowContext,
  TableContext,
} from "./types";
import { getObjValue } from "@/app/utils/funcs";

export interface DataTableProps {
  data: any[];
  columns: Column[];
  tableHeader?: (tableContext: TableContext) => React.ReactNode;
  pagination?: IPagination;
  title?: string | React.ReactNode;
  buttonText?: string | React.ReactNode;
  showHeader?: boolean;
  minWidth?: React.CSSProperties["minWidth"];
  tableProps?: TableProps;
  onPress?: () => void;
  onPageChange?: (page: number) => void; // Added to handle page change
}

const DataTable = (props: DataTableProps) => {
  const {
    data,
    columns,
    tableHeader,
    pagination,
    title,
    showHeader = true,
    minWidth,
    tableProps,
    buttonText,
    onPress,
    onPageChange,
  } = props;

  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState<RowContext[]>([]);
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage || 1);
  const [pageSize, setPageSize] = useState(10); // Default page size

  const toggleRow = (row: RowContext) => {
    const selectedRow = selectedRows.find(
      (r) => JSON.stringify(r.data) === JSON.stringify(row.data)
    );
    if (selectedRow) {
      setSelectedRows(
        selectedRows.filter(
          (r) => JSON.stringify(r.data) !== JSON.stringify(row.data)
        )
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const toggleAllRows = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => ({ data: row, isSelected: true })));
    }
  };

  const getSelectedRows = () => selectedRows.map((r) => r.data);

  const filteredData = data.filter((row) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(globalFilter.toLowerCase());
    });
  });

  const tableContext: TableContext = {
    setGlobalFilter,
    globalFilter,
    data,
    getSelectedRows,
  };

  const filteredColumns = columns.filter((col) => !col.omit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  useEffect(() => {
    if (pagination && pagination.currentPage !== currentPage) {
      setCurrentPage(pagination.currentPage);
    }
  }, [pagination]);

  const pageCount = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full bg-white overflow-hidden p-6 rounded-xl flex flex-col gap-4">
      {showHeader &&
        (tableHeader ? (
          tableHeader(tableContext)
        ) : (
          <div className="flex w-full items-center justify-between">
            <div className="flex">
              {typeof title === "string" ? (
                <h1 className="font-bold text-2xl">{title}</h1>
              ) : (
                title
              )}
            </div>
            <div className="flex gap-x-4">
              {typeof buttonText === "string" ? (
                <Button
                  leftSection={<GoPlus />}
                  variant="filled"
                  onClick={onPress}
                >
                  {buttonText}
                </Button>
              ) : (
                buttonText
              )}
              <Input
                type="text"
                placeholder="Search ..."
                className="w-fit"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
          </div>
        ))}
      <div className="flex w-full pb-5 flex-col sm:overflow-x-scroll md:overflow-x-scroll xs:overflow-x-scroll lg:overflow-hidden">
        <Table
          style={{ minWidth: minWidth ?? "" }}
          className="w-full"
          {...tableProps}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="w-6" align="center">
                <Checkbox
                  size="sm"
                  type="checkbox"
                  onChange={toggleAllRows}
                  checked={selectedRows.length === paginatedData.length}
                />
              </Table.Th>
              {filteredColumns.map((column, i) => (
                <Table.Th
                  align={column.align}
                  className="text-primary font-bold"
                  key={(column.key, i)}
                >
                  {typeof column.header === "function"
                    ? column.header(tableContext)
                    : column.header}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedData.map((row, rowIndex) => (
              <Table.Tr key={rowIndex}>
                <Table.Td align="center">
                  <Checkbox
                    size="sm"
                    type="checkbox"
                    checked={selectedRows.some(
                      (r) => JSON.stringify(r.data) === JSON.stringify(row)
                    )}
                    onChange={() => toggleRow({ data: row, isSelected: false })}
                  />
                </Table.Td>
                {columns.map((column, columnIndex) => {
                  const value = column.getValue
                    ? column.getValue(row)
                    : getObjValue(column.key, row);
                  const cellContext: CellContext = {
                    value,
                    row: {
                      data: row,
                      isSelected: selectedRows.some(
                        (r) => JSON.stringify(r.data) === JSON.stringify(row)
                      ),
                    },
                    table: tableContext,
                  };
                  return (
                    <Table.Td
                      key={columnIndex}
                      align={column.align}
                      style={{ textAlign: column.align }}
                    >
                      {column.cell ? column.cell(cellContext) : value}
                    </Table.Td>
                  );
                })}
              </Table.Tr>
            ))}
            {paginatedData.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={columns.length + 1}>No data found</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </div>
     
        <Pagination
          total={filteredData.length%5}
          value={currentPage}
          
          onChange={setCurrentPage}
          color="#354545"
          
        />
      
    </div>
  );
};

export default DataTable;
