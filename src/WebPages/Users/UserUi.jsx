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

import { URL } from '../../Constants/DataBaseURL';
import { createTheme, ThemeProvider } from '@mui/material/styles';
export const UserUi = () => {
    const [rows, setrows] = useState([])
    const [ShowTable, setShowTable] = useState(false)
    useLayoutEffect(() => {
        const url = URL.My_Database_Url + 'users';
        if (rows.length == 0) {
            fetch(url, {
                method: 'GET',
            })
                .then(response => response.text())
                .then(async responseText => {
                    let responseData = JSON.parse(responseText);
                    if (responseData.status == 200) {
                        console.log('Data Found Successfully');

                        responseData.userList.map(item => {
                            const row = { id: item.id, name: item.first_name + " " + item.last_name, email: item.email, isAdmin: item.isAdmin }
                            rows.push(row)
                        });

                    } else {
                        console.log('fail');
                    }
                })
                .catch(error => {
                    console.log(error, 'error from APi UploadData1212');
                });

        }
    }, [])
    useEffect(() => {

        setTimeout(() => {
            const data = Array.from(new Set(rows.map(JSON.stringify))).map(JSON.parse);
            console.log("Data is : ", data);
            setrows(data)
            setShowTable(true)
        }, 1000);
    }, [])

    const theme = createTheme();


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#1976D2",
            fontWeight: "600",
        }, color: theme.palette.common.white,

        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            color: theme.palette.common.black
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
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Sr#</StyledTableCell>
                                <StyledTableCell align="center">User ID</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Admin</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                                    <StyledTableCell align="center">{row.isAdmin && "Yes"}{!row.isAdmin && "No"}</StyledTableCell>


                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
            </Container>
        </ThemeProvider>
    );
}



export default UserUi;

