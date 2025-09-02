import AcfIconField from './acfIconField';

declare global {
    interface Window {
        getAcfIcons: (event: Event, id: string) => void;
    }
}

let initializedIconFields: { [key: string]: AcfIconFieldInterface } = {};

window.getAcfIcons = (event: Event, id: string) => {
    if (initializedIconFields[id]) {
        return;
    }

    const container = document.querySelector(`#${id}`) as HTMLElement;
    const searchInput = container?.querySelector('[data-js-acf-icon-field="search-input"]') as HTMLInputElement;
    const hiddenInput = container?.querySelector('[data-js-acf-icon-field="hidden-input"]') as HTMLInputElement;
    const listContainer = container?.querySelector('[data-js-acf-icon-field="list"]') as HTMLUListElement;
    const previewIconContainer = container?.querySelector('[data-js-icon-field="preview-icon"]') as HTMLElement;
    const previewClearButton = container?.querySelector('[data-js-acf-icon-field="clear-button"]') as HTMLElement;
    const noIconText = container?.querySelector('[data-js-acf-icon-field="no-icon"]') as HTMLElement;

    if (!searchInput || !hiddenInput || !listContainer || !previewIconContainer || !previewClearButton || !noIconText) {
        console.error('One or more required elements not found within container:', container);
        return;
    }
        const newField = new AcfIconField(
            searchInput,
            hiddenInput,
            listContainer,
            previewIconContainer,
            previewClearButton,
            noIconText,
            event
        );

        initializedIconFields[id] = newField;
        newField.init();
};