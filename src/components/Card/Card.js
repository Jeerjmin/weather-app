import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SVGInline from 'react-svg-inline';
import CloseSvg from '../../assets/close.svg'
import {deleteCard} from '../../actions/index'

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.clickClose = this.clickClose.bind(this)
    }


    clickClose(i) {
        this.props.deleteCard(i)
    }

    render() {

        console.log("key", this.props.index)


        return (

            <div className="Card">
                <div className="CloseSvgDiv">
                    <SVGInline className="CloseSvg" svg={CloseSvg} onClick={(e) => this.clickClose(this.props.index)}/>
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

const mapStateToProps = () => (
    {

    }
)

const matchDispatchToProps = dispatch => bindActionCreators(
    {
        deleteCard
    },
    dispatch
)

export default connect(mapStateToProps, matchDispatchToProps)(Card)
