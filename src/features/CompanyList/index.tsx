"use client";
import React from "react";
import { Table, ScrollArea } from "@mantine/core";
import { Company } from "@/models";
import LoadingSkeletons from "@/components/Skeletons";
import ListItems from "./components/ListItems";

function CompanyList({
  companies,
  isLoading,
}: {
  companies: Company[];
  isLoading: boolean;
}) {
  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Business Model</th>
            <th>Location</th>
            <th>Industry</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <LoadingSkeletons rows={10} columns={4} />
          ) : (
            <ListItems companies={companies} />
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}

export default CompanyList;
