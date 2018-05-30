import React       from 'react';
import { connect } from 'react-redux';

import { bindActionCreators }       from 'redux';
import Card from '../Card/Card'

class Cards extends React.Component {
    constructor(props) {
        super(props);

    }




    render() {

        const cities = []


        this.props.data.map( (city,i) => {
            if (city.main) {
                cities.unshift([city.name,city.main.temp,this.props.photos[i].photo])
            }
        })



        console.log("cities",cities)

        return (
            <div className="Cards">
                {cities.map((city,i) => {
                    return (
                        < Card
                            key={i}
                            index={i}
                            name={city[0]}
                            temp={city[1]}
                            img={city[2]}
                            cities={cities}
                        />
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        data: state.data.data,
        photos: state.data.photos
    }
);

const matchDispatchToProps = dispatch => bindActionCreators(
    {

    },
    dispatch
)

export default connect(mapStateToProps, matchDispatchToProps)(Cards)
