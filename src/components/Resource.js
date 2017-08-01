import React from 'react';
import PropTypes from 'prop-types';

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

const Resource = () => <span>&lt;Resource&gt; elements are for configuration only and should not be rendered</span>;

Resource.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  routes: PropTypes.array,
  reducer: PropTypes.func
};

Resource.defaultProps = {
};

export default Resource;

/*
  route: Array of 
  [
    {
      path:
      component:
    }
  ]
*/
