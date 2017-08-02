import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import MainRoute from '../MainRoute';

import Link from './MenuItemLink';
import GSidebar from './GSidebar';
import AppHeader from './GHeader';

import Anchor from 'grommet/components/Anchor';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Split from 'grommet/components/Split';



class AppLayout extends React.Component {

  // constructor () {
  //   super();
  //   this.state = {
  //     drawerActive: false
  //   };
  //   this.openDrawer = this.openDrawer.bind(this);
  //   this.closeDrawer = this.closeDrawer.bind(this);
  // }

  
  // componentWillMount() {
  //   console.log('check');
  //   this.setState({drawerActive: false});
  //   this.closeDrawer();
  // }
  
  // closeDrawer () {
  //   this.setState({drawerActive: false});
  // }

  // openDrawer () {
  //   console.log('open Drawer');
  //   this.setState({drawerActive: true});
  // }

  render () {
    // const { resources, dashboard, links } = this.props;
    // let header;
    // if (this.props.location.pathname != '/login') {
    //   header = <AppHeader onMenuOpen={this.openDrawer} />;
    // }

    // var pane1 = this.state.drawerActive ? <GSidebar links={links} onClose={this.closeDrawer} /> : null;
    // var pane2 =  (
    //   <Box>
    //     {header}
    //     <MainRoute resources={resources} dashboard={dashboard}/>
    //   </Box>
    // );


    return (
      <App centered={false}>
        <Split flex="right">
          <GSidebar />
          <Box>
            <AppHeader />
          </Box>
        </Split>
      </App>
    );
  }
}

AppLayout.propTypes = {
  sidebar: PropTypes.element,
  resources: PropTypes.array,
  dashboard: PropTypes.element,
  title: PropTypes.string
};

export default withRouter(AppLayout);