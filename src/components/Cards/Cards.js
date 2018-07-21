import React       from 'react';
import Card from '../Card/Card'

class Cards extends React.Component {

    render() {
      console.log('cards cont', localStorage.getItem('username'))
        return (
            <div className="Cards">
                {this.props.data.map((city,i) => {

                  if (city.username === localStorage.getItem('username')) {
                    return (
                        < Card
                            key={i}
                            index={i}
                            name={city.name}
                            temp={city.temp}
                            img={city.img}
                            deleteCity = {this.props.deleteCity}
                        />
                    )
                  }
                })}
            </div>
        )
    }
}


export default Cards
