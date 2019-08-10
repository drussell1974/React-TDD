import React from 'react';

const toTimeValue = timestamp => new Date(timestamp).toTimeString().substring(0, 5);

const dailyTimeSlots = ({salonOpensAt, salonClosesAt}) => {
    const totalSlots = (salonClosesAt - salonOpensAt) * 2;
    const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
    const increment = 30 * 60 * 1000;
    return Array(totalSlots)
        .fill([startTime])
        .reduce((acc, _, i) =>
            acc.concat([startTime + (i * increment)])
        );
};

const weeklyDateValues = (startDate) => {
    const midnight = new Date(startDate).setHours(0,0,0);
    const increment = 24 * 60 * 60 * 1000;
    return Array(7)
        .fill([midnight])
        .reduce((acc, _, i) =>
            acc.concat([midnight + (i * increment)])
        );
};

const toShortDate = timestamp => {
    const [day, , dayOfMonth] = new Date(timestamp)
        .toDateString()
        .split(' ');
    return `${day} ${dayOfMonth}`;
}

const TimeTableSlot = ({salonOpensAt, salonClosesAt, today}) => {
    const dates = weeklyDateValues(today);
    const timeSlots = dailyTimeSlots({salonOpensAt, salonClosesAt});
    return (<table id="time-slots">
                <thead>
                    <tr>
                        <th/>
                        {dates.map(d => (
                            <th key={d}>{toShortDate(d) }</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map(timeSlot => (
                        <tr key={timeSlot}>
                            <th>{toTimeValue(timeSlot)}</th>
                            {dates.map((data) => (
                                <td key={data}>
                                    <input type="radio" />
                                </td>
                            ))}
                        </tr>
                    )) }
                </tbody>
            </table>)
};

export const AppointmentForm = ({selectableServices, service, handleChange, salonOpensAt, salonClosesAt, today}) => (
    <form id="appointment">
        <select name="service" value={service} onChange={handleChange} readOnly>
            <option/>
            {selectableServices.map(s => (
                <option key={s}>{s}</option>
            ))}
       </select>
       <TimeTableSlot salonOpensAt={salonOpensAt} salonClosesAt={salonClosesAt} today={today} />
    </form>
);

AppointmentForm.defaultProps = {
    today: new Date(),
    salonOpensAt: 9,
    salonClosesAt: 19,
    selectableServices: [
        'Cut',
        'Blow-dry'
    ]
}