import React, { Component } from 'react';
import { YEARS } from './years';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      years: YEARS,
      selectedFilterYear: null,
      successfulLaunch: null,
      successfulLanding: null,
      loader: true
    }
  }

componentDidMount(){
  this.getApiData();
}

getApiData = () => {
  let API_URL = "https://api.spacexdata.com/v3/launches?limit=100";
  if(this.state.successfulLaunch && (API_URL += '&launch_success=true'));
  if(this.state.successfulLanding && (API_URL += '&land_success=true'));
  if(this.state.selectedFilterYear && (API_URL += `&launch_year=${this.state.selectedFilterYear}`));

  fetch(API_URL).then(res => res.json().then(data => this.setState({data, loader: false})))
}

yearFilter = (year) => {
  this.setState({ selectedFilterYear: year, loader: true }, ()=> this.getApiData());
}

successfulLaunch = (val) => {
  this.setState({ successfulLaunch: val, loader: true }, ()=> this.getApiData());
}

successfulLanding = (val) => {
  this.setState({successfulLanding: val, loader: true}, ()=> this.getApiData())
}

render(){
  return (
    <div>
      <h1 className="main-heading">SpaceX Launch Programs</h1>
      
      {/* FILTERS CARD */}
      <aside>
        <h3>Filters</h3>
        <span className="launch-year">Launch Year</span>
        {this.state.years && this.state.years.length>0 && this.state.years.map((year) => { 
          return (
            <button value={year} onClick={()=> this.yearFilter(year)} style={{backgroundColor: this.state.selectedFilterYear === year ? "rgba(99, 140, 15, .8)" : "rgba(99, 140, 15, .3)"}} className="year-btn" >{year}</button>
          )
         })}

        <span className="launch-year">Successful Launch</span>
        <button value={true} onClick={()=> this.successfulLaunch(true)} style={{backgroundColor: this.state.successfulLaunch === true ? "rgba(99, 140, 15, .8)" : "rgba(99, 140, 15, .3)"}} className="year-btn" >True</button>

        <button value={false} onClick={()=> this.successfulLaunch(false)} style={{backgroundColor: this.state.successfulLaunch === false ? "rgba(99, 140, 15, .8)" : "rgba(99, 140, 15, .3)"}} className="year-btn" >False</button>


        <span className="launch-year">Successful Landing</span>
        <button value={true} onClick={()=> this.successfulLanding(true)} style={{backgroundColor: this.state.successfulLanding === true ? "rgba(99, 140, 15, .8)" : "rgba(99, 140, 15, .3)"}} className="year-btn" >True</button>

        <button value={false} onClick={()=> this.successfulLanding(false)} style={{backgroundColor: this.state.successfulLanding === false ? "rgba(99, 140, 15, .8)" : "rgba(99, 140, 15, .3)"}} className="year-btn" >False</button>

      </aside>


      {/* SPACE-X DATA CARDS */}
      <div className="container">
        {this.state.data && this.state.data.length>0 && this.state.data.map((data, i) => {
          return(
            <div className="sub-container">
              <img src={data.links.mission_patch_small} className="mission-img" />
              <h2 className="mission-title">{data.mission_name} #{i+1}</h2>
              <h3 className="common-h3">Mission Ids: </h3>
              <ul className="mission-ul">
                {data.mission_id.length>0 && data.mission_id.map((mission) => {
                  return(
                      <li className="mission-li">{mission}</li>
                  )
                })}
              </ul>
              <h3 className="common-h3">Launch Year: <span className="common-h3-span">{data.launch_year}</span></h3>
              <h3 className="common-h3">Successful Launch: <span className="common-h3-span">{data.launch_success ? 'true' : 'false'}</span></h3>
              <h3 className="common-h3">Successful Landing: <span className="common-h3-span">{data.landing_intent ? 'true' : 'false'}</span></h3>
            </div>
          )
        })}
      </div>






        {this.state.loader && <p className="loading">Loading...</p>}

    </div>
  )
}

}

export default App;
