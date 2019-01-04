import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import MainRoute from '../MainRoute';
import AppHeader from './GAppHeader';
import GSidebar from './GSidebar';
import TSnackbar from './TSnackbar';
import GNotification from './GNotification';
import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Paragraph from 'grommet/components/Paragraph';

class GLayout extends Component {

  constructor () {
    super();
    this.state = {
      drawerActive: false,
      fixedSidebar: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this._onResponsive = this._onResponsive.bind(this);
  }

  _onResponsive (param) {
    if (param == 'single') {
      this.setState({fixedSidebar: true});
    } else {
      this.setState({fixedSidebar: false});
    }
  }

  toggleDrawer () {
    this.setState({drawerActive: !this.state.drawerActive});
  }

  render() {
    const { resources, customRoutes, loading, appName, appShortName, authClient, authenticator, ...restProps } = this.props;

    //Create links based on authorization
    let links = [];
    if (authenticator) {
      resources.forEach(r => {
        if (authenticator.authorize(r.name)) {
          links.push({label: r.label, path: r.name})
        }
      });
    } else {
      links = resources.map(({label, name}) => ({label, path: name}));
    }
    

    let header;
    if (this.props.location.pathname != '/login') {
      header = <AppHeader {...restProps} authClient={authClient} appName={appName} toggleMenu={this.toggleDrawer}/>;
    }

    let footer;
    footer = (
      <Footer justify='between' pad='medium'>
        <Title>
          Title
        </Title>
        <Box direction='row'
          align='center'
          pad={{'between': 'medium'}}>
          <Paragraph margin='none'>
            © 2016 Grommet Labs
          </Paragraph>
        </Box>
      </Footer>
    );

    var pane1 = !this.state.drawerActive ? null : 
    (
      <GSidebar {...restProps} 
        fixed={this.state.fixedSidebar} 
        links={links} 
        appShortName={appShortName}
        toggleMenu={this.toggleDrawer}  />
    );
    var pane2 =  (
      <Box justify='between' >
        <Box> 
          {header}
          <MainRoute {...restProps} authClient={authClient} authenticator={authenticator} resources={resources} customRoutes={customRoutes} /> 
        </Box>
      </Box>
    );

    return (
      <div>
        <App centered={false}>
          <Split flex='right' showOnResponsive='both' onResponsive={this._onResponsive} >
            {pane1}
            {pane2}
          </Split>
        </App>
        <TSnackbar />
        <GNotification />
        {loading && React.createElement(loading, {...restProps})}
      </div>
    );
  }
}
const componentPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string
]);

GLayout.propTypes = {
  resources: PropTypes.array,
  customRoutes: PropTypes.array,
  loading: PropTypes.oneOfType([PropTypes.func,PropTypes.string]),
  appName: PropTypes.string.isRequired,
  appShortName: PropTypes.string.isRequired
};

export default withRouter(GLayout);