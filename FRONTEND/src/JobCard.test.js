import React from 'react';
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { MemoryRouter } from 'react-router-dom';
import JobCard from './JobCard';


// full mount
it('mounts without crashing', function() {
  mount(
    <MemoryRouter>
      <JobCard 
        title="test" 
        salary={100}
        equity={0.10}
        applied="applied"/>
    </MemoryRouter>
  );
});

// snapshot test
it('matches snapshot', function() {
  let wrapper = shallow(<JobCard 
                          title="test" 
                          salary={100}
                          equity={0.10}
                          applied="applied"/>);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
