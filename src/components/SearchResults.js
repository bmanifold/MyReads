import React, { Component } from 'react';
import Book from './Book';

class SearchResults extends Component {
  render() {
    const results = this.props.results || []
    const query = this.props.query
    let noResultsText = null

    if (query === '') {
      noResultsText = 'Please enter a search query'
    } else {
      noResultsText = `Your search for '${query}' returned no results.  Please try again.` 
    }

    return (
      <div className="search-books-results">
        { results.length ? 
          <ol className="books-grid">
            { results.map((result) => (
              <li key={result.id}><Book book={result} moveBook={this.props.moveBook} /></li>
            )) }
          </ol> : 
          <h3 className="no-results">{noResultsText}</h3>
        }
      </div>
    );
  }
}

export default SearchResults;

