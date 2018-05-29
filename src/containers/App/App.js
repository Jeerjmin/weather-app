import React from 'react';
import Search from '../../components/Search/Search'
import Cards from '../../components/Cards/Cards'

export default class App extends React.Component {
    render() {
        return (
            <div>
                < Search />
                < Cards />
            </div>
        )
    }
}
