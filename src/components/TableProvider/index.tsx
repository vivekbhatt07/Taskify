import React, { useState, useEffect, FC } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useNavigate } from "react-router-dom";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

type projectData = {
  id: String;
  name: String;
};

interface TableProviderProps {
  tableData: projectData[];
  exclude: String[];
  originalData: projectData[];
}

const TableProvider: FC<TableProviderProps> = ({
  tableData,
  exclude,
  originalData,
}) => {
  const navigate = useNavigate();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const data = tableData.map(
    ({ Size, Installs, LastUpdated, CurrentVer, AndroidVer, ...rest }) => {
      return { ...rest };
    }
  );

  const headList = [];
  const { Size, Installs, LastUpdated, CurrentVer, AndroidVer, ...rest } =
    originalData[0];

  for (let [key, value] of Object.entries(rest)) {
    headList.push({ id: key, numeric: typeof value === "number", label: key });
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty data.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, tableData]
  );

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{ width: "100%", mb: 2, backgroundColor: "#1c1917", color: "#fff" }}
      >
        <TableContainer sx={{ color: "#fff" }}>
          <Table
            sx={{
              minWidth: 750,
              minHeight: visibleRows.length === 0 ? 300 : "auto",
              color: "#fff",
              borderSpacing: "0 8px",
              borderCollapse: "separate",
            }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <TableHead>
              <TableRow sx={{ border: "none" }}>
                {headList.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    // align={headCell.numeric ? "right" : "left"}
                    align="left"
                    sortDirection={orderBy === headCell.id ? order : false}
                    sx={{ color: "#fff" }}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                position: visibleRows.length === 0 ? "relative" : "static",
              }}
            >
              {visibleRows.map((row, index) => {
                return (
                  <TableRow
                    onClick={() => navigate(`/${row.App}`)}
                    sx={{
                      cursor: "pointer",
                      color: "#fff",
                      borderRadius: "16px",
                      backgroundColor: "#ffffff20",
                      border: "none",
                      userSelect: "none",
                      "&:hover": {
                        transition: "background 0.3s",
                        backgroundColor: "#ffffff50",
                      },
                    }}
                    key={index}
                  >
                    {Object.entries(row).map((cell, index) => {
                      const [key, value] = cell;
                      return (
                        <TableCell
                          align="left"
                          sx={{
                            color: "#fff",
                            border: "none",
                            "&:first-child": {
                              borderRadius: "16px 0 0 16px",
                            },
                            "&:last-child": {
                              borderRadius: "0 16px 16px 0",
                            },
                          }}
                          key={index}
                        >
                          {key === "Category"
                            ? value.replaceAll("_", " ")
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {visibleRows.length === 0 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  No Data Found
                </div>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: "#fff" }}
          backIconButtonProps={{
            style: {
              color: "#fff",
            },
          }}
          nextIconButtonProps={{
            style: {
              color: "#fff",
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default TableProvider;
