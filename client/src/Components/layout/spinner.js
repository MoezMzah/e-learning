/* eslint-disable import/no-anonymous-default-export */
import React, {Fragment} from 'react'
import spinner from '../../assets/loading.gif'
export default ()=>(
    <Fragment>
        <img src={spinner} 
        style={{width:'200px', margin:'auto',display:'block'}}alt="loading..." />
    </Fragment>
)