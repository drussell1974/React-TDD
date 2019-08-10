import React from 'react';
import {createContainer} from './domManipulators';
import {AppointmentForm} from '../AppointmentForm';
import ReactTestUtils from 'react-dom/test-utils';
import { italic } from 'ansi-colors';
import { nothing } from 'immer';

describe('AppointmentForm', () => {
    let render, container;

    beforeEach(()=> {
        ({render, container} = createContainer());
    });

    const form = id => 
        container.querySelector(`form[id="${id}"]`);

    it('renders a form', () => {
        render(<AppointmentForm />);
        expect(form('appointment')).not.toBeNull();
    })

    describe('service field', () => {
        const field = name => form('appointment').elements[name];
        const findOption = (dropdownNode, textContent) => {
            const options = Array.from(dropdownNode.childNodes);
            return options.find(
                option => option.textContent === textContent
            );
        };

        it('renders as a select box', () => {
            render(<AppointmentForm />);
            expect(field('service')).not.toBeNull();
            expect(field('service').tagName).toEqual('SELECT');
        });

        it('initially has a blank value chosen', () => {
            render(<AppointmentForm />);
            const firstNode = field('service').childNodes[0];
            expect(firstNode.value).toEqual('');
            expect(firstNode.selected).toBeTruthy();
        });
        
        it('lists all salon services', () => {
            const selectableServices = ['Cut', 'Blow-dry'];
            render(<AppointmentForm selectableServices={selectableServices} />);
            const optionNodes = Array.from(
                field('service').childNodes
            );
            const renderedServices = optionNodes.map(
                node => node.textContent
            )
            expect(renderedServices).toEqual(
                expect.arrayContaining(selectableServices)
            );
        });

        it('pre-selects the existing value', () => {
            const services = ['Cut', 'Blow-dry'];
            render(
                <AppointmentForm
                    selectableServices={services}
                    service='Blow-dry'
                />
            );
            const option = findOption(
                field('service'),
                'Blow-dry'
            );
            expect(option.selected).toBeTruthy();
        });

        it('calls handleChange', async () => {
            expect.assertions();
            render(
                <AppointmentForm 
                    onChange={() => 
                        expect('service').toEqual('Cut')
                }/>
            );
            await ReactTestUtils.Simulate.change('appointment', {
                target: { name:'service', name:'Cut' }
            });
            await ReactTestUtils.Simulate.submit(form('appointment'));
        })
    })

    const timeTableHelper = () => container.querySelector('table#time-slots');

    describe('time slot table', () => {

        const timeSlotTable = () => container.querySelector('table#time-slots');

        it('renders a table for time slots', () => {
            render(<AppointmentForm />);
            expect(
                timeTableHelper()
            ).not.toBeNull
        });

        it('renders a time slot for every half hour between open and close times', () => {
            render(<AppointmentForm salonOpensAt={9} salonClosesAt={10} />);
            const timesOfDay = timeSlotTable().querySelectorAll(
                'tbody >* th'
            );
            expect(timesOfDay).toHaveLength(2);
            expect(timesOfDay[0].textContent).toEqual('09:00');
            expect(timesOfDay[1].textContent).toEqual('09:30');
        });

        it('renders an empty cell at the start of the header row', () => {
            render(<AppointmentForm />);
            const headerRow = timeSlotTable().querySelector(
                'thead > tr'
                );
            expect(headerRow.firstChild.textContent).toEqual('');
        })

        it('renders a week of available dates', () => {
            const today = new Date(2019, 7, 31);
            render(<AppointmentForm today={today} />);
            const dates = timeSlotTable().querySelectorAll(
                'thead >* th:not(:first-child)'
            );
            expect(dates).toHaveLength(7);
            expect(dates[0].textContent).toEqual('Sat 31');
            expect(dates[1].textContent).toEqual('Sun 01');
            expect(dates[6].textContent).toEqual('Fri 06');
        })
    });
})