class PickIcon implements PickIconInterface {
    constructor(
        private hiddenInput: HTMLInputElement,
        private listContainer: HTMLElement,
    ) {}

    public init(): void {
        this.listContainer.addEventListener('click', (e: Event) => {
            const target = (e.target as HTMLElement)?.closest('[data-js-acf-icon-field-item]');
            const iconName = target?.getAttribute('data-js-acf-icon-field-item');
            if (!iconName) {
                return;
            }
            
            if (this.hiddenInput.value === iconName) {
                this.removeSelection();
            } else {
                this.setSelection(iconName);
            }
        });
    }

    public setSelection(iconName: string): void {
        this.hiddenInput.value = iconName;
        this.hiddenInput.dispatchEvent(new Event('change'));
    }

    public removeSelection(): void {
        this.hiddenInput.value = '';
        this.hiddenInput.dispatchEvent(new Event('change'));
    }
}

export default PickIcon;