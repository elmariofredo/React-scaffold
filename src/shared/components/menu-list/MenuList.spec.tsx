import { shallow } from 'enzyme';
import { expect } from 'chai';
import * as React from 'react';

import { MenuList } from './MenuList';

describe( `<MenuList/>`, () => {
  it( `should render 3 menu items`, () => {
    const wrapper = shallow(<MenuList/>);
    expect( wrapper.find('li').length ).to.equal( 3 );
  } );
} );
