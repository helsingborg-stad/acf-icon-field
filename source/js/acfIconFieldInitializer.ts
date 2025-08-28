import AcfIconField from './acfIconField';

declare global {
    interface Window {
        getAcfIcons: (input: HTMLInputElement) => void;
    }
}

let initializedIconFields: { [key: string]: AcfIconFieldInterface } = {};

window.getAcfIcons = (input: HTMLInputElement) => {
    if (!input.id) {
        console.warn('Input element has no ID, cannot initialize AcfIconField.');
        return;
    }

    
    if (!initializedIconFields[input.id]) {
        const newField = new AcfIconField(input);
        initializedIconFields[input.id] = newField;
        newField.init();
    }
};