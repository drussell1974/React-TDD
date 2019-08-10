import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter, Link } from 'react-router-dom';
import {AppointmentsDayView} from './Appointment';
import {sampleAppointments} from  './sampleData';

import * as serviceWorker from './serviceWorker';
import { AppointmentForm } from './AppointmentForm';

const App = withRouter(({history}) => 
    <AppointmentsDayView appointments={sampleAppointments} />
);

const AppointmentFormWrapper = withRouter(({history}) => 
    <AppointmentForm today="{new Date(2019, 8, 10)" />
);

ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App} />
            <Route path="/add" component={AppointmentFormWrapper} />
            <Link to="/add">Add appointment</Link>
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
