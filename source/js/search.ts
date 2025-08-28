import { MaterialSymbolsInterface } from "./materialSymbols";

class Search implements SearchInterface {
    constructor(
        private input: HTMLInputElement,
        private materialSymbols: MaterialSymbolsInterface
    ) {}

    public init(): void {
        this.input.addEventListener('input', () => {
            this.search();
        });
    }

    private search() {
        console.log('Searching for:', this.input.value);
        // Implement search logic here
    }
}

export default Search;