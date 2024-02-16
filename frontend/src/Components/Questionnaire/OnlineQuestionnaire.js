import Cookies from 'js-cookie';
import AppHeaderOutSide from '../HeaderOutSide';
import { useParams } from 'react-router-dom';
import {variables} from "../../Variables";
import React, { useState,useEffect } from 'react';
const AppOnlineQuestionnaire = () => {
  const { id } = useParams(); 

  const [QueSheetName, setQueSheetName] = useState('');
  const [QueSheetTopicName, setQueSheetTopicName] = useState('');
  const [DetailsLineOne, setDetailsLineOne] = useState('');
  const [DetailsLinetwo, setDetailsLinetwo] = useState('');

  const [Start, setStart] = useState(0);
  const [StartError, setStartError] = useState(0);

  const fetchDataQuesheet = async () => {
    try{
        fetch(variables.API_URL+"quesheet/detail/"+id+"/", {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            })
            .then(response => response.json())
            .then(result => {
              if(result.err !== undefined){
                  setStartError(1);
              }
              console.log(result)
              setQueSheetName(result.quesheetname)
              setQueSheetTopicName(result.quesheettopicname)
              setDetailsLineOne(result.detailslineone)
              setDetailsLinetwo(result.detailslinetwo)
            }
        )
        fetch(variables.API_URL+"queheaddetails/detail/"+id+"/", {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            })
            .then(response => response.json())
            .then(result => {
              if(result.err !== undefined){
                  setStartError(1);
              }
              console.log(result)
            }
        )
        fetch(variables.API_URL+"quetopicdetails/detail/"+id+"/", {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            })
            .then(response => response.json())
            .then(result => {
              if(result.err !== undefined){
                  setStartError(1);
              }
              console.log(result)
            }
        )
        
    }catch (err) {
        console.error(err)
        setStartError(1);
       
    }
  };

  if(Start === 0){
    fetchDataQuesheet();
    setStart(1);
  }
  return (
    <div>
        <AppHeaderOutSide />
        <div className='box-contents-que'>
           <div>
            <h2>แบบสอบถามออนไลน์</h2>
           </div>
        </div>
    </div>
  );
}

export default AppOnlineQuestionnaire;
