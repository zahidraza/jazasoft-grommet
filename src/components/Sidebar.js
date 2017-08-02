import React from 'react';
import PropTypes from 'prop-types';

import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';

import Link from './MenuItemLink';

// const Sidebar = ({ links }) => {
//   const items = links.map((link, index)=> <Link key={index} to={`/${link.path}`} label={link.label}/>)
//   return (
//     <div>
      
//       <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
//         <h5>This is your Drawer.</h5>
//         {items}
//       </Drawer>
//     </div>
//   )
// };

class Sidebar extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };

  render () {
    const { links } = this.props;
    const items = links.map((link, index)=> <Link key={index} to={`/${link.path}`} label={link.label}/>)
    return (
      <div>
        <Button label='Show Drawer' raised accent onClick={this.handleToggle} />
        <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
          <h5>This is your Drawer.</h5>
          <p>You can embed any content you want, for example a Menu.</p>
          {items}
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  links: PropTypes.array
};

export default Sidebar;