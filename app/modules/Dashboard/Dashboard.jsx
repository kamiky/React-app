/**
 * app/modules/Dashboard/Dashboard.jsx
 *
 * Dashboard Page
 */

import React from 'react';
import Wrapper from '_components/Dashboard/Wrapper.jsx';
import SquareContent from '_components/Dashboard/SquareContent.jsx';
import { Grid, Row, Col } from 'react-flexbox-grid';

import AppMem from './AppMem.jsx'
import AppCpu from './AppCpu.jsx'
import AppStatus from './AppStatus.jsx'
import AppGraph from './AppGraph.jsx'
import ServerInfo from './ServerInfo.jsx'
import AppList from './AppList.jsx'

export default class Dashboard extends React.Component {
  render() {
    return (
     <Grid fluid id='dashboard'>
	     <Row>
	     	<Col xs={12} sm={9} md={9} lg={10}>
		        <Row>
		          <Col xs={12} sm={6} md={4}>
		            <AppStatus />
		          </Col>
		          <Col xs={12} sm={6} md={4}>
		            <AppCpu />
		          </Col>
		          <Col xs={12} sm={6} md={4}>
		            <AppMem />
		          </Col>
		        </Row>
		        <Row>
		        <Col xs={12}>
		            <AppGraph />
		         </Col>
		        </Row>
		        <Row>
		        <Col xs={12}>
		            <Wrapper />
		         </Col>
		        </Row>
          	</Col>
	     	<Col xs={12} sm={3} md={3} lg={2}>
	     		<ServerInfo />
	     		<AppList />
          	</Col>
        </Row>
      </Grid>
    )
  }
}
