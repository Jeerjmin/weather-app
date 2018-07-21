import React from 'react';
import axios from 'axios'

import Search from '../../components/Search/Search'
import Cards from '../../components/Cards/Cards'
import AuthM from '../../modules/Auth.js';
import {API_KEY, API_URL} from '../../config'

import "./App.scss"



export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data:[],
        }
    }


    componentDidMount() {
        axios({
            method: 'get',
            url: `${API_URL}/get`
        })
            .then(response => {
                console.log('response get', response)
                this.setState({
                    data: response.data.cities
                })
            })
            .catch(error => console.log('error get', error.response))
    }

    clickSearch = (value) => {

        let dataRequest =  new Request
        (`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}`, {
            method: 'GET',
            mode: 'cors'
        });

        let photoRequest = new Request
        (`https://api.teleport.org/api/urban_areas/slug:${value.toLowerCase()}/images/`, {
            method: 'GET',
            mode: 'cors'
        });


        Promise.all([
            fetch(dataRequest)
                .then(response => {
                    if (response.ok) return response.json()
                    else return { error:'NoCity' }
                }),

            fetch(photoRequest)
                .then(response =>  {
                    if (response.ok) return response.json()
                    else return {error: 'NoPhoto'}
                })
        ])
            .then(json => {
                if (!json[0].error && !json[1].error) {
                    let city = {
                        name: json[0].name,
                        temp: (+json[0].main.temp-273.15).toFixed(2),
                        img: json[1].photos[0].image.web,
                        username: localStorage.getItem('username')
                    }

                    axios({
                        method: 'post',
                        url: `${API_URL}/add`,
                        data: city
                    })
                        .then(response => {
                            console.log('fetch add response',response)
                            city._id=response.data._id
                        })
                        .catch(error => console.log('fetch add error', error.response))

                    this.setState({ data: [city,...this.state.data] })
                }

                else if (json[1].error && !json[0].error) {
                    let city = {
                        name: json[0].name,
                        temp: (+json[0].main.temp-273.15).toFixed(2),
                        img: 'http://tutinteresno.com/wp-content/uploads/2015/10/nrgruplxira.jpg',
                        username: localStorage.getItem('username')
                    }

                    axios({
                        method: 'post',
                        url: `${API_URL}/add`,
                        data: city
                    })
                        .then(response => console.log('fetch add response',response))
                        .catch(error => console.log('fetch add error', error))

                    this.setState({ data: [city,...this.state.data] })
                }

                else alert('Города нету в базе')
            })

    }

    deleteCity = (index) => {
        console.log('delete',this.state.data[index]._id)
        axios({
            method: 'delete',
            url: `${API_URL}/delete`,
            data: {_id:this.state.data[index]._id}
        })
            .then(response => console.log('response delete', response))
            .catch(error => console.log('error delete', error.response))
        this.setState({
            data: this.state.data.filter((_item, i) => i !== index)
        })
    }


    render() {


        if (!AuthM.isUserAuthenticated()) {
            return(
                <div className="container">
                  <p>Hello, you are not logged in.</p>
                  <p>When you do this, you will be able to compile a list of cities (which will be saved in next session) for future use. </p>
                </div>
            )
        }

        return (
            <div className ="AppRoot">
                <div className ="SearchRoot">
                    < Search clickSearch = {this.clickSearch}/>
                </div>
                <div className = "CardsRoot">
                    < Cards
                        data = {this.state.data}
                        deleteCity = {this.deleteCity}
                    />
                </div>
            </div>
        )
    }
}
