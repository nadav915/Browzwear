import React, { Component } from 'react';
import Navbar from './components/Navbar/NavBar';
import Clients from './assets/clients';
import Datalist from './components/Datalist/Datalist';
import classes from './App.css';
import Map from './containers/Map/MapContainer';
class App extends Component {
  state ={
    countries:{},
    countriesNames:[],
    citys:{},
    citiesNames:[],
    companiesNames:[],
    companies:[],
    companieAddress:"",
    load:false,
    selectedElement:{
      Country:"",
      City:"",
      Companie:""
    }
  }
//parsing json file to countries,cities and companies
  componentDidMount()
  {
    if(!this.state.load){
       let compObj ={};
      for(let comp of Clients.Customers)
      {
        if(compObj[comp.Country]===undefined)
        {
          compObj[comp.Country] ={[comp.City]:[comp]}
        }
        else{
          if(compObj[comp.Country][comp.City]===undefined){
            compObj[comp.Country][comp.City]=[comp];
          }
          else{
            compObj[comp.Country][comp.City].push(comp);
          }
        }
      }
      const countriesNames = this.sortCountries(Object.keys(compObj),compObj);
      const citys = compObj[countriesNames[0]];
      const citiesNames = this.sortCities(Object.keys(citys),citys);
      const companies = citys[[Object.keys(citys)[0]]];
      const companiesName = companies.map(comp=> comp.CompanyName);
      const companieAddress = companies[0].Country+" "+ companies[0].City+" "+companies[0].Address;
      this.setState({countries:compObj,countriesNames:countriesNames,citys:citys,citiesNames:citiesNames,
        companiesNames:companiesName,
        companies:companies,companieAddress:companieAddress, 
        load:true,
        selectedElement:{
          Country:countriesNames[0],
          City:citiesNames[0],
          Companie:companiesName[0]
        }});
     
    }
    }
    //gets the element the user clicked on and the number of the list and updating the state accordingly
  listClickHandler=(element,numOfList)=>{
    switch(numOfList){
      case(1):
      const citys = this.state.countries[element];
      const citiesNames = this.sortCities(Object.keys(citys),citys);
      const compenies = citys[[Object.keys(citys)[0]]];
      const compeniesNames = compenies.map(comp=> comp.CompanyName);
      const Address = compenies[0].Country+" "+ compenies[0].City+" "+compenies[0].Address;
      const selectedElement = {Country:element,City:citiesNames[0],Companie:compeniesNames[0]}
      this.setState({citys:citys,citiesNames:citiesNames,companiesNames:compeniesNames,companies:compenies,companieAddress:Address,selectedElement:selectedElement});
      break;
      case(2):
      const comenies = this.state.citys[element];
      const compeniesName = comenies.map(comp=> comp.CompanyName);
      const companieAddres = comenies[0].Country+" "+ comenies[0].City+" "+comenies[0].Address;
      const selectedElements = {Country:this.state.selectedElement.Country,City:element,Companie:compeniesName[0]};
      this.setState({companiesNames:compeniesName,companies:comenies,companieAddress:companieAddres,selectedElement:selectedElements});
      break;
      case(3):
      const selecteElements = {Country:this.state.selectedElement.Country,City:this.state.selectedElement.City,Companie:element};
      const companie = this.state.companies.filter(comp=>{
        return comp.CompanyName===element;
      });
      const companieAddress = companie[0].Country+" "+ companie[0].City+" "+companie[0].Address;
      this.setState({companieAddress:companieAddress,selectedElement:selecteElements});
      break;
    }

  }
  //sorting throw the countries list
  sortCountries=(arr,countries)=>{
    const sortedarr = arr.sort((a,b)=>{
      return Object.keys(countries[b]).length - Object.keys(countries[a]).length;
    })
    return sortedarr;
  }
//sorting throw the cities list
  sortCities=(arr,cities)=>{
    const sortedarr = arr.sort((a,b)=>{
      return cities[b].length - cities[a].length;
    })
    return sortedarr;
  }

  render() {
    
    return (
      <div className={classes.App}>
        <div className={classes.Container}>
        <Navbar/>
        <div className={classes.List}> 
        <Datalist selected={this.state.selectedElement.Country} numOfList={1} click={this.listClickHandler} elements={this.state.countriesNames} />
        <Datalist selected={this.state.selectedElement.City} numOfList={2}  click={this.listClickHandler} elements={this.state.citiesNames} />
        <Datalist selected={this.state.selectedElement.Companie} numOfList={3}  click={this.listClickHandler} elements={this.state.companiesNames} />
        <Map address={this.state.companieAddress}/>
        </div>
        </div>
      </div>
    );
  }
}


export default App;
