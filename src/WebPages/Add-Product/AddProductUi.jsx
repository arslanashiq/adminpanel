import React, { useState, useLayoutEffect } from 'react';
import { Container, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';

import Select from '@mui/material/Select';
import { URL } from '../../Constants/DataBaseURL';

import { createTheme, ThemeProvider } from '@mui/material/styles';
export const AddProductUi = () => {

    const navigate = useNavigate();


    // const ExpandMore = styled((props) => {
    //     const { expand, ...other } = props;
    //     return <IconButton {...other} />;
    // })(({ theme, expand }) => ({
    //     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    //     marginLeft: 'auto',
    //     transition: theme.transitions.create('transform', {
    //         duration: theme.transitions.duration.shortest,
    //     }),
    // }));

    const [ProductName, setProductName] = useState('')
    const [Category, setCategory] = useState([])
    const [SelectedCategory, setSelectedCategory] = useState('Select 1')
    const [ImageUrl, setImageUrl] = useState('')
    const [Size, setSize] = useState([])
    const [Price, setPrice] = useState('')
    const [Info, setInfo] = useState('')
    const [sizename, setsizename] = useState('')
    const [sizeprice, setsizeprice] = useState('')
    const [Ingredient, setIngredient] = useState([])
    const [ingname, setingname] = useState('')
    const [UploadType, setUploadType] = useState('products')


    useLayoutEffect(() => {
        fetchData()
    })

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 200,
                width: 250,
            },
        },
    };


    const redirectCheck = () => {
        if (UploadType === 'products') {
            navigate("/products")
        }
        else if (UploadType === "recent") {
            navigate("/recent")
        }
        else if (UploadType === "recomended") {
            navigate("/recomended")
        }
    }

    const uploadData = () => {
        const url = URL.My_Database_Url + UploadType;
        const UploadDataCredentials = {
            name: ProductName,
            category: SelectedCategory,
            image: ImageUrl,
            size: Size,
            price: Price,
            info: Info,
            list: Ingredient
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
                    redirectCheck();
                }
            })
            .catch(error => {
                console.log(error, 'error from APi UploadData1212');
            });

    }
    const fetchData = () => {
        const url = URL.My_Database_Url + 'foodcategories';
        if (Category.length === 0) {

            fetch(url, {
                method: 'GET',
            })
                .then(response => response.text())
                .then(async responseText => {
                    let responseData = JSON.parse(responseText);
                    if (responseData.status === 200) {
                        console.log('Data Found Successfully');
                        console.log(responseData)
                        setCategory(responseData.foodcategoryList)


                    } else {
                        console.log('fail');
                    }
                })
                .catch(error => {
                    console.log(error, 'error from APi UploadData1212');
                });
            setTimeout(() => {
                const data = Array.from(new Set(Category.map(JSON.stringify))).map(JSON.parse);
                console.log("Data is : ", data);
                setCategory(data)
            }, 100);
        }
    }

    const theme = createTheme();



    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={2} sx={{ marginBottom: 4 }} direction={"row"}>
                <label >Select Type</label>
                <Select
                    sx={{ height: 30, width: 150 }}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={UploadType}
                    onChange={(e) => setUploadType(e.target.value)}
                    MenuProps={MenuProps}

                >
                    <MenuItem value='products'>Product</MenuItem>
                    <MenuItem value='recent'>Recent</MenuItem>
                    <MenuItem value='recomended'>Recomended</MenuItem>

                </Select>
            </Stack>
            <Container component="main" >
                <Typography sx={{ marginBottom: 4, paddingTop: 2, fontWeight: "600" }} variant='h5'>Enter Product Details :</Typography>

                <Stack direction={"row"}>

                    <Stack spacing={2}>
                        <Stack spacing={2} direction={"row"}>
                            <Typography sx={{ width: 220, paddingTop: 2, fontWeight: "600" }} variant='subtitle1'>Enter Name of Product</Typography>
                            <TextField sx={{ paddingBottom: 2 }} value={ProductName} onChange={(e) => setProductName(e.target.value)} label="Product Name" variant="outlined" />
                        </Stack>

                        <Stack spacing={2} direction={"row"}>
                            <Typography sx={{ width: 220, paddingTop: 2, fontWeight: "600" }} variant='subtitle1'>Price of Product</Typography>
                            <TextField sx={{ paddingBottom: 2 }} value={Price} onChange={(e) => setPrice(e.target.value)} label="Price" variant="outlined" />
                        </Stack>

                        <Stack spacing={2} direction={"row"}>
                            <Typography sx={{ width: 220, paddingTop: 2, fontWeight: "600" }} variant='subtitle1'> Url of Product Image  </Typography>
                            <TextField sx={{ paddingBottom: 2, width: 400 }} value={ImageUrl} onChange={(e) => setImageUrl(e.target.value)} label="Image URL" variant="outlined" />
                        </Stack>



                        <Stack spacing={2} direction={"row"}>
                            <Typography sx={{ width: 220, paddingTop: 2, fontWeight: "600" }} variant='subtitle1'>Category</Typography>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={SelectedCategory}
                                label={"Category"}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                MenuProps={MenuProps}

                            >
                                {Category.map((item, index) => (
                                    <MenuItem value={item.name}>{index + 1}.  {item.name}</MenuItem>
                                ))}

                            </Select>
                        </Stack>

                        <Stack spacing={2} direction={"row"}>

                            <Typography sx={{ width: 220, paddingTop: 2, fontWeight: "600" }} variant='subtitle1'>Enter Information of Product</Typography>
                            <TextField multiline sx={{ width: 300, paddingBottom: 2 }} value={Info} onChange={(e) => setInfo(e.target.value)} label="Information" variant="outlined" />
                        </Stack>



                        {/* Sizes */}

                        <Stack spacing={2} direction={"row"}>

                            <Typography sx={{ width: 220, paddingTop: 2, fontWeight: "600" }} variant='subtitle1'>Enter Product Size Detail</Typography>
                            <TextField multiline sx={{ width: 300, paddingBottom: 2 }} value={sizename} onChange={(e) => setsizename(e.target.value)} label="Size Name" variant="outlined" />
                            <TextField multiline sx={{ width: 300, paddingBottom: 2 }} value={sizeprice} onChange={(e) => setsizeprice(e.target.value)} label="Size Price" variant="outlined" />


                            <AddIcon
                                sx={{ height: 40, paddingTop: 2 }}
                                onClick={() => {
                                    console.log(Size)
                                    if (sizename.length > 0 && parseFloat(sizeprice)) {
                                        Size.push([sizename, sizeprice]);
                                        setsizename('');
                                        setsizeprice("");
                                    }
                                    else {
                                        alert("Please Enter Correct Value")
                                    }
                                }} color='info' />
                        </Stack>
                        <Stack direction={"column"}>
                            {Size.length > 0 && <Typography sx={{ fontWeight: '800' }} varient='h6'>Sizes</Typography>}
                            {Size.map((item, index) => (
                                <Stack spacing={3} direction={"row"}>
                                    <label>{index + 1}) Name : {item[0]}</label>
                                    <label>Price :  {item[1]}</label>
                                </Stack>
                            ))}
                        </Stack>



                        {/* ingredients */}

                        <Stack spacing={2} direction={"row"}>

                            <Typography sx={{ width: 220, paddingTop: 2, fontWeight: "600" }} variant='subtitle1'>Enter Product Ingredient Detail</Typography>
                            <TextField multiline sx={{ width: 300, paddingBottom: 2 }} value={ingname} onChange={(e) => setingname(e.target.value)} label="Ingredient Name" variant="outlined" />


                            <AddIcon
                                sx={{ height: 40, paddingTop: 2 }}
                                onClick={() => {
                                    if (ingname.length > 3) {
                                        Ingredient.push(ingname);
                                        setingname('');
                                    }
                                    else {
                                        alert("Invalid Values in Ingredient Name")
                                    }
                                }} color='info' />
                        </Stack>
                        <Stack direction={"column"}>
                            {Ingredient.length > 0 && <Typography sx={{ fontWeight: '800' }} varient='h6'>Ingredients Name</Typography>}
                            {Ingredient.map((item, index) => (
                                <Stack spacing={3} direction={"row"}>
                                    <label>{index + 1})  {item}</label>
                                </Stack>
                            ))}
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
export default AddProductUi;

