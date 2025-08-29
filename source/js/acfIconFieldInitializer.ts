import AcfIconField from './acfIconField';

declare global {
    interface Window {
        getAcfIcons: (input: HTMLElement) => void;
    }
}

let initializedIconFields: { [key: string]: AcfIconFieldInterface } = {};

window.getAcfIcons = (container: HTMLElement) => {
    if (!container.id) {
        console.warn('Input element has no ID, cannot initialize AcfIconField.');
        return;
    }
    console.log('Initializing AcfIconField for input:', container);

    const searchInput = container.querySelector('[data-js-acf-icon-field="search-input"]') as HTMLInputElement;
    const hiddenInput = container.querySelector('[data-js-acf-icon-field="hidden-input"]') as HTMLInputElement;
    const listContainer = container.querySelector('[data-js-acf-icon-field="list"]') as HTMLUListElement;

    if (!searchInput || !hiddenInput || !listContainer) {
        console.warn('One or more required elements not found within container:', container);
        return;
    }

        const newField = new AcfIconField(
            searchInput,
            hiddenInput,
            listContainer
        );

        initializedIconFields[container.id] = newField;
        newField.init();
};