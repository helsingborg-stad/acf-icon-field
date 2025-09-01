class IconPreview implements iconPreviewInterface {
    constructor(
        private previewElement: HTMLElement,
        private hiddenInput: HTMLInputElement,
        private clearButton: HTMLElement,
        private noIconText: HTMLElement
     ) {}

    init(): void {
        this.updatePreview(this.hiddenInput.value);

        this.hiddenInput.addEventListener('change', () => {
            this.updatePreview(this.hiddenInput.value);
        });

        this.clearButton.addEventListener('click', () => {
            this.hiddenInput.value = '';
            this.updatePreview(null);
        });
    }

    private updatePreview(iconName: string|null): void {
        if (!iconName) {
            this.previewElement.innerHTML = '';
            this.noIconText.style.display = 'block';
            this.clearButton.style.display = 'none';
            return;
        }

        this.clearButton.style.display = 'flex';
        this.noIconText.style.display = 'none';
        this.previewElement.innerHTML = this.getHtml(iconName);
    }

    private getHtml(iconName: string): string {
        return `<span data-material-symbol="${iconName}" class="acf-icon-field__preview-icon material-symbols material-symbols-rounded material-symbols-sharp material-symbols-outlined">${iconName}</span>
        <span class="acf-icon-field__preview-icon-name">${iconName}</span>`;
    }
}

export default IconPreview;