import { ListRendererInterface } from "./listRendererInterface";
import { MaterialSymbolInterface } from "./materialSymbols";

class ListRenderer implements ListRendererInterface {
    private currentSelectedIcon: string|null = null;
    constructor(private container: HTMLElement, private hiddenInput: HTMLInputElement) {}

    public init(): void {
        this.currentSelectedIcon = this.hiddenInput.value || null;
        this.listenForSelectedIconChange();
    }

    public render(items: MaterialSymbolInterface[]): void {
        const html = items.map(item => this.getHtml(item)).join('');
        this.setExpanded(items.length !== 0, this.container.parentElement as HTMLElement);
        this.container.innerHTML = html;
    }

    private setExpanded(expanded: boolean, container: HTMLElement): void {
        container.classList.toggle('is-expanded', expanded);
    }

    private listenForSelectedIconChange(): void {
        this.hiddenInput.addEventListener('change', () => {
            this.currentSelectedIcon = this.hiddenInput.value || null;
            const selectedItem = this.container.querySelector('.is-selected');
            if (selectedItem) {
                selectedItem.classList.remove('is-selected');
            }

            if (this.currentSelectedIcon) {
                const newSelectedItem = this.container.querySelector(`[data-js-acf-icon-field-item="${this.currentSelectedIcon}"]`);
                if (newSelectedItem) {
                    newSelectedItem.classList.add('is-selected');
                }
            }
        });
    }

    private getHtml(name: MaterialSymbolInterface): string {
        return `<li class="acf-icon-field__list-item${this.currentSelectedIcon === name ? ' is-selected' : ''}" data-js-acf-icon-field-item="${name}"><span data-material-symbol="${name}" class="acf-icon-field__icon material-symbols material-symbols-rounded material-symbols-sharp material-symbols-outlined">${name}</span></li>`;
    }
}

export default ListRenderer;