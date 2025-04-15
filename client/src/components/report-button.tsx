"use client";
import * as XLSX from "xlsx";
import React from "react";
import { PiMicrosoftExcelLogoLight } from "react-icons/pi";
import { BsFiletypeCsv } from "react-icons/bs";

interface ReportProps {
  tableId: string;
  fileName: string;
  data: any[];
}

export const ReportButton = ({ tableId, fileName, data = [] }: ReportProps) => {
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    let _result = tableToArray(tableId);
    const headers = _result[0]?.filter((item) => !!item);
    _result = _result?.map((item) => {
      const data = item.slice(0, headers?.length);
      return data;
    });
    setResult(_result as any);
  }, [tableId, data]);

  const handleExcelDownload = () => {
    exportArrayToXLSX(result, fileName);
  };

  const handleCSVDownload = () => {
    exportArrayToCSV(result, fileName);
  };

  return (
    <div className="flex gap-3 items-center">
      <div className="font-medium">Export as:</div>{" "}
      <div className="flex gap-1">
        <button
          className="bg-[#1A56DB] px-4 py-2 rounded-l-lg text-white flex items-center gap-2"
          onClick={handleExcelDownload}
        >
          <PiMicrosoftExcelLogoLight className="w-5 h-5" />
          Excel
        </button>

        <button
          className="bg-[#1A56DB] px-4 py-2 rounded-r-lg text-white flex items-center gap-2"
          onClick={handleCSVDownload}
        >
          <BsFiletypeCsv className="w-5 h-5" />
          CSV
        </button>
      </div>
    </div>
  );
};

function exportArrayToCSV(data: any[][], fileName: string) {
  const sanitize = (value: string) => {
    return `${value.replace(/[^\w\s]/gi, "")}`;
  };

  const sanitizedArray = data.map((row) => row.map(sanitize));
  const csvContent = sanitizedArray.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportArrayToXLSX(data: any[][], fileName: string) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);
}

const tableToExcelServices = (tableId: string, fileName: string) => {
  const table = document.getElementById(tableId);
  if (!table) return;
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

const tableToCSVServices = (tableId: string, fileName: string) => {
  const table = document.getElementById(tableId);
  if (!table) return;

  let csvContent = "";
  const rows = table.querySelectorAll("tr");
  rows.forEach((row) => {
    const cols = row.querySelectorAll("td, th");
    const rowData: any[] = [];
    cols.forEach((col: any) => {
      rowData.push(col.innerText);
    });
    csvContent += rowData.join(",") + "\r\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function tableToArray(tableId: string): any[][] {
  const table = document.getElementById(tableId) as HTMLTableElement;
  const tableArray: any[][] = [];

  if (table) {
    const rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
      const rowArray: any[] = [];
      const cells = rows[i].cells;

      for (let j = 0; j < cells.length; j++) {
        rowArray.push(cells[j].innerText.trim());
      }

      tableArray.push(rowArray);
    }
  }

  return tableArray;
}
