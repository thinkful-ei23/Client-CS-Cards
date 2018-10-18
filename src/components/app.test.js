import React from 'react';
import { shallow } from 'enzyme';
import { App } from './app';

describe.only('<App />', () => {
  it('Should render without crashing', () => {
    shallow(<App />);
  });
});
 