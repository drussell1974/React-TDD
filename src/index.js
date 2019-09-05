import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter, Link } from 'react-router-dom';
import {CustomerForm} from './CustomerForm';
import {AppointmentsDayView} from './Appointment';
import {sampleAppointments, sampleCustomers} from  './sampleData';

import * as serviceWorker from './serviceWorker';
import { AppointmentForm } from './AppointmentForm';

const App = withRouter(({history}) => 
    <AppointmentsDayView appointments={sampleAppointments} />
);

const today = new Date();

const availableTimeSlots = [
    {startsAt: today.setHours(9, 0, 0, 0)},
    {startsAt: today.setHours(9, 30, 0, 0)}
]

const CustomerFormWrapper = withRouter(({history}) =>
    <CustomerForm customers={sampleCustomers} />
);

const AppointmentFormWrapper = withRouter(({history}) => 
    <AppointmentForm 
        today={new Date(2019, 8, 10)} 
        startsAt={availableTimeSlots[0].startsAt}
        availableTimeSlots={availableTimeSlots} />
);

ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App} />
            <Route path="/add" component={AppointmentFormWrapper} />
            <Route path="/add_customer" component={CustomerFormWrapper} />
            <Link to="/add">Add appointment</Link>
            <Link to="/add_customer">Add customer</Link>
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
