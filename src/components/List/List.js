import React, {Component} from 'react'
import {handleResponse} from '../../utils/helpers'
import {API_URL} from '../../utils/api'
import Loader from '../Loader/Loader'
import Table from '../Table/Table'
import Pagination from '../Pagination/Pagination'

export default class List extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1
        }
        this.handlePagination = this.handlePagination.bind(this)
    }

    componentDidMount() {
        this.fetchCurrencies()
    }

    // render arrow
    renderChangeArrow (percent) {
        if (percent > 0) {
            return <span className="percent-raised">{percent}% &uarr;</span>  
        } else if (percent < 0) {
            return <span className="percent-fallen">{percent}% &darr;</span>  
        } else {
            return <span>{percent}</span>
        }
    }

    // Handle Pagination
    handlePagination (direction) {
        let nextPage = this.state.page
        nextPage = (direction === "next") ? nextPage + 1 : nextPage - 1
        this.setState({page: nextPage}, () => {
            // call fetchCurrencies() inside callback as this thing runs after the state is update
            this.fetchCurrencies()
        })
    }

    // fetch currencies
    fetchCurrencies() {
        const {page} = this.state
        this.setState({loading: true})
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(handleResponse)
        .then((data) => {
            const {currencies, totalPages} = data 
            this.setState({loading: false, currencies, totalPages})
        })
        .catch((error) => {
            this.setState({error: error.errorMessage, loading: false})
        })
    }

    render() {
        const {loading, error, currencies, page, totalPages} = this.state
        if (loading) {
            return (
                <div className="loading-container"><Loader/></div>
            )
        }

        if (error) {
            return(
                <div className="error">
                    {error}
                </div>
            )
        }

        return(
            <div>
                <Table currencies={currencies} renderChangeArrow={this.renderChangeArrow}/>
                <Pagination page={page} totalPages={totalPages} handlePagination={this.handlePagination}/>
            </div>
        )
    }

}