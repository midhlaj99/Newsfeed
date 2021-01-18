import React, { useEffect } from 'react';
import styles from "./home.module.css"
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router";
import { useSelector } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {ListAllNews,setNewsData} from '../action/Newsaction'
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    root: {
      width: '345px',
      height:'350px',
      overflow:'scroll',
      overflowX:'hidden',
      scrollBehavior:'smooth'
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "#333 !important"
      }
  });


function Home(){
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory();

    const NewsArr = useSelector(state => state.NewsVal.NewsArray ? state.NewsVal.NewsArray:[])
    const search = useSelector(state => state.NewsVal.search ? state.NewsVal.search:'')
    
    useEffect(()=>{
        dispatch(setNewsData('search',''))
        dispatch(ListAllNews())
    },[])
    
    const Showmore=(val,pic)=>()=>{
        dispatch(setNewsData('selected',val))
        dispatch(setNewsData('selectedpic',pic))
        history.push('/details'+val.published_date)
    }
    const HandleChange=(event)=>{
        dispatch(setNewsData(event.target.name,event.target.value))
        let ser=event.target.value
        if(ser===''){
            dispatch(ListAllNews())
        }
        else{
            let keyword=ser.charAt(0).toUpperCase() + ser.slice(1);

            var matches = NewsArr.filter((val) => {
                return val.title.includes(keyword)
            })
            dispatch(setNewsData('NewsArray',matches))
        }
    }
    const style={marginTop:'30px'}
    return(
        <div>
            <div style={{width:'97%',position:'fixed',top:'60px',backgroundColor:'#FAFAFA',zIndex:2,}}>
                <Grid container style={style}>
                    <Grid item xs={12} sm={6}>
                        <span className={styles.mainhead}>Most Popular</span>
                    </Grid>
                    <Grid item xs={null} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField 
                            label='Search By Keyword'
                            variant='outlined'
                            name='search'
                            onChange={HandleChange}
                            value={search ? search:''}
                            fullWidth
                            size='small'
                            autoComplete='off'
                            style={{marginTop:'5px'}}
                            InputLabelProps={{
                                style: { color: '#333', },
                            }}
                            InputProps={{
                                classes: {
                                  notchedOutline: classes.notchedOutline
                                },
                                endAdornment: (
                                    <InputAdornment position="start">
                                      <SearchIcon />
                                    </InputAdornment>
                                  ),
                              }}
                        ></TextField>
                    </Grid>

                    <Grid item xs={12} style={{marginTop:'20px'}}>
                        <Divider style={{color:'red'}}/>
                    </Grid>
                </Grid>
            </div>
            {
                NewsArr.length <1 ?
                <div style={{width:'100%',textAlign:'center',marginTop:'20px'}}>
                    <span style={{color:'red'}}>No Data,Please Reload</span> 
                </div>
                :null
            }
            <Grid container style={{marginTop:'90px'}}  spacing={1}>
                {
                    NewsArr.map((val,ky)=>{
                        let imgarr=val.media ? val.media[0] ? val.media[0]['media-metadata'] ? val.media[0]['media-metadata']:'':'':''
                        let pic=imgarr[0] ? imgarr[0].url:''
                        return(
                        <Grid item xs={12} sm={6} md={4} key={ky} style={{marginTop:'15px'}}>
                            <div className={styles.innerdiv}>
                                <Card className={classes.root}>
                                    <CardActionArea onClick={Showmore(val,pic)}>
                                        <CardMedia
                                        component="img"
                                        alt="Alternate image"
                                        height="180"
                                        src={pic}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {val.title ? val.title:''}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {val.published_date ? val.published_date:''}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        
                                        <Button size="small" color="primary" onClick={Showmore(val,pic)}>
                                        Read More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>
                        </Grid>

                    )
                    })
                
            }
                
            </Grid>
        </div>
    )
}
export default Home