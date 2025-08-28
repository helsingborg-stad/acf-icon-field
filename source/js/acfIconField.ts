import { MaterialSymbols } from "./materialSymbols";
import Search from "./search";

class AcfIconField implements AcfIconFieldInterface {
    constructor(private input: HTMLInputElement) {}

    public init(): void {
        console.log('Initializing AcfIconField for input:', this.input.id);
        new Search(this.input, MaterialSymbols).init();
    }
}

export default AcfIconField;