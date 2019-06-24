import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { MemoryRouter } from 'react-router-dom';
import CompanyCard from '../CompanyCard';


// full mount
it('mounts without crashing', function() {
  mount(
    <MemoryRouter>
      <CompanyCard 
        handle="test" 
        logo_url="www.test.com"
        name="test"
        description="test description"/>
    </MemoryRouter>
  );
});

// snapshot test
it('matches snapshot', function() {
  let wrapper = shallow(<CompanyCard 
                          handle="test" 
                          logo_url="www.test.com"
                          name="test"
                          description="test description"/>);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
