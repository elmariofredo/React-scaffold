import * as React from 'react';
import { hashHistory, Router, RouteConfig } from 'react-router';

import { App } from './App';
import { Home } from './home';
import { NotFound } from './not-found';

type ComponentModule = {
  'default': Function | React.ComponentClass<any> | React.StatelessComponent<any>
};

export function createRoutes( /*store*/ ): RouteConfig[] {
  // Create reusable async injectors using getAsyncInjectors factory
  // const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '*',
      getComponent( nextState: any, callback: ( error: Error, module: any ) => void ) {

        System.import( `.${ nextState.location.pathname }/index` )
          .then( ( module: ComponentModule ) => {

            callback( null, module.default );

          } )
          .catch( ( err: any ) => {

            console.error( 'Dynamic page loading failed', err );

            callback( null, NotFound );

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
