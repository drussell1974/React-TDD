import React, {useState, useCallback} from 'react';

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

const mergeDateAndTime = (date, timeSlot) => {
    const time = new Date(timeSlot);
    return new Date(date).setHours(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds()
    );
};

const RadioButtonIfAvailable = ({
    availableTimeSlots,
    date,
    timeSlot,
    checkedTimeSlot,
    handleChange
}) => {
    const startsAt = mergeDateAndTime(date, timeSlot);
    if(availableTimeSlots.some(a => a.startsAt === startsAt)) {
        const isChecked = startsAt === checkedTimeSlot;
        return (
            <input
                name="startsAt"
                type="radio"
                value={startsAt}
                defaultChecked={isChecked}
                onChange={handleChange}
            />
        )
    }
    return null;
};

const TimeSlotTable = ({
        salonOpensAt, 
        salonClosesAt, 
        today, 
        availableTimeSlots,
        checkedTimeSlot,
        handleChange
    }) => {
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
                            {dates.map((date) => (
                                <td key={date}>
                                    <RadioButtonIfAvailable
                                        availableTimeSlots={availableTimeSlots}
                                        date={date}
                                        timeSlot={timeSlot}
                                        checkedTimeSlot={checkedTimeSlot}
                                        handleChange={handleChange}
                                    />
                                </td>
                            ))}
                        </tr>
                    )) }
                </tbody>
            </table>)
};

export const AppointmentForm = ({
        selectableServices, 
        service, 
        onSubmit, 
        salonOpensAt, 
        salonClosesAt, 
        today, 
        availableTimeSlots,
        startsAt
    }) => {

    const [appointment, setAppointment] = useState({service, startsAt});

    const handleServiceChange = ({ target: { value } }) =>
        setAppointment(appointment => ({
        ...appointment,
        service: value
    }));
    
    const handleStartsAtChange = useCallback(
        ({target: { value } }) => 
            setAppointment(appointment => ({
                ...appointment,
                startsAt: parseInt(value)
            })),
        []
    );
    
    return (
        <form id="appointment" onSubmit={() => onSubmit(appointment)}>
            <select 
                name="service" 
                value={service} 
                onChange={handleServiceChange}>
                <option/>
                {selectableServices.map(s => (
                    <option key={s}>{s}</option>
                ))}
            </select>
            <TimeSlotTable 
                    salonOpensAt={salonOpensAt} 
                    salonClosesAt={salonClosesAt} 
                    today={today} 
                    availableTimeSlots={availableTimeSlots}
                    timeSlot={appointment.timeSlot} 
                    onChange={handleStartsAtChange}
                />
        </form>)
    };

AppointmentForm.defaultProps = {
    availableTimeSlots: [],
    today: new Date(),
    salonOpensAt: 9,
    salonClosesAt: 19,
    selectableServices: [
        'Cut',
        'Blow-dry'
    ]
}