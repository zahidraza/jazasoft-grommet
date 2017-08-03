import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import MainRoute from '../MainRoute';
import AppHeader from './GAppHeader';
import GSidebar from './GSidebar';
import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';

class GLayout extends Component {

  constructor () {
    super();
    this.state = {
      drawerActive: false
    };
    this._openDrawer = this._openDrawer.bind(this);
    this._closeDrawer = this._closeDrawer.bind(this);
  }

  _openDrawer () {
    this.setState({drawerActive: true});
  }

  _closeDrawer () {
    this.setState({drawerActive: false});
  }

  render() {
    const { resources, dashboard, links, appName, appShortName, authClient, ...restProps } = this.props;
    let header;
    if (this.props.location.pathname != '/login') {
      header = <AppHeader {...restProps} authClient={authClient} appName={appName} onMenuOpen={this._openDrawer}/>;
    }

    var pane1 = this.state.drawerActive ? <GSidebar {...restProps} links={links} appShortName={appShortName} onHide={this._closeDrawer} /> : null;
    var pane2 =  (
      <Box>
        {header}
         <MainRoute {...restProps} resources={resources} dashboard={dashboard}/> 
      </Box>
    );

    return (
      <App centered={false}>
        <Split flex='right'>
          {pane1}
          {pane2}
        </Split>
      </App>
    );
  }
}

GLayout.propTypes = {
  resources: PropTypes.array,
  dashboard: PropTypes.element,
  appName: PropTypes.string.isRequired,
  appShortName: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired
};

export default withRouter(GLayout);