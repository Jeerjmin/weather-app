import React from 'react';
import "../../../node_modules/antd/dist/antd.css"
import SVGInline from 'react-svg-inline';
import svg from '../../assets/search.svg'
import { Input } from 'antd';

const SearchInput = Input.Search;

class Search extends React.Component {

    clickSearch = (value) => {
        this.props.fetchPosts(value, value.toLowerCase())
    }

    render() {
        return (
            <div className="Search">
                <SearchInput
                    className="SInput"
                    placeholder="Enter name of city"
                    onSearch={value => this.props.clickSearch(value)}
                    enterButton={<SVGInline className="SearchSvg" svg={svg} />}
                />


            </div>
        )
    }
}



export default Search
