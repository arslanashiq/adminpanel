import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';


import Tooltip from '@mui/material/Tooltip';


import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import {URL} from '../../Constants/DataBaseURL';

import { createTheme, ThemeProvider } from '@mui/material/styles';
export const RecentUi = () => {

    const navigate = useNavigate();

    const [rows, setrows] = useState([])
    const [Delete, setDelete] = useState(true)



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

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const [ShowTable, setShowTable] = useState(false)


    const fetchData = () => {
        const url = URL.My_Database_Url +'recent';
        if (rows.length == 0) {
            fetch(url, {
                method: 'GET',
            })
                .then(response => response.text())
                .then(async responseText => {
                    let responseData = JSON.parse(responseText);
                    if (responseData.status == 200) {
                        console.log('Data Found Successfully');
                        responseData.recentList.map(item => {
                            let row = item;
                            rows.push(row)


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
                console.log(rows)

                setShowTable(true)
            }, 1200);
        }
    }
    useLayoutEffect(() => {
        fetchData()
    }, [])


    useEffect(() => {
    }, [Delete])

    const handledelete = (id,index) => {
        const url = URL.My_Database_Url +'recent/' + id;
        fetch(url, {
            method: 'DELETE',
        })
            .then(response => response.text())
            .then(async responseText => {
                let responseData = JSON.parse(responseText);
                if (responseData.status == 200) {
                    console.log('Data Deleted Successfully');


                } else {
                    console.log('fail');
                }
            })
            .catch(error => {
                console.log(error, 'error from APi UploadData1212');
            });
        rows.splice(index, 1);
        setDelete(!Delete)
    }


    const handleedit = (index) => {
        navigate("/editrecent/" + index)
    }


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
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[600] }} aria-label="recipe">
                                                <LocalDiningIcon />
                                            </Avatar>
                                        }
                                        action={
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">

                                                <IconButton onClick={() => {
                                                    handleedit(item.id)
                                                }} aria-label="settings">
                                                    <Tooltip title="Edit">


                                                        <EditIcon color='primary' />
                                                    </Tooltip>


                                                </IconButton>

                                                <IconButton onClick={() => {
                                                    handledelete(item.id,index)

                                                }} aria-label="settings">
                                                    <Tooltip title="Delete">


                                                        <DeleteIcon color='error' />
                                                    </Tooltip>
                                                </IconButton>

                                            </ButtonGroup >




                                        }
                                        title={item.name}
                                        subheader={item.category}

                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={item.image}
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.info}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>

                                        <ExpandMore
                                            expand={expanded}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    </CardActions>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography variant='h5' paragraph>Types : </Typography>
                                            {item.size && item.size.map((s) => (
                                                <Typography variant='subtitle1' sx={{ color: "black" }} paragraph>{s[0]}  =  {s[1]} Rs</Typography>
                                            )
                                            )}
                                            {!item.size &&
                                                <Typography paragraph>No Size Available</Typography>
                                            }
                                            <Typography paragraph></Typography>

                                            <Typography variant='h5' paragraph>Ingredients : </Typography>
                                            {item.list && item.list.map((ingr, idx) => (
                                                <Typography sx={{ color: "red" }} >{ingr}</Typography>
                                            ))}
                                            {!item.list &&
                                                <Typography paragraph>No Ingredients List Available</Typography>
                                            }
                                            <Typography paragraph></Typography>

                                        </CardContent>
                                    </Collapse>
                                </Card>
                            ))}
                        </Grid>

                    </Container>}



            </Container>
        </ThemeProvider>
    );
}
export default RecentUi;

