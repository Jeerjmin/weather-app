import React from 'react';
import SVGInline from 'react-svg-inline';
import CloseSvg from '../../assets/close.svg'
import {deleteCard} from '../../actions/index'

class Card extends React.Component {



    render() {
        return (

            <div className="Card">
                <div className="CloseSvgDiv">
                    <SVGInline className="CloseSvg" svg={CloseSvg} onClick={() => this.props.deleteCity(this.props.index)}/>
                </div>

                <div className="NameTemp">
                    <h1>{this.props.name}</h1>
                    <h2>{this.props.temp}°C</h2>

                </div>
                <div className="CityImg">
                    <img src={this.props.img} alt={this.props.name}/>
                </div>
            </div>

        )
    }
}



export default Card
