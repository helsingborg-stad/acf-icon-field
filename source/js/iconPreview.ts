class IconPreview implements iconPreviewInterface {
    constructor(
        private previewElement: HTMLElement,
        private hiddenInput: HTMLInputElement
     ) {}

    init(): void {
        this.updatePreview(this.hiddenInput.value);
        if (this.hiddenInput.value) {
            this.updatePreview(this.hiddenInput.value);
        }

        this.hiddenInput.addEventListener('change', () => {
            this.updatePreview(this.hiddenInput.value);
        });
    }

    private updatePreview(iconName: string|null): void {
        if (!iconName) {
            this.previewElement.innerHTML = '';
            return;
        }

        this.previewElement.innerHTML = this.getHtml(iconName);
    }

    private getHtml(iconName: string): string {
        return `<span data-material-symbol="${iconName}" class="acf-icon-field__preview-icon material-symbols material-symbols-rounded material-symbols-sharp material-symbols-outlined">${iconName}</span>`
    }
}

export default IconPreview;