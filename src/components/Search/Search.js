import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {API_URL} from '../../utils/api'
import {handleResponse}from '../../utils/helpers'

import Loader from '../Loader/Loader'

import './Search.css'

class Search extends Component {
    constructor() {
        super()
        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.fetchList = this.fetchList.bind(this)
        this.handleRedirect =this.handleRedirect.bind(this)
    }

    // Handle input change
    handleChange(event) {
        const searchQuery = event.target.value
        this.setState({searchQuery})

        if (!searchQuery) {
            this.setState({searchResults: []})
            return ''
        }
        this.setState({loading: true})
        this.fetchList(searchQuery)
    }

    // fetch list from API based on user query
    fetchList(value) {
        fetch(`${API_URL}/autocomplete?searchQuery=${value}`)
        .then(handleResponse)
        .then(result => {
            this.setState({loading: false, searchResults: result})
        })
    }

    // render list of search result
    renderSearchResults() {
        const {searchResults, searchQuery, loading} = this.state

        if (!searchQuery) {
            return '';
        }

        if (searchResults.length > 0) {
            return(
                <div className="Search-result-container">
                    {searchResults.map(result => (
                        <div className="Search-result" key={result.id} onClick={() => this.handleRedirect(result.id)}>
                            {result.name} ({result.symbol})
                        </div>
                    ))}
                </div>
            )
        }
        if(!loading) {
            return (
                <div className='Search-result-container'>
                    <div className="Search-no-result">
                        No Result Found
                    </div>
                </div>
            )
        }
    }

    // handle page redirect
    handleRedirect(currencyId) {
        this.setState({
            searchQuery: '',
            searchResults:[]
        })

        this.props.history.push(`/currency/${currencyId}`)
    }

    render() {
        const {loading, searchQuery} = this.state
        return  (
            <div className="Search">
                <span className="Search-icon"/>
                <input className="Search-input" placeholder="Currency Name" type="text" onChange={this.handleChange} value={searchQuery}/>
                {loading && 
                <div className="Search-loading">
                    <Loader width='12px' height='12px'/>
                </div>}
                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter(Search)