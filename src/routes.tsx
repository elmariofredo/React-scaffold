import * as React from 'react';
import { hashHistory, IndexRoute, Router, Route, RouteConfig } from 'react-router';

import { App } from './App';
import { Home } from './home';
import { About } from './about';
import { Faq } from './faq';

const errorLoading = ( err: any ) => {
  console.error( 'Dynamic page loading failed', err );
};

const loadModule = ( cb ) => ( componentModule ) => {
  cb( null, componentModule );
};

export function createRoutes( /*store*/ ): RouteConfig[] {
  // Create reusable async injectors using getAsyncInjectors factory
  // const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    // {
    //   // path: '/',
    //   // name: 'home',
    //   // component: Home
    //
    //   // getComponent( nextState, cb ) {
    //   //   const importModules = Promise.all( [
    //   //     System.import( './home/Home' ),
    //   //   ] );
    //   //
    //   //   const renderRoute = loadModule( cb );
    //   //
    //   //   importModules.then( ( [component] ) => {
    //   //     renderRoute( component );
    //   //   } );
    //   //
    //   //   importModules.catch( errorLoading );
    //   // },
    // },
    {
      path: 'about',
      // name: 'about',
      getComponent( nextState, cb ) {
        const importModules = Promise.all( [
          System.import( './about/About' ),
        ] );

        const renderRoute = loadModule( cb );

        importModules.then( ( [component] ) => {
          renderRoute( component.About );
        } );

        importModules.catch( errorLoading );
      },
    },
    {
      path: 'faq',
      // name: 'faq',
      getComponent( nextState, cb ) {
        const importModules = Promise.all( [
          System.import( './faq/Faq' ),
        ] );

        const renderRoute = loadModule( cb );

        importModules.then( ( [component] ) => {
          renderRoute( component.Faq );
        } );

        importModules.catch( errorLoading );
      }
    },
    {
      path: '*',
      // name: 'notfound',
      getComponent( nextState, cb ) {
        System.import( './not-found/NotFound' )
          .then( loadModule( cb ) )
          .catch( errorLoading );
      },
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
