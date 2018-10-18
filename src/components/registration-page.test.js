import React from 'react';
import { shallow } from 'enzyme';
import { RegistrationPage } from './registration-page';

describe.only('<RegistrationPage />', () => {
  it('Should render without crashing', () => {
    shallow(<RegistrationPage />);
  });
});