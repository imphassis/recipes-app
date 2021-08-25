import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import laCookeryLogo from '../images/laCookery.svg';
import '../styles/Header.scss';
import HamburguerMenu from './HamburguerMenu';

function Header(props) {
  const { renderButton } = props;
  const [renderSearchBar, setRenderSearchBar] = useState(false);

  const showSearch = () => {
    if (renderButton) {
      return (
        <button
          className="search-button"
          type="button"
          onClick={ () => setRenderSearchBar(!renderSearchBar) }
        >
          <i className="fal fa-search" />
        </button>
      );
    }
  };

  return (
    <header>
      <nav className={ renderButton ? 'nav-3' : 'nav-2' }>
        <HamburguerMenu />
        <img src={ laCookeryLogo } alt="laCookery-logo" className="header-logo" />
        {showSearch()}
      </nav>
      {renderSearchBar ? <SearchBar /> : null}
    </header>
  );
}

Header.propTypes = {
  renderButton: PropTypes.bool.isRequired,
};

export default Header;
