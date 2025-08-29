import ListRenderer from "./listRenderer";
import { MaterialSymbols } from "./materialSymbols";
import PickIcon from "./pickIcon";
import Search from "./search";

class AcfIconField implements AcfIconFieldInterface {
    constructor(
        private searchInput: HTMLInputElement,
        private hiddenInput: HTMLInputElement,
        private listContainer: HTMLElement
    ) {}

    public init(): void {
        new PickIcon(
            this.hiddenInput,
            this.listContainer,
        ).init();

        const listRenderer = new ListRenderer(this.listContainer, this.hiddenInput);

        listRenderer.init();

        new Search(
            this.searchInput,
            listRenderer,
            MaterialSymbols
        ).init();
    }
}

export default AcfIconField;