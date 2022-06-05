import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import {URL} from '../../Constants/DataBaseURL';

export const OrderUi = () => {
    const navigate = useNavigate();
    const [rows, setrows] = useState([])
    const [Data, setData] = useState([])
    const [DataChange, setDataChange] = useState(true)
    const [ShowTable, setShowTable] = useState(false)
    const [Change, setChange] = useState(false)



    useLayoutEffect(() => {
        fetchData()
    }, [Change])
  


    const fetchData = () => {
        console.log(rows)
        const url = URL.My_Database_Url +'orders';
        if (rows.length == 0) {

            fetch(url, {
                method: 'GET',
            })
                .then(response => response.text())
                .then(async responseText => {
                    let responseData = JSON.parse(responseText);
                    if (responseData.status == 200) {
                        console.log('Data Found Successfully');
                        if (Data.length == 0) {
                            // Data.push(responseData.orderlist)
                        }
                        responseData.orderlist.map(item => {
                            if (item.status != 'Delivered') {
                                const row = { id: item.id, customer_name: item.user_detail[0], phone: item.user_detail[1], location: item.user_detail[2], status: item.status }
                                rows.push(row)
                            }
                        });

                    } else {
                        console.log('fail');
                    }
                })
                .catch(error => {
                    console.log(error, 'error from APi UploadData1212');
                });
            setTimeout(() => {
                const data = Array.from(new Set(rows.map(JSON.stringify))).map(JSON.parse);
                console.log("Data is : ", data);
                setrows(data)
                setShowTable(true)
            }, 900);
        }
    }


    const handleAccept = (row) => {
        console.log(row.id)
        const url = URL.My_Database_Url +'orders/' + row.id;
        const UploadDataCredentials = {
            status: "Waiting"
        };
        fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UploadDataCredentials),
        })
            .then(response => response.text())
            .then(async responseText => {
                let responseData = JSON.parse(responseText);
                console.log(responseData)
                if (responseData.status == 200) {
                    // setrows(responseData.orderlist);
                    // setrows(responseData.orderlist);
                    // setrows(responseData.orderlist);
                    setChange(!Change);
                    console.log(ShowTable, Change)
                }
            })
            .catch(error => {
                console.log(error, 'error from APi UploadData1212');
            });


    }
    const handleReject = () => {

    }

    const theme = createTheme();


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" >
                {!ShowTable && <div className='ml-auto'>
                    <Typography varient="h4">
                        Loading</Typography></div>}
                {ShowTable && rows && <TableContainer component={Paper}>
                    <Table >
                        <TableHead >
                            <TableRow>
                                <StyledTableCell >Sr#</StyledTableCell>

                                <StyledTableCell align="center">Order ID</StyledTableCell>
                                <StyledTableCell align="center">Customer Name</StyledTableCell>
                                <StyledTableCell align="center">Location</StyledTableCell>
                                <StyledTableCell align="center">Phone #</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center"> </StyledTableCell>
                                <StyledTableCell align="center"> </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                                    <StyledTableCell align="center">{row.customer_name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.phone}</StyledTableCell>
                                    <StyledTableCell align="center">{row.location}</StyledTableCell>
                                    <StyledTableCell align="center">{row.status}</StyledTableCell>

                                    <StyledTableCell align="center">{row.status == "Pending" &&
                                        <Button onClick={() => { 
                                            row.status="Waiting"
                                            handleAccept(row) }}
                                            size='small' variant="contained">Accept</Button>}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.status == "Pending" && <Button onClick={() => {
                                            handleReject(row)
                                        }} size='small' color='error' variant="contained">Reject</Button>}</StyledTableCell>

                                </StyledTableRow>
                            )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>}
            </Container>
        </ThemeProvider>
    );
}
export default OrderUi;

