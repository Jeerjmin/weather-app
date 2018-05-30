import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import "../../../node_modules/antd/dist/antd.css"
import SVGInline from 'react-svg-inline';
import svg from '../../assets/search.svg'

import { Input } from 'antd';



const SearchInput = Input.Search;



import { fetchPosts, fetchPhotos } from '../../actions'

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.clickSearch = this.clickSearch.bind(this)
    }

    clickSearch(value) {




        this.props.fetchPosts(value, value.toLowerCase())
    }



    render() {



        return (
            <div className="Search">
                <SearchInput
                    className="SI"
                    placeholder="Enter name of city"
                    onSearch={value => this.clickSearch(value)}
                    style={{

                    }}
                    enterButton={<SVGInline className="SearchSvg" svg={svg} />}
                />


            </div>
        )
    }
}

const mapStateToProps = state => (
    {

    }

);

const matchDispatchToProps = dispatch => bindActionCreators(
    {
        fetchPosts, fetchPhotos
    },
    dispatch
)

export default connect(mapStateToProps, matchDispatchToProps)(Search)
