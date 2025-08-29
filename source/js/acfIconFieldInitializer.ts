import AcfIconField from './acfIconField';

declare global {
    interface Window {
        getAcfIcons: (id: string) => void;
    }
}

let initializedIconFields: { [key: string]: AcfIconFieldInterface } = {};

window.getAcfIcons = (id: string) => {
    const container = document.querySelector(`#${id}`) as HTMLElement;
    const searchInput = container?.querySelector('[data-js-acf-icon-field="search-input"]') as HTMLInputElement;
    const hiddenInput = container?.querySelector('[data-js-acf-icon-field="hidden-input"]') as HTMLInputElement;
    const listContainer = container?.querySelector('[data-js-acf-icon-field="list"]') as HTMLUListElement;

    if (!searchInput || !hiddenInput || !listContainer) {
        console.warn('One or more required elements not found within container:', container);
        return;
    }

        const newField = new AcfIconField(
            searchInput,
            hiddenInput,
            listContainer
        );

        initializedIconFields[id] = newField;
        newField.init();
};