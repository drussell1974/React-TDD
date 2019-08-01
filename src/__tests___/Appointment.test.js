import React from 'react';
import ReactDOM from 'react-dom';
import { Appointment, AppointmentsDayView } from '../Appointment';
import ReactTestUtils from 'react-dom/test-utils';

describe('Appointment', () => {

  let container;
  let customer;

  beforeEach(() => {
    container = document.createElement('div');
  })
  
  it('renders the customer first name', () => {
    customer = { firstName:'Ashley'};
    ReactDOM.render(<Appointment customer={customer} />, container);
    expect(container.textContent).toMatch('Ashley');
  })

  it('renders another customer first name', () => {
    customer = { firstName:'Jordan'};
    ReactDOM.render(<Appointment customer={customer} />, container);
    expect(container.textContent).toMatch('Jordan');
  })
});

describe('AppointmentsDayView', () => {
  let container;
  const today = new Date();
  let appointments;

  beforeEach(() => {
    container = document.createElement('div');    
    appointments = [
      {
        startsAt:today.setHours(12, 0),
        customer:{firstName:'Ashley'}
      },
      {
        startsAt:today.setHours(13, 0),
        customer:{firstName:'Jordan'}
      }
    ];
  })

  const render = component => ReactDOM.render(component, container);


  it('renders a div with right id', () => {
    render(<AppointmentsDayView appointments={[]} />);
    
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
  })
  

  it('renders multiple appointments in an ol', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelector('ol')).not.toBeNull();
    expect(
      container.querySelector('ol').children
    ).toHaveLength(2);
  })


  it('renders each appointment in a li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
    expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');    
  });

  
  it('initially shows a message saying no appointments', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch('There are no appointments scheduled for today.');
  });

  
  it('select first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch('Ashley');
  });


  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(
        container.querySelectorAll('li > button')
      ).toHaveLength(2);
    expect(
        container.querySelectorAll('li > button')[0].type
      ).toEqual('button');
    });

    
    it('renders another appointment when selected', () => {
      render(<AppointmentsDayView appointments={appointments} />);
      const button = container.querySelectorAll('button')[1];
      ReactTestUtils.Simulate.click(button);
      expect(container.textContent).toMatch('Jordan');
    });
})