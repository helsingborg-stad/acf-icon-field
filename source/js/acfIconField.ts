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
        private previewClearButton: HTMLElement,
        private noIconText: HTMLElement
    ) {}

    public init(): void {
        const pickIcon = new PickIcon(
            this.hiddenInput,
            this.listContainer,
        );

        const iconPreview = new IconPreview(
            this.previewIconContainer,
            this.hiddenInput,
            this.previewClearButton,
            this.noIconText
        );

        const listRenderer = new ListRenderer(
            this.listContainer,
            this.hiddenInput
        );

        const search = new Search(
            this.searchInput,
            listRenderer,
            MaterialSymbols
        );

        iconPreview.init();
        pickIcon.init();
        listRenderer.init();
        search.init();
    }
}

export default AcfIconField;