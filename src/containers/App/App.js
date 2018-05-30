import React from 'react';
import Search from '../../components/Search/Search'
import Cards from '../../components/Cards/Cards'
import "./App.scss"

export default class App extends React.Component {
    render() {
        return (
            <div className ="AppRoot">
                <div className ="SearchRoot">
                    < Search />
                </div>
                <div className = "CardsRoot">
                    < Cards />
                </div>
            </div>
        )
    }
}
