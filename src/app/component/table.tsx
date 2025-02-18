import { Table } from "flowbite-react";
import React, { FC, ReactNode } from "react";

interface Header {
  key: string;
  label: string;
  formater: (cellValue: any) => string | ReactNode;
}

export interface Props {
  headers: Header[];
  data: any[];
}
export const TableCard: FC<Props> = ({ headers, data }) => {
  return (
    <Table hoverable>
      <Table.Head>
        {headers.map((header) => {
          return (
            <Table.HeadCell className="" key={header.key}>
              {/* <a href="#"> */}
              <span className="flex items-center">
                {header.label}
                {/* <svg
                    className="w-3 h-3 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg> do later */}
              </span>
              {/* </a> */}
            </Table.HeadCell>
          );
        })}
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((row, index) => (
          <Table.Row key={index}>
            {headers.map((header) => (
              <Table.Cell key={header.key}>{header.formater(row)}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
