import React, { useState, useEffect, useLayoutEffect } from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Constants/DataBaseURL";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";

export const OrderUi = () => {
  const [rows, setrows] = useState([]);
  const [Data, setData] = useState([]);
  const [ShowTable, setShowTable] = useState(false);
  const [Change, setChange] = useState(false);
  const [Filter, setFilter] = useState("All");
  const [OpenSuccess, setOpenSuccess] = useState(false);
  const [OpenReject, setOpenReject] = useState(false);
  const [OpenDetail, setOpenDetail] = useState(false);
  const [DataDetail, setDataDetail] = useState([]);
  const [OpenDel, setOpenDel] = useState(false);
  const [DeletedData, setDeletedData] = useState({
    id: "",
    index: "",
  });
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useLayoutEffect(() => {
    fetchData();
  }, []);
  const HandleOpenDetail = (row) => {
    setDataDetail(row);
    setTimeout(() => {
      console.log("Open", DataDetail);
      setOpenDetail(true);
    }, 50);
  };
  const HandleCloseDetail = () => {
    setOpenDetail(false);
  };
  const fetchData = () => {
    const url = URL.My_Database_Url + "orders";
    if (rows.length == 0) {
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.text())
        .then(async (responseText) => {
          let responseData = JSON.parse(responseText);
          if (responseData.status == 200) {
            console.log("Data Found Successfully");
            if (Data.length == 0) {
              // Data.push(responseData.orderlist)
            }
            responseData.orderlist.map((item) => {
              rows.push(item);
            });
            setTimeout(() => {
              const data = Array.from(new Set(rows.map(JSON.stringify))).map(
                JSON.parse
              );
              console.log("Data is : ", data);
              setrows(data);
              setShowTable(true);
            }, 100);
          } else {
            console.log("fail");
          }
        })
        .catch((error) => {
          console.log(error, "error from APi UploadData1212");
        });
    }
  };

  const checkstatus = (status) => {
    if (status == "Pending") {
      return "Waiting";
    } else if (status == "Waiting") {
      return "Completed";
    } else if (status == "Completed") {
      return "Delivered";
    }
  };

  const handleAccept = (row, status) => {
    console.log(row.id);
    const url = URL.My_Database_Url + "orders/" + row.id;
    const UploadDataCredentials = {
      status: status,
    };
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UploadDataCredentials),
    })
      .then((response) => response.text())
      .then(async (responseText) => {
        let responseData = JSON.parse(responseText);
        console.log(responseData);
        if (responseData.status == 200) {
          setOpenSuccess(true);
          setChange(!Change);
          console.log(ShowTable, Change);
        }
      })
      .catch((error) => {
        console.log(error, "error from APi UploadData1212");
      });
  };
  const handleReject = (id, index) => {
    setOpenDel(false);
    const url = URL.My_Database_Url + "orders/" + id;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then(async (responseText) => {
        let responseData = JSON.parse(responseText);
        if (responseData.status == 200) {
          setOpenReject(true);
          console.log("Data Deleted Successfully");
          rows.splice(index, 1);
          setChange(!Change);
        } else {
          console.log("fail");
        }
      })
      .catch((error) => {
        console.log(error, "error from APi UploadData1212");
      });
  };
  useEffect(() => {}, [Change, Filter]);

  const theme = createTheme();

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        width: 250,
      },
    },
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976D2",
      fontWeight: "600",
    },
    color: theme.palette.common.white,

    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: theme.palette.common.black,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Dialog
          open={OpenDel}
          onClose={() => setOpenDel(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent className="mb-0">
            <DialogTitle
              color={"black"}
              sx={{ fontWeight: "700" }}
              variant="h6"
            >
              Confirmation
            </DialogTitle>
            <DialogContentText id="alert-dialog-description">
              <Typography
                color={"black"}
                sx={{ fontWeight: "600" }}
                variant="subtitle2"
              >
                Are you Realy want to delete Order
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDel(false);
              }}
              size="small"
              color="error"
              variant="contained"
            >
              No
            </Button>
            <Button
              size="small"
              color="success"
              variant="contained"
              onClick={() => {
                handleReject(DeletedData.id, DeletedData.index);
              }}
              autoFocus
            >
              proceed
            </Button>
          </DialogActions>
        </Dialog>
        {!ShowTable && (
          <div className="ml-auto">
            <Typography varient="h4">Loading</Typography>
          </div>
        )}
        <Snackbar
          open={OpenSuccess}
          autoHideDuration={3000}
          onClose={() => setOpenSuccess(false)}
        >
          <Alert
            onClose={() => setOpenSuccess(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Order Confirmed!
          </Alert>
        </Snackbar>

        <Snackbar
          open={OpenReject}
          autoHideDuration={3000}
          onClose={() => setOpenReject(false)}
        >
          <Alert
            onClose={() => setOpenReject(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Order Cancelled.
          </Alert>
        </Snackbar>

        {DataDetail != "" && (
          <Dialog
            sx={{ height: 600 }}
            open={OpenDetail}
            onClose={HandleCloseDetail}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent className="mb-0">
              <DialogTitle
                color={"black"}
                sx={{ fontWeight: "700" }}
                variant="h6"
              >
                Order Detail
              </DialogTitle>
              <DialogContentText id="alert-dialog-description">
                <Typography
                  color={"black"}
                  sx={{ fontWeight: "600" }}
                  variant="subtitle2"
                >
                  Customer Information
                </Typography>
                <Typography variant="body2">
                  <span>Order ID : </span>
                  <span>{DataDetail._id}</span>
                </Typography>

                <Typography variant="body2">
                  <span>Customer Name : </span>
                  <span>{DataDetail.user_detail[0]}</span>
                </Typography>

                <Typography variant="body2">
                  <span>Phone # : </span>
                  <span>{DataDetail.user_detail[1]}</span>
                </Typography>
                <Typography variant="body2">
                  <span>Delivery Location : </span>
                  <span>{DataDetail.user_detail[2]}</span>
                </Typography>
                <Typography
                  color={"black"}
                  sx={{ fontWeight: "600" }}
                  variant="subtitle1"
                >
                  Order List
                </Typography>
                {DataDetail.order_detail.map((item, index) => (
                  <Typography variant="body2">
                    <span>{index + 1 + ".  "}</span>
                    <span>{item.name}</span>
                    <span>({item.size})</span>
                    <span> x {" " + item.quantity}</span>
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>

                    <span>{item.price * item.quantity} Rs</span>
                  </Typography>
                ))}
                <Divider
                  sx={{
                    marginTop: 3,
                    marginBottom: 3,
                    borderWidth: 2,
                    color: "black",
                  }}
                />

                <Typography
                  color={"black"}
                  sx={{ fontWeight: "600" }}
                  variant="subtitle1"
                >
                  Total Price : {DataDetail.total_price}
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={HandleCloseDetail}
              >
                Close
              </Button>
              {DataDetail.status != "Delivered" && (
                <Button
                  size="small"
                  color="success"
                  variant="contained"
                  onClick={() => {
                    let status = checkstatus(DataDetail.status);
                    handleAccept(DataDetail, status);
                    DataDetail.status = status;
                    HandleCloseDetail();
                  }}
                  autoFocus
                >
                  proceed
                </Button>
              )}
            </DialogActions>
          </Dialog>
        )}
        {ShowTable && (
          <Stack spacing={2} sx={{ marginBottom: 4 }} direction={"row"}>
            <label>Select Filter</label>
            <Select
              sx={{ height: 30, width: 150 }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={Filter}
              onChange={(e) => setFilter(e.target.value)}
              MenuProps={MenuProps}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Waiting">Waiting</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </Stack>
        )}
        {ShowTable && rows && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sr#</StyledTableCell>

                  <StyledTableCell align="center">Order ID</StyledTableCell>
                  <StyledTableCell align="center">
                    Customer Name
                  </StyledTableCell>
                  <StyledTableCell align="center">Location</StyledTableCell>
                  <StyledTableCell align="center">Phone #</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center"> Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) =>
                  Filter == "All" ? (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell
                        className="cursor-dot-pointer"
                        align="center"
                        onClick={() => HandleOpenDetail(row)}
                      >
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.user_detail[0]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.user_detail[1]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.user_detail[2]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.status}
                      </StyledTableCell>

                      <StyledTableCell style={{ width: 200 }} align="center">
                        {row.status == "Pending" && (
                          <Button
                            onClick={() => {
                              DeletedData.id = row._id;
                              DeletedData.index = index;
                              setOpenDel(true);
                            }}
                            size="small"
                            color="error"
                            variant="contained"
                          >
                            Reject
                          </Button>
                        )}
                        {row.status != "Delivered" && (
                          <Button
                            sx={{ marginLeft: 2 }}
                            onClick={() => {
                              let status = checkstatus(row.status);
                              handleAccept(row, status);
                              row.status = status;
                            }}
                            size="small"
                            variant="contained"
                          >
                            {checkstatus(row.status)}
                          </Button>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    row.status == Filter && (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          className="cursor-dot-pointer"
                          align="center"
                          onClick={() => HandleOpenDetail(row)}
                        >
                          {row.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.user_detail[0]}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.user_detail[1]}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.user_detail[2]}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.status}
                        </StyledTableCell>

                        <StyledTableCell style={{ width: 200 }} align="center">
                          {row.status == "Pending" && (
                            <Button
                              onClick={() => {
                                DeletedData.id = row._id;
                                DeletedData.index = index;
                                setOpenDel(true);
                              }}
                              size="small"
                              color="error"
                              variant="contained"
                            >
                              Reject
                            </Button>
                          )}
                          {row.status != "Delivered" && (
                            <Button
                              sx={{ marginLeft: 2 }}
                              onClick={() => {
                                let status = checkstatus(row.status);
                                handleAccept(row, status);
                                row.status = status;
                              }}
                              size="small"
                              variant="contained"
                            >
                              {checkstatus(row.status)}
                            </Button>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </ThemeProvider>
  );
};
export default OrderUi;
