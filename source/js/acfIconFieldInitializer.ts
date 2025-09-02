import AcfIconField from './acfIconField';

declare global {
    interface Window {
        getAcfIcons: (id: string) => void;
    }
}

let initializedIconFields: { [key: string]: AcfIconFieldInterface } = {};

window.getAcfIcons = (id: string) => {
    // Prevent double initialization
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
            noIconText
        );

        initializedIconFields[id] = newField;
        newField.init();
};

// Set up a MutationObserver to handle dynamically added ACF icon fields (for Gutenberg)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize any existing fields on page load
    const existingFields = document.querySelectorAll('[data-js-acf-icon-field="container"]');
    existingFields.forEach((container) => {
        const fieldId = container.getAttribute('data-field-id');
        if (fieldId && !initializedIconFields[fieldId]) {
            window.getAcfIcons(fieldId);
        }
    });

    // Watch for new ACF icon fields being added dynamically
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = node as Element;
                    
                    // Check if the added node itself is an ACF icon field container
                    if (element.matches('[data-js-acf-icon-field="container"]')) {
                        const fieldId = element.getAttribute('data-field-id');
                        if (fieldId && !initializedIconFields[fieldId]) {
                            // Small delay to ensure the field is fully rendered
                            setTimeout(() => window.getAcfIcons(fieldId), 10);
                        }
                    }
                    
                    // Check if the added node contains ACF icon field containers
                    const iconFields = element.querySelectorAll('[data-js-acf-icon-field="container"]');
                    iconFields.forEach((container) => {
                        const fieldId = container.getAttribute('data-field-id');
                        if (fieldId && !initializedIconFields[fieldId]) {
                            // Small delay to ensure the field is fully rendered
                            setTimeout(() => window.getAcfIcons(fieldId), 10);
                        }
                    });
                }
            });
        });
    });

    // Start observing the document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});