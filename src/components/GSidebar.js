import React from 'react';
import PropTypes from 'prop-types';

import Link from './MenuItemLink';

const GSidebar = ({ links }) => {
  const items = links.map((link, index)=> <Link key={index} to={`/${link.path}`} label={link.label}/>)
  return (
    <div>
      {items}
    </div>
  )
};

GSidebar.propTypes = {
  links: PropTypes.array
};

export default GSidebar;