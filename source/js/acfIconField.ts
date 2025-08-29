import IconPreview from "./iconPreview";
import ListRenderer from "./listRenderer";
import { MaterialSymbols } from "./materialSymbols";
import PickIcon from "./pickIcon";
import Search from "./search";

class AcfIconField implements AcfIconFieldInterface {
    constructor(
        private searchInput: HTMLInputElement,
        private hiddenInput: HTMLInputElement,
        private listContainer: HTMLElement,
        private previewIconContainer: HTMLElement,
        private previewClearButton: HTMLElement
    ) {}

    public init(): void {
        const pickIcon = new PickIcon(
            this.hiddenInput,
            this.listContainer,
        );

        const iconPreview = new IconPreview(
            this.previewIconContainer,
            this.hiddenInput
        );

        const listRenderer = new ListRenderer(
            this.listContainer,
            this.hiddenInput
        );

        iconPreview.init();
        pickIcon.init();
        listRenderer.init();

        new Search(
            this.searchInput,
            listRenderer,
            MaterialSymbols
        ).init();
    }
}

export default AcfIconField;