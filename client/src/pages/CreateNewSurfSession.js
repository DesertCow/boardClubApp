

import Header from '../components/Header';
import NavFooter from '../components/NavFooter';
import WeatherWidget from "../components/WeatherWidget";
import LoginPage from "../components/LoginPage";

import Auth from '../utils/auth';

import { useNavigate } from "react-router-dom";

import { useMutation } from '@apollo/client';
import { CREATE_SURF_SESSION } from '../utils/mutations';

import { getShaperList_Q } from '../utils/queries';
import { useQuery } from '@apollo/client';

import { useState, useCallback } from 'react';

//* Date Picker Setup
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function CreateNewSession() {

  //* Validate JWT Token/Login
  if(Auth.loggedIn()){

    const navigate = useNavigate();

    const [surfSessionState, setSurfSessionState] = useState({ userID: '', sessionDate: '' , sessionDate: '' , sessionTime: '' , sessionLocation: '' , skyConditions: '' , waveSize: '' , tideLevel: '' , sessionNotes: '' , sessionRating: '' , surfboardShaper: '' , surfboardModel: '' , surfboardLengthFT: '' , surfboardLengthIN: '' , surfboardVolume: '' , surfboardFinConfig: ''});

    const [createSurfSession, { surfSessionData }] = useMutation(CREATE_SURF_SESSION);

    //* Grab and Decode JWT Token
    let jwtToken = Auth.getProfile()

    //* Grabt Todays Time/Date
    const todayDate = new Date()

    const [datevalue, setDateValue] = useState(todayDate);

    const [value, setTimeValue] = useState(todayDate.getHours() + ":" + todayDate.getMinutes());

    //* Submit surf session data to Database
    const handleSurfSessionSubmit = async (event) => {
      
      event.preventDefault();

      const surfSession = event.target;
      const surfSessionForm = new FormData(surfSession);

      //* Convert Date output from DatePicker to MM-DD-YYYY
      var surfSessionDate = new Date( datevalue );

      // console.log(surfSessionDate)

      //* Add 1 to offset months start counting at 0
      var offsetSessionMonth = surfSessionDate.getMonth() + 1;
      // var surfSessionDateFinal = surfSessionDate.getMonth() + "-" + surfSessionDate.getDate() + "-" + surfSessionDate.getFullYear();
      var surfSessionDateFinal = offsetSessionMonth + "-" + surfSessionDate.getDate() + "-" + surfSessionDate.getFullYear();

      //* Convert Time output from TimePicker
      var surfSessionTime = new Date( value );

      var finalSurfSessionMin
      var finalSurfSessionHour


      if(isNaN(surfSessionTime.getMinutes())){

        //* Use Current Time
        if(surfSessionTime.getMinutes() < 10){

          finalSurfSessionMin = "0" + todayDate.getMinutes();

        } else{
          
          finalSurfSessionMin = todayDate.getMinutes();

        }

        finalSurfSessionHour = todayDate.getHours()

      }
      else {
        
        //* Add truncated zero when mintues is below 10
        if(surfSessionTime.getMinutes() < 10){

          finalSurfSessionMin = "0" + surfSessionTime.getMinutes();

        } else{
          
          finalSurfSessionMin = surfSessionTime.getMinutes();

        }

        finalSurfSessionHour = surfSessionTime.getHours()

      }
      
      //* Convert Military Time to AM/PM Time
      if(finalSurfSessionHour < 13)
      {
        var surfSessionTimeFinal = finalSurfSessionHour + ":" + finalSurfSessionMin + " AM";
      }
      else {
        var surfSessionTimeFinal = finalSurfSessionHour-12 + ":" + finalSurfSessionMin + " PM";
      }
      
      console.log("Final Time: " + surfSessionTimeFinal)
      console.log("Final Date: " + surfSessionDateFinal)

      const { surfSessionData } = await createSurfSession({

        
        variables: { 
          userId: jwtToken.data._id,
          sessionDate: surfSessionDateFinal,
          sessionTime: surfSessionTimeFinal,
          sessionLocation: surfSessionForm.get("surfLocation"),
          skyConditions: surfSessionForm.get("skyConditions"),
          waveSize: surfSessionForm.get("waveSize"),
          tideLevel: parseFloat(surfSessionForm.get("tideLevel") + "." + surfSessionForm.get("tideLevelDecimal")),
          tideDirection: surfSessionForm.get("tideDirection"),
          sessionLength: surfSessionForm.get("sessionLengthHours") + ":" + surfSessionForm.get("sessionLengthMinutes"),
          surfboardShaper: surfSessionForm.get("surfboardShaper"),
          surfboardModel: surfSessionForm.get("surfboardModel"),
          surfboardLengthFt: parseInt(surfSessionForm.get("surfboardLengthFeet")),
          surfboardLengthIn: parseInt(surfSessionForm.get("surfboardLengthInches")),
          surfboardVolume: parseFloat(surfSessionForm.get("surfboardVolume") + "." + surfSessionForm.get("surfboardVolumeDecimal")),
          surfboardFinConfig: surfSessionForm.get("surfboardFinConfig"),
          sessionNotes: surfSessionForm.get("sessionNotes"),
          sessionRating: parseInt(surfSessionForm.get("sessionRating")),
        },
      });

      navigate("/surf_log/view_previous_sessions");
      window.location.reload(false);
    }


    //* Get List of surf sessions for user from Database
    var { loading, data } = useQuery(getShaperList_Q);


    function populateListOfShapers(shaperData) {

      //* Create List of shapers from data pull from Database
      shaperListHTML.push(<option key={shaperData._id}>{shaperData.shaperName}</option>)

    }

    if(!loading){
    // if(true){

      var shaperListHTML = []

      data.getShaperList.forEach(populateListOfShapers)

      // console.log(shaperListHTML)

      return (

        <div className="min-vh-100">
          <header className="">
            <Header />
          </header>

          <WeatherWidget />

          <form method="post" onSubmit={handleSurfSessionSubmit}>
            <div className="d-flex flex-row justify-content-center align-items-center smallBoxRow">
              <div className="d-flex p-2 mx-5">
                <div className="flex-col m-2 dateFont justify-content-center align-items-center">
                  Date:
                </div>
                <div name="sessionDate">
                  <DatePicker required="true" value={value} onChange={(newValue) => setDateValue(newValue)}/>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center smallBoxRow">
              <div className="p-2 dateFont">
                  Time:
              </div>
              <div className="timePicker">
                <div>
                  <TimePicker required="true" value={value} onChange={(newValue) => setTimeValue(newValue)} use12Hours/>
                </div>

              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center smallBoxRow">
              Location:&nbsp;&nbsp;
              <div>
                <input required type="text" defaultValue="???" name="surfLocation" className="locationInputBox d-flex justify-content-center align-items-center p-1" />
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center smallBoxRow">
              <div className="m-4 dateFont">
                  Sky Condtions: 
              </div>
              <select name="skyConditions" defaultValue="???" className="surfSessionDropDowns">
                <option value="???">???</option>
                <option value="Sunny">Sunny</option>
                <option value="Partly Sunny">Partly Sunny</option>
                <option value="Cloudy">Cloudy</option>
                <option value="Foggy">Foggy</option>
                <option value="Rainy">Rainy</option>
                <option value="Thunderstorms">Thunderstorms</option>
              </select>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center smallBoxRow">
              <div className="m-4 dateFont">
                  Wave Height: 
              </div>
              <select name="waveSize" defaultValue="???" className="surfSessionDropDowns">
                <option value="???">???</option>
                <option value="0-1">0-1 ft</option>
                <option value="1-2">1-2 ft</option>
                <option value="2-3">2-3 ft</option>
                <option value="3-4">3-4 ft</option>
                <option value="4-5">4-5 ft</option>
                <option value="5-6">5-6 ft</option>
                <option value="6-7">6-7 ft</option>
                <option value="7-8">7-8 ft</option>
                <option value="8-9">8-9 ft</option>
                <option value="10+">10+ ft</option>
              </select>
            </div>
            <div className="d-flex flex-row justify-content-around align-items-center smallBoxRow">
              <div className="mx-0 dateFont">
                  Tide: 
              </div>
              <div className="">
                <select name="tideLevel" defaultValue="0" className="surfSessionDropDowns ml-4">
                  <option>-3</option>
                  <option>-2</option>
                  <option>-1</option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
                <label>.</label>
                <select name="tideLevelDecimal" defaultValue="0" className="surfSessionDropDowns">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </select>
              </div>
              <div className="mx-0 dateFont">
                Direction: 
              </div>
                <select name="tideDirection" defaultValue="???" className="surfSessionDropDowns">
                  <option value="???">???</option>
                  <option value="Rising">Rising</option>
                  <option value="Falling">Falling</option>
                </select>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center smallBoxRow">
              <div className="m-1 sessionLengthLabel">
                  Session Length (H:MM)
              </div>
                <select name="sessionLengthHours" defaultValue="0" className="surfSessionDropDowns ml-4">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <label>:</label>
                <select name="sessionLengthMinutes" defaultValue="0" className="surfSessionDropDowns">
                  <option value="0">0</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </select>
            </div>
            <div className="surfboardMainBox">
              <div className="d-flex flex-row justify-content-left align-items-center surfboardSection">
                <div className="m-4 dateFont">
                  Shaper:
                </div>
                <select name="surfboardShaper" className="surfSessionDropDowns">
                  <option value="???">???</option>
                  {shaperListHTML}
                </select>
              </div>
              <div className="d-flex flex-row justify-content-left align-items-center surfboardSectionMiddle">
                <div className="m-4 dateFont">
                    Model: 
                </div>
                <input name="surfboardModel" className="modelInputBox p-1"/>
              </div>
              <div className="d-flex flex-row justify-content-left align-items-center surfboardSectionMiddle">
                <div className="m-4 dateFont">
                    Length:
                </div>
                  <select name="surfboardLengthFeet" className="surfSessionDropDowns">
                    <option >0</option>
                    <option >4</option>
                    <option >5</option>
                    <option >6</option>
                    <option >7</option>
                    <option >8</option>
                    <option >9</option>
                    <option >10</option>
                    <option >11</option>
                  </select>
                  <label className="ml-3"> FT</label>
                <div className=" ml-4">
                  <select name="surfboardLengthInches" className="surfSessionDropDowns">
                    <option >0</option>
                    <option >1</option>
                    <option >2</option>
                    <option >3</option>
                    <option >4</option>
                    <option >5</option>
                    <option >6</option>
                    <option >7</option>
                    <option >8</option>
                    <option >9</option>
                    <option >10</option>
                    <option >11</option>
                  </select>
                  <label className="ml-2"> IN</label>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-left align-items-center surfboardSectionMiddle">
                <div className="m-4 dateFont">
                    Volume:
                </div>
                  <select name="surfboardVolume" className="surfSessionDropDowns">
                    <option >00</option>
                    <option >20</option>
                    <option >21</option>
                    <option >22</option>
                    <option >23</option>
                    <option >24</option>
                    <option >25</option>
                    <option >26</option>
                    <option >27</option>
                    <option >28</option>
                    <option >29</option>
                    <option >30</option>
                    <option >31</option>
                    <option >32</option>
                    <option >33</option>
                    <option >34</option>
                    <option >35</option>
                    <option >36</option>
                    <option >37</option>
                    <option >38</option>
                    <option >39</option>
                    <option >40</option>
                    <option >41</option>
                    <option >42</option>
                    <option >43</option>
                    <option >44</option>
                    <option >45</option>
                  </select>
                  <label className="ml-3">.</label>
                <div className=" ml-2">
                  <select name="surfboardVolumeDecimal" className="surfSessionDropDowns">
                    <option >0</option>
                    <option >1</option>
                    <option >2</option>
                    <option >3</option>
                    <option >4</option>
                    <option >5</option>
                    <option >6</option>
                    <option >7</option>
                    <option >8</option>
                    <option >9</option>
                  </select>
                  <label className="ml-4"> L</label>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-left align-items-center surfboardSectionEnd">
                <div className="m-4 dateFont">
                    Fin Setup:
                </div>
                  <select name="surfboardFinConfig" className="surfSessionDropDowns">
                    <option >???</option>
                    <option >Single</option>
                    <option >Twin</option>
                    <option >Thruster</option>
                    <option >2+1</option>
                    <option >Quad</option>
                  </select>
              </div> 
            </div>
            <div>
              <label className="text-center textBox">
                Session Notes:
              <textarea name="sessionNotes" rows={6} cols={40} className="textEntry mb-4"/>
          </label>
            </div>
            
            <div className="d-flex flex-row justify-content-center align-items-center smallBoxRow">
              <div className="m-4 dateFont">
                  Session Rating: 
              </div>
                <select name="sessionRating" className="surfSessionDropDowns">
                  <option >0</option>
                  <option >1</option>
                  <option >2</option>
                  <option >3</option>
                  <option >4</option>
                  <option >5</option>
                </select>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center smallBoxRow endSpacer">
              <button type="button" type="submit" className="btn col btn-lg btn-block btn-success mx-3">Save</button>
              <button type="button" type="reset" className="btn col btn-lg mt-0 btn-block btn-danger mx-3">Reset</button>
            </div>
          </form>
          <footer className="mt-auto mb-0">
            <NavFooter />
          </footer>
        </div>
      )
    }
    else{
      return(
        <h1>Loading...</h1>
      )
    }
  }
  else {

    return(
      <div className="d-flex flex-column align-items-center justify-content-center">

        <LoginPage />

      </div>   
    )
  }
}

export default CreateNewSession;