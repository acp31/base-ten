"use client";

const TableHeaders = ({ headers }: { headers: string[] }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, idx) => {
          return <th key={`${idx}_${header}`}>{header}</th>;
        })}
      </tr>
    </thead>
  );
};

export default TableHeaders;
