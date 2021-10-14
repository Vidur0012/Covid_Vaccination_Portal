// import './Homepage.css'
// import React from 'react'
// function Homepage({setloginuser})
// {
//     return(
//         <div className="Homepage">
//             <h1>Hello Homepage</h1>
//             <button type="submit" onClick={()=>setloginuser({})}>Logout</button>
             
//         </div>
//     )
// }

// export default Homepage



import React,{useEffect,useState} from "react";
//import './Covid.css'


function Homepage({setloginuser})
{
    const [data,setData]=useState([])
    const [submit,setSubmit]=useState("false")
    //const [countryinfo,setCountryInfo]=({})
    const [userInput,setUserInput]=useState('')
//    function getCovidData()
//    {
      
//    }
//    https://data.covid19india.org/data.json
   
    useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/countries')
        .then((result)=>result.json())
        .then((resp)=>{
              setData(resp)
            // console.log(resp)
            })
    
    },[])

    

    function handleSubmit(e)
    {
        e.preventDefault();
        console.log(userInput);
        const url= userInput === ''
                  ?''
                  : `https://disease.sh/v3/covid-19/countries/${userInput}`

        setSubmit("true")
        
        fetch(url)
        .then((result)=>result.json())
        .then( (resp) =>{
             setData(resp)
            // setCountryInfo(resp)
             console.log(data)
            })
        
    }
    return(
        <div>

           <div className="covidData">
               <h1>Live</h1>
               <h2>COVID-19 CORONAVIRUS TRACKER COUNTRY WISE</h2><br/><br/>
               <div className="covidData__input">
               <form onSubmit={handleSubmit}> 
                {/* input county name */}
                    <input type="text" name="cn"  onChange={(e)=>setUserInput(e.target.value)}  placeholder="Enter Country Name" />
                    <br />
                    <button type="submit">Search</button>
                </form>
                </div>
            </div>
          
          {
            userInput!=='' &&  submit==="true"
            ?
            <section>
            <ul>
               <li className='card'>
                   <div className='card_main_blue'>
                       <div className='card_inner'>
                             <p className='card_name'><span> OUR </span> COUNTRY</p>
                             <p className='card_total'>{data.country}</p>
                       </div>
                   </div>
               </li>
        
               <li className='card'>
                   <div className='card_main_green'>
                       <div className='card_inner'>
                             <p className='card_name'><span> TOTAL </span> RECOVERED</p>
                             <p className='card_total'>{data.recovered}</p>
                       </div>
                   </div>
               </li>

               <li className='card'>
                   <div className='card_main_yellow'>
                       <div className='card_inner'>
                             <p className='card_name'><span> TOTAL </span> ACTIVE</p>
                             <p className='card_total'>{data.active}</p>
                       </div>
                   </div>
               </li>

               <li className='card'>
                   <div className='card_main_red'>
                       <div className='card_inner'>
                             <p className='card_name'><span> TOTAL </span> DEATH</p>
                             <p className='card_total'>{data.deaths}</p>
                       </div>
                   </div>
               </li>

               <li className='card'>
                   <div className='card_main_darkblue'>
                       <div className='card_inner'>
                             <p className='card_name'><span> TOTAL </span> CASES</p>
                             <p className='card_total'>{data.cases}</p>
                       </div>
                   </div>
               </li>

               <li className='card'>
                   <div className='card_main_brown'>
                       <div className='card_inner'>
                             <p className='card_name'><span> LAST </span> UPDATED</p>
                             <p className='card_total'>{data.updated}</p>
                       </div>
                   </div>
               </li>

               
           </ul>
           </section> 
         :''
        }
        <button type="submit" onClick={()=>setloginuser({})}>Logout</button>
        </div>
        
    )
}


export default Homepage