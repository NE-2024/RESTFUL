import { useAllBooks } from "@/app/components/api-services/useBooks";
import DataTable from "@/app/components/data-table";
import { Column } from "@/app/components/data-table/types";
import React, { useState, useEffect } from "react";

const BooksTable = () => {
  const [page, setPage] = useState(1);
  const {
    bookData,
    isLoading,
    isError,
  } = useAllBooks(page, 4);

  const columns: Column<any>[] = [
    {
      key: "names",
      header: "Names",
      cell: (cellContext) =>
        `${cellContext.row.data.name}`,
    },
    {
      key: "author",
      header: "Author",
    },
    {
      key: "publisher",
      header: "Publisher",
    },
    {
      key: "publicationYear",
      header: "Publication Year",
    },
    {
      key: "subject",
      header: "Subject",
    }
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="w-full">
      <div className="px-8">
      <h1 className="font-bold text-2xl pt-8">Books available</h1>
      <p className="pt-4">Dear student search for a book you want to read in the Library.</p>
      </div>
    <div className="w-full px-4 py-8">
      <DataTable
        data={bookData ?? []}
        title={"Books"}
        columns={columns}
      />
    </div>
    </div>
  );
};

export default BooksTable;
