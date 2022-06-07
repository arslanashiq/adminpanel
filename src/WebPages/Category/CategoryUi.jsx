import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import Grid from '@mui/material/Grid';
import { URL } from '../../Constants/DataBaseURL';
import Tooltip from '@mui/material/Tooltip';

import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
export const CategoryUi = () => {
    const [rows, setrows] = useState([])
    const [Data, setData] = useState([])
    const [Delete, setDelete] = useState(true)

    const navigate = useNavigate();


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

    useEffect(() => {
    }, [Delete])

    const handledelete = (id, index) => {
        const url = URL.My_Database_Url + 'foodcategories/' + id;
        fetch(url, {
            method: 'DELETE',
        })
            .then(response => response.text())
            .then(async responseText => {
                let responseData = JSON.parse(responseText);
                if (responseData.status == 200) {
                    console.log('Data Deleted Successfully');
                    rows.splice(index, 1);
                    setDelete(!Delete)

                } else {
                    console.log('fail');
                }
            })
            .catch(error => {
                console.log(error, 'error from APi UploadData1212');
            });

    }


    const handleedit = (index) => {
        navigate("/editcategory/" + index)
    }

    const [ShowTable, setShowTable] = useState(false)
    useLayoutEffect(() => {
        const url = URL.My_Database_Url + 'foodcategories';
        if (rows.length == 0) {
            fetch(url, {
                method: 'GET',
            })
                .then(response => response.text())
                .then(async responseText => {
                    let responseData = JSON.parse(responseText);
                    if (responseData.status == 200) {
                        console.log('Data Found Successfully');
                        responseData.foodcategoryList.map(item => {
                            let row = item;
                            rows.push(row)
                        });
                        setTimeout(() => {
                            const data = Array.from(new Set(rows.map(JSON.stringify))).map(JSON.parse);
                            console.log("Data is : ", data);

                            setrows(data)

                            setShowTable(true)
                            console.log(rows)
                        }, 500);

                    } else {
                        console.log('fail');
                    }
                })
                .catch(error => {
                    console.log(error, 'error from APi UploadData1212');
                });

        }
    }, [])

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" >
                {!ShowTable && <div className='ml-auto'>
                    <Typography varient="h4">
                        Loading</Typography></div>}
                {ShowTable &&
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>

                            {rows.map((item, index) => (

                                <Card sx={{ width: 300, ml: 3, mt: 4 }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.image}
                                        alt="green iguana"
                                    />
                                    <CardContent >
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.name}
                                        </Typography>

                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">

                                            <IconButton onClick={() => {
                                                handleedit(item.id)
                                            }} aria-label="settings">
                                                <Tooltip title="Edit">


                                                    <EditIcon color='primary' />
                                                </Tooltip>


                                            </IconButton>

                                            <IconButton onClick={() => {
                                                handledelete(item.id, index)

                                            }} aria-label="settings">
                                                <Tooltip title="Delete">


                                                    <DeleteIcon color='error' />
                                                </Tooltip>
                                            </IconButton>

                                        </ButtonGroup >

                                    </CardContent>

                                </Card>
                            ))}
                        </Grid>

                    </Container>}



            </Container>
        </ThemeProvider>
    );
}
export default CategoryUi;

