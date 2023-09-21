import React from 'react'
import PageBuilder from '../../pages/Pagebuilder'
import { useEffect } from 'react';
import { getStatistics } from '../../services/formservice';
import {Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';


function Trend({ data, loading, error, loadData }) {
    useEffect(() => {
        const fetchData = async () => {
          try {
            return await getStatistics();
          } catch (error) {
            console.log(error);
          }
        };
        loadData(fetchData);
      }, []);
  return (
   <Grid  container rowGap={3} columnGap={3}>
        <Grid item xs={12} md={3} >
        <Card sx={{backgroundColor:"#00c39a"}}>
                      <CardContent sx={{height:"100px",display:"flex",flexDirection:"column",justifyContent:"space-evenly",alignItems:"center"}}>
                        <Typography sx={{color:"black",fontWeight:"bolder",fontSize:"larger"}}>Total Views</Typography>
                        {loading? <CircularProgress></CircularProgress>:<Typography sx={{color:"white",fontWeight:"bolder",fontSize:"larger"}}>{data?.totalViews||0}</Typography>}
                      </CardContent>
                   </Card>
            </Grid> 
            <Grid item xs={12} md={3}>
        <Card sx={{backgroundColor:"#ffc03c"}}>
                      <CardContent sx={{height:"100px",display:"flex",flexDirection:"column",justifyContent:"space-evenly",alignItems:"center"}}>
                        <Typography sx={{color:"black",fontWeight:"bolder",fontSize:"larger"}}>Submission Rate</Typography>
                        {loading? <CircularProgress></CircularProgress>:<Typography sx={{color:"white",fontWeight:"bolder",fontSize:"larger"}}>{data?.trend ? `${data.trend}%` :  0}</Typography>}
                      </CardContent>
                   </Card>
            </Grid> 
   </Grid>
  )
}

export default PageBuilder(Trend)