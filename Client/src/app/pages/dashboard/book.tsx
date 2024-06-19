import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import BooksTable from "../books/Books";

function Employee() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold">Books</h1>
      <div className="py-6 ">
        <div className="py-4 flex float-right">
          <Button onClick={open}>Create Book</Button>
        </div>
        <BooksTable />
      </div>
    
    </div>
  );
}

export default Employee;
