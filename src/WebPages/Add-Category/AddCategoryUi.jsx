import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';

import { URL } from '../../Constants/DataBaseURL';

import { createTheme, ThemeProvider } from '@mui/material/styles';
export const AddCategoryUi = () => {

    const navigate = useNavigate();



    const [ProductName, setProductName] = useState('')
    const [ImageUrl, setImageUrl] = useState('')




    const uploadData = () => {
        const url = URL.My_Database_Url + "foodcategories";
        const UploadDataCredentials = {
            name: ProductName,
            image: ImageUrl,
        };
        fetch(url, {
            method: 'POST',
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
                if (responseData.status === 200) {
                    console.log("Data Uploaded")
                    navigate("/category")
                }
            })
            .catch(error => {
                console.log(error, 'error from APi UploadData1212');
            });

    }


    const theme = createTheme();



    return (
        <ThemeProvider theme={theme}>

            <Container component="main" >
                <Typography sx={{ marginBottom: 4, paddingTop: 2, fontWeight: "600" }} variant='h5'>Enter Category Details :</Typography>

                <Stack direction={"row"}>

                    <Stack spacing={2}>
                        <Stack spacing={2} direction={"row"}>
                            <Typography sx={{ width: 220, paddingTop: 2, fontWeight: "600" }} variant='subtitle1'>Enter Name of Category</Typography>
                            <TextField sx={{ paddingBottom: 2 }} value={ProductName} onChange={(e) => setProductName(e.target.value)} label="Product Name" variant="outlined" />
                        </Stack>


                        <Stack spacing={2} direction={"row"}>
                            <Typography sx={{ width: 220, paddingTop: 2, fontWeight: "600" }} variant='subtitle1'> Url of Image  </Typography>
                            <TextField sx={{ paddingBottom: 2, width: 400 }} value={ImageUrl} onChange={(e) => setImageUrl(e.target.value)} label="Image URL" variant="outlined" />
                        </Stack>




                        <Button onClick={() => {

                            uploadData()
                        }} size='sm' variant="contained" startIcon={<AddIcon color='info' />}>
                            Upload Data

                        </Button>

                    </Stack>

                </Stack>






            </Container>
        </ThemeProvider >
    );
}
export default AddCategoryUi;

