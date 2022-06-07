import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import { URL } from '../../Constants/DataBaseURL';

import { createTheme, ThemeProvider } from '@mui/material/styles';
export const Edit = () => {

    const navigate = useNavigate();
    const params = useParams();

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const [ProductName, setProductName] = useState('')
    const [ImageUrl, setImageUrl] = useState('')
    const [ShowForm, setShowForm] = useState(false)
    useLayoutEffect(() => {
        fetchcategory(params.id);

    }, [])

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 200,
                width: 250,
            },
        },
    };




    const uploadData = () => {
        const url = URL.My_Database_Url + 'foodcategories/' + params.id;
        const UploadDataCredentials = {
            name: ProductName,
            image: ImageUrl,
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
                    console.log("Data Updated")
                    navigate("/category")
                }
                else {
                    alert("Error in Updation")
                }
            })
            .catch(error => {
                console.log(error, 'error from APi UploadData1212');
            });

    }
    const fetchcategory = (id) => {
        const url = URL.My_Database_Url + 'foodcategories/' + id;


        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then(async responseText => {
                let responseData = JSON.parse(responseText);
                if (responseData.status == 200) {
                    console.log('Data Found Successfully');

                    const d = responseData.foodcategory

                    setTimeout(() => {
                        console.log(d)
                        setProductName(d[0].name)
                        setImageUrl(d[0].image)
                        console.log(ImageUrl, ProductName)
                        setShowForm(true)
                    }, 1000);
                } else {
                    console.log('fail');
                }
            })
            .catch(error => {
                console.log(error, 'error from APi UploadData1212');
            });


    }



    const theme = createTheme();



    return (
        <ThemeProvider theme={theme}>
            {ShowForm && <Container component="main" >
                <Typography sx={{ marginBottom: 4, paddingTop: 2, fontWeight: "600" }} variant='h5'>Enter Product Details :</Typography>

                <Stack direction={"row"}>

                    <Stack spacing={2}>
                        <Stack spacing={2} direction={"row"}>
                            <Typography sx={{ width: 220, paddingTop: 2, fontWeight: "600" }} variant='subtitle1'>Enter Name of Category</Typography>
                            <TextField sx={{ paddingBottom: 2 }} value={ProductName} onChange={(e) => setProductName(e.target.value)} variant="outlined" />
                        </Stack>


                        <Stack spacing={2} direction={"row"}>
                            <Typography sx={{ width: 220, paddingTop: 2, fontWeight: "600" }} variant='subtitle1'> Url of  Image  </Typography>
                            <TextField sx={{ paddingBottom: 2, width: 400 }} value={ImageUrl} onChange={(e) => setImageUrl(e.target.value)} variant="outlined" />
                        </Stack>

                        <Button onClick={() => {

                            uploadData()
                        }} size='sm' variant="contained" startIcon={<AddIcon color='info' />}>
                            Update Data

                        </Button>

                    </Stack>

                </Stack>






            </Container>}
        </ThemeProvider >
    );
}
export default Edit;

