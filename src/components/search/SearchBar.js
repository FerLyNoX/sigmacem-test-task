import { Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function SearchBar({ search, setSearch }) {
  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(inputValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue, setSearch]);

  return (
    <div className="search-bar-container">
      <div className="search-icon">
        <Search size={20} />
      </div>
      <div className="search-input-container">
        <Form.Control
          type="text"
          placeholder="Search for products"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func.isRequired,
};
SearchBar.defaultProps = {
  search: '',
};

export default SearchBar;
