import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';

import { App } from './App';
import { MenuList } from './shared/components/menu-list/MenuList';

describe( '<App/>', () => {
  it( `should render Hello message`, () => {
    const wrapper = shallow( <App>hello</App> );

    expect( wrapper.contains(
      <div className={undefined}>
        <MenuList/>
        <div>hello</div>
      </div>
    ) ).to.equal( true );
  } );
} );
