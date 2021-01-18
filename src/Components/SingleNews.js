import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {setNewsData} from '../action/Newsaction'


import Grid from '@material-ui/core/Grid';
import styles from "./home.module.css"
import Divider from '@material-ui/core/Divider';


function DetailNews(){
    const history = useHistory();
    const dispatch = useDispatch()

    const selected = useSelector(state => state.NewsVal.selected ? state.NewsVal.selected:'')
    const selectedpic = useSelector(state => state.NewsVal.selectedpic ? state.NewsVal.selectedpic:'')

    useEffect(()=>{
        if(!selected){
            history.push('/')
        }
        return(()=>{
            dispatch(setNewsData('selected',''))
            dispatch(setNewsData('selectedpic',''))
        })
    },[selected])
    return(
        <div>
            <Grid container >
                <Grid item xs={null} sm={1} md={2}></Grid>
                <Grid item xs={12} sm={10} md={8} style={{textAlign:'left'}}>
                    {/* <Button>
                        <ArrowBackIcon />
                    </Button> */}
                    <div className={styles.detail}>
                        <Grid container>
                            <Grid item xs={12} sm={12}>
                                <span className={styles.title}>
                                   {selected.title} 
                                </span>
                            </Grid>
                            <Grid item xs={12} style={{marginTop:'20px'}}>
                                 <Divider style={{color:'#333'}}/>
                            </Grid>
                            <Grid item xs={null} sm={3}></Grid>
                            <Grid item xs={12} sm={6} style={{textAlign:'center',marginTop:'20px'}}>
                                <img alt='image' src={selectedpic} height='200px' width='200px'/>
                            </Grid>
                            <Grid item xs={null} sm={3}></Grid>

                        </Grid>
                        <p>
                            {
                                selected.adx_keywords
                            }
                        </p>

                        <p>
                            {
                                selected.abstract
                            }
                        </p>
                        <p>
                            <a style={{display: "table-cell"}} href={selected.url} target="_blank">To Know More...</a>
                        </p>
                        <div style={{textAlign:'right'}}>
                            <span>{selected.source}</span> <br/>
                            <span>{selected.published_date}</span>
                            
                        </div>
                    </div>
                </Grid>
                <Grid item xs={null} sm={1} md={2}></Grid>
            </Grid>
        </div>
    )
}
export default DetailNews