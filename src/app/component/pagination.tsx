import React, { FC } from "react";
import { PaginationResult } from "../httpClient/service";
import { Pagination } from "flowbite-react";

export interface Props {
  pagination: PaginationResult | null;
  onPageChange: (page: number) => void;
}

export const TablePagination: FC<Props> = ({ pagination, onPageChange }) => {
  if (pagination && pagination.total > pagination.pageSize) {
    return (
      <div className="flex overflow-x-auto justify-end">
        <Pagination
          currentPage={pagination.page}
          totalPages={Math.ceil(pagination.total / pagination.pageSize)}
          onPageChange={onPageChange}
        />
      </div>
    );
  }
};
