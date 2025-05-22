import React from 'react';
import PropTypes from 'prop-types';
import { ThemeConsumer } from 'styled-components';
import { IconButton } from './IconButton';
import { navigate } from 'gatsby'; // Import Gatsby's navigate function

export const SearchButton = props => (
  <ThemeConsumer>
    {theme => (
      <IconButton
        icon={theme.icons.Search}
        {...props}
        onClick={() => navigate("/search")} // Add navigation function
      />
    )}
  </ThemeConsumer>
);

SearchButton.propTypes = {
  variant: PropTypes.string
};
