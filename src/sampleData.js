const today = new Date();

const at = hours => today.setHours(hours, 0);

export const sampleAppointments = [
    { startsAt: at(9), customer: {firstName:'Charlie', surname:'Barrat'}},
    { startsAt: at(10), customer: {firstName:'Frankie', surname:'Smith'}},
    { startsAt: at(11), customer: {firstName:'Casey', surname:'Young'}},
    { startsAt: at(12), customer: {firstName:'Ashley', surname:'Kemp'}},
    { startsAt: at(13), customer: {firstName:'Jordan', surname:'Smart'}},
    { startsAt: at(14), customer: {firstName:'Jay', surname:'Garret'}},
    { startsAt: at(15), customer: {firstName:'Alex', surname:'Monroe'}},
    { startsAt: at(16), customer: {firstName:'Jules', surname:'Trent'}},
    { startsAt: at(17), customer: {firstName:'Stevie', surname:'Olsen'}},
];