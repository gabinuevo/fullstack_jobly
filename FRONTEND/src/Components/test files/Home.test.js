import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';


// full mount
it('mounts without crashing', function() {
  mount(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
});

// snapshot test
it('matches snapshot', function() {
  let wrapper = shallow(<Home />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
