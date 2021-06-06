import React from 'react';
import PropTypes from 'prop-types';
import './FormStyle.css';

function weather(props){
    return (
<div className="container text-light">
    {props?<div className="cards pt-4">

        <h1>{props.city}</h1>
        <h5>{props.country}</h5>

        <h5 className="py-4">
            <i className={props.icon}></i>
        </h5>
        {props.temp?<h1 className="py-2">{props.temp}&deg;</h1>
:null}
{props.minTemp&&props.maxTemp?minmaxTemp(props.minTemp,props.maxTemp)
:null}
        <h4 className="py-3">{props.description}</h4>
     {props.pressure&&props.wind?<div>
            <h3 >
            <span className="px-5 py-3">Wind</span>
             <span className="px-5 py-3">Pressure</span>
        </h3>
        <h5 >
            <span className="px-3">{props.wind}m/s</span>
            <span className="px-3">{props.pressure}hPa</span>
        </h5>
     </div>:null}
    </div>:null}
</div>
    );
}

function minmaxTemp(min,max){
    return(
        <h3 >
            <span className="px-4">{min}&deg;</span>
             <span className="px-4">{max}&deg;</span>
        </h3>
    );
}

export default weather;