import React, { useEffect, useState } from "react";
import './Tracker.css'


function Tracker() {
    const [data, setData] = useState([])
    const [submit, setSubmit] = useState("false")
    const [userInput, setUserInput] = useState('')

    useEffect(() => {
        setSubmit("false")
        setData('');
    }, [userInput])



    async function handleSubmit(e) {
        e.preventDefault();
        const url = userInput === ''
            ? ''
            : `https://disease.sh/v3/covid-19/countries/${userInput}`

        setSubmit("true")

        var result = await fetch(url)
        var resp = await result.json()
        setData(resp)
    }

    return (
        <div>

            <div className="covidData">
                <h1>Live</h1>
                <h2>COVID-19 TRACKER</h2>
                <div className="covidData__input">
                    <form onSubmit={handleSubmit}>
                        {/* input county name */}
                        <input type="text" name="cn" onChange={(e) => setUserInput(e.target.value)} placeholder="Enter Country Name" />
                        <br />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>

            {
                userInput !== '' && submit === "true"
                    ? data.country ?
                        <section className="covidData__live">
                            <ul>
                                <li className="card">
                                    <div className="card_main_blue card__main">
                                        <div class="icon gradient-7">
                                            <i class="fas fa-globe-asia"></i>
                                        </div>
                                        <div className="card_inner">
                                            
                                        <p className="card_total">{data.country}</p>
                                            <p className="card_name"><span> OUR </span> COUNTRY</p>
                                        </div>
                                    </div>
                                </li>

                                <li className="card">
                                    <div className="card_main_green card__main">
                                        <div class="icon gradient-4">
                                            <i class="fas fa-child"></i>
                                        </div>
                                        <div className="card_inner">
                                            
                                        <p className="card_total">{data.recovered}</p>
                                            <p className="card_name"><span> TOTAL </span> RECOVERED</p>
                                        </div>
                                    </div>
                                </li>

                                <li className="card">
                                    <div className="card_main_yellow card__main">
                                        <div class="icon gradient-12">
                                            <i class="fas fa-bed"></i>
                                        </div>
                                        <div className="card_inner">
                                            <p className="card_total">{data.active}</p>                                            
                                            <p className="card_name"><span> TOTAL </span> ACTIVE</p>
                                        </div>
                                    </div>
                                </li>

                                <li className="card">
                                    <div className="card_main_red card__main">
                                        <div class="icon gradient-9">
                                            <i class="fas fa-procedures"></i>
                                        </div>
                                        <div className="card_inner">
                                            <p className="card_total">{data.deaths}</p>                                            
                                            <p className="card_name"><span> TOTAL </span> DEATH</p>
                                        </div>
                                    </div>
                                </li>

                                <li className="card">
                                    <div className="card_main_darkblue card__main">
                                        <div class="icon gradient-1">
                                            <i class="fas fa-users"></i>
                                        </div>
                                        <div className="card_inner">
                                            <p className="card_total">{data.cases}</p>                                            
                                            <p className="card_name"><span> TOTAL </span> CASES</p>
                                        </div>
                                    </div>
                                </li>

                                <li className="card">
                                    <div className="card_main_brown card__main">
                                        <div class="icon gradient-3">
                                            <i class="fas fa-bell"></i>
                                        </div>
                                        <div className="card_inner">
                                            <p className="card_total">{data.updated}</p>                                            
                                            <p className="card_name"><span> LAST </span> UPDATED</p>
                                        </div>
                                    </div>
                                </li>


                            </ul>
                        </section>
                        : <p>{data.message}</p> : ''
            }
            <br />
        </div>

    )
}


export default Tracker