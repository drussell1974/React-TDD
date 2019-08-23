import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../CustomerForm.js';
import { italic } from 'ansi-colors';
import ReactTestUtils from 'react-dom/test-utils';

const spy = () => {
    let receivedArguments;
    return {
        fn: (...args) => (receivedArguments = args),
        receivedArguments: () => receivedArguments,
        receivedArgument: n => receivedArguments[n]
    };
};

describe('CustomerForm', () => {
    let render, container;

    const form = id => container.querySelector(`form[id=${id}]`);
    beforeEach(() => {
        ({render, container} = createContainer());
    });

    const labelFor = formElement =>
        container.querySelector(`label[for="${formElement}"]`);

    it('renders a form', () => {
        render(<CustomerForm />);
        expect(
            container.querySelector('form[id="customer"]')
            ).not.toBeNull();
    });

    const expectToBeInputField = (formElement) => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    const field = (name) => form('customer').elements[name];

    const itRendersAsATextbox = (fieldName) => {
        it('renders the field as a textbox', () => {
            render(<CustomerForm />);
            expectToBeInputField(field(fieldName));
        })
    }

    const itIncludesTheExistingValue = (fieldName) => {
        it('includes the existing value', () => {
            render(<CustomerForm {...{[fieldName]: 'value'} } />);
            expect(field(fieldName).value).toEqual('value');
        })
    }
    
    const itRendersALabel = ({fieldName}) => {
        it.skip('renders a label', () =>{
            render(<CustomerForm {...{[fieldName]: 'value'} } />);
            expect(labelFor(fieldName)).not.toBeNull();
            expect(labelFor(fieldName).textContent).toEqual('value');
        })
    }

    const itAssignsAnIdThatMatchesTheLabelId = (fieldName) => {
        it('assigns an id that matches the label id', () => {
            render(<CustomerForm {...{[fieldName]: 'value'} }/>);
            expect(field(fieldName).id).toEqual(fieldName)
        })
    }

    
    const itSubmitsExistingValue = (fieldName) => {
        it('saves existing value when submitted', async () => {
            const submitSpy = spy();

            render(
                <CustomerForm
                    {...{ [fieldName]: 'value'} }
                    onSubmit={submitSpy.fn}
                />
            );
            ReactTestUtils.Simulate.submit(form('customer'));
            expect(submitSpy.receivedArguments()).toBeDefined();
            expect(submitSpy.receivedArgument(0)[fieldName]).toEqual('value');
        });
    }

    const itSavesNewValueWhenSubmited = fieldName => {
        it('save new value when submitted', async () => {
            expect.assertions();
            render(
                <CustomerForm
                    {...{[fieldName]: 'existingValue'} }
                    onSubmit={props => 
                        expect(props[fieldName]).toEqual('newValue')
                    }
                />
            ); 
            await ReactTestUtils.Simulate.change(field(fieldName), {
                target: { value: 'newValue', name:fieldName }
            });
            await ReactTestUtils.Simulate.submit(form('customer'));
        })
    }

    describe('first name field', () => {

        itRendersAsATextbox("firstName");

        itIncludesTheExistingValue("firstName")

        itRendersALabel("firstName");

        itAssignsAnIdThatMatchesTheLabelId("firstName")

        itSubmitsExistingValue("firstName");

        itSavesNewValueWhenSubmited("firstName");
    })

    
    describe('last name field', () => {
        
        itRendersAsATextbox("lastName");
        
        itIncludesTheExistingValue("lastName")

        itRendersALabel("lastName");

        itAssignsAnIdThatMatchesTheLabelId("lastName")

        itSubmitsExistingValue("lastName");

        itSavesNewValueWhenSubmited("lastName");
    })

    describe('phone number field', () => {
        
        itRendersAsATextbox("phoneNumber");
        
        itIncludesTheExistingValue("phoneNumber")

        itRendersALabel("phoneNumber");

        itAssignsAnIdThatMatchesTheLabelId("phoneNumber")

        itSubmitsExistingValue("phoneNumber");

        itSavesNewValueWhenSubmited("phoneNumber");
    })
});
