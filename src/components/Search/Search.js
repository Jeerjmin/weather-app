import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
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
            <div>
                <SearchInput
                    placeholder="Укажите город"
                    onSearch={value => this.clickSearch(value)}
                    enterButton
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
