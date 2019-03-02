import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import * as BooksAPI from '../BooksAPI'

class Search extends Component {
  state = {
    results: [],
    query: ''
  }

  bookIdState = () => {
    return this.props.books.reduce((obj, book) => {
      obj[book.id] = book.shelf 
      return obj
    }, {})
  }

  updateSearchResults = (query) => {
    if (query === '') {
      this.setState({results: [], query: ''})
      return
    }

    BooksAPI.search(query)
      .then((results) => {
        this.setState({
          results: results.error ? [] : this.filterResults(results),
          query: query
        })
      })
  }

  // Remove search results that do not have image links
  filterResults = (results) => {
    const x = this.bookIdState()
    return ( results
      .filter((result) => result.imageLinks)
      .map((result) => {
        result.shelf = x[result.id] || 'none'
        return result
      })
    )
  }

  setResultShelf = (book, shelf) => {
    return this.state.results.map((result) => {
      if (result.id === book.id)
        result.shelf = shelf
      return result
    })
  }

  moveSearchResult = (book, shelf) => {
    this.props.moveBook(book, shelf)
    this.setState((curState) => ({
      results: this.setResultShelf(book, shelf)
    }))
  }

  render() {
    return (
      <div className="search-books">
        <SearchBar onSearch={this.updateSearchResults} />
        <SearchResults 
          results={this.state.results}
          query={this.state.query}
          moveBook={this.moveSearchResult}
        />
      </div>
    );
  }
}

export default Search;
