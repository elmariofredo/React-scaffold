import * as React from 'react';
import { render } from 'react-dom';

import './styles.css';
import { routes } from './routes';

render( routes, document.getElementById( 'app' ) );
