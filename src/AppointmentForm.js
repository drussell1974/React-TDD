import React from 'react';

const toTimeValue = timestamp => new Date(timestamp).toTimeString().substring(0, 5);

const dailyTimeSlots = ({salonOpensAt, salonClosesAt}) => {
    
    console.log('Open:' + salonOpensAt + " Closes:" + salonClosesAt);

    const totalSlots = (salonClosesAt - salonOpensAt) * 2;
    const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
    const increment = 30 * 60 * 1000;
    console.log('totalSlots:' + totalSlots);
    return Array(totalSlots)
        .fill([startTime])
        .reduce((acc, _, i) =>
            acc.concat([startTime + (i * increment)])
        );
};

const TimeTableSlot = ({salonOpensAt, salonClosesAt}) => {
    const timeSlots = dailyTimeSlots({salonOpensAt, salonClosesAt});
    return (<table id="time-slots">
        <thead></thead>
        <tbody>
            {timeSlots.map(timeSlot => (
                <tr key={timeSlot}>
                    <th>{toTimeValue(timeSlot)}</th>
                </tr>
            )) }
        </tbody>
    </table>)
};

export const AppointmentForm = ({selectableServices, service, handleChange, salonOpensAt, salonClosesAt}) => (
    <form id="appointment">
        <select name="service" value={service} onChange={handleChange} readOnly>
            <option/>
            {selectableServices.map(s => (
                <option key={s}>{s}</option>
            ))}
       </select>
       <TimeTableSlot salonOpensAt={salonOpensAt} salonClosesAt={salonClosesAt} />
    </form>
);

AppointmentForm.defaultProps = {
    salonOpensAt: 9,
    salonClosesAt: 19,
    selectableServices: [
        'Cut',
        'Blow-dry'
    ]
}