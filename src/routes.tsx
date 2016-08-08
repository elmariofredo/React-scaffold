import * as React from 'react';
import { hashHistory, Router, RouteConfig } from 'react-router';

import { App } from './App';
import { Home } from './home';
import { NotFound } from './not-found/NotFound';

const loadModule = ( cb ) => ( componentModule ) => {
  cb( null, componentModule );
};

const getObjectFirstKey = ( object ) => Object.keys( object )[0];

export function createRoutes( /*store*/ ): RouteConfig[] {
  // Create reusable async injectors using getAsyncInjectors factory
  // const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '*',
      getComponent( nextState, cb ) {

        System.import( `./${nextState.location.pathname.slice(1)}/index` )
          .then( ( component ) => {
            loadModule( cb )( component[ getObjectFirstKey( component ) ] );
          } )
          .catch( ( err: any ) => {

            console.error( 'Dynamic page loading failed', err );

            loadModule( cb )( NotFound );

          } );

      }
    }
  ];
}

const rootRoute: RouteConfig = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: createRoutes()
};

export const routes = (
  <Router history={hashHistory} routes={rootRoute}/>
);
