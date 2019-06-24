import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { MemoryRouter } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';


// full mount
it('mounts without crashing', function() {
  shallow(
    <MemoryRouter>
      <PrivateRoutes 
        currUser="test"
        triggerApply={()=> null}
        />
    </MemoryRouter>
  );
});

// snapshot test
it('matches snapshot', function() {
  let wrapper = shallow(<PrivateRoutes />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
