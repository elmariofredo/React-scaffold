import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';

import { App } from './App';

describe( '<App/>', () => {
  it( `should render Hello message`, () => {
    const wrapper = shallow(<App/>);

    expect( wrapper.contains(<div className={undefined}>Hello from Sofia!</div>) ).to.equal( true );
  } );
} );
