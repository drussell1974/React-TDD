import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../CustomerForm.js';
import { italic } from 'ansi-colors';

describe('CustomerForm', () => {
    let render, container;

    const form = id => container.querySelector(`form[id=${id}]`);
    beforeEach(() => {
        ({render, container} = createContainer());
    });

    it('renders a form', () => {
        render(<CustomerForm />);
        expect(
            container.querySelector('form[id="customer"]')
            ).not.toBeNull();
    });

    const expectToBeInputField = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    it('renders the first name field as a textbox', () => {
        render(<CustomerForm />);
        const field = form('customer').elements.firstName;
        expectToBeInputField(field);
    })

    const firstNameField = () => form('customer').elements.firstName;

    it('includes the existing value for first name', () => {
        render(<CustomerForm firstName='Ashley' />);
        expect(firstNameField().value).toEqual('Ashley');
    })

    const labelFor = formElement =>
        container.querySelector(`label[for="${formElement}"]`);

    it('renders a label for the first name field', () =>{
        render(<CustomerForm />);
        expect(labelFor('firstName')).not.toBeNull();
        expect(labelFor('firstName').textContent).toEqual('First name');
    })

    it('assigns an id that matches the label id to the first name field', () => {
        render(<CustomerForm />);
        expect(firstNameField().id).toEqual('firstName')
    })

    it('renders a label for the first name field', () => {
        render(<CustomerForm />);
        expect(labelFor('firstName').textContent).toEqual('First name')
    })
});
