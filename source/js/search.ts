import { ListRendererInterface } from "./listRendererInterface";
import { MaterialSymbolsInterface } from "./materialSymbols";

class Search implements SearchInterface {
    private static cachedMatches: Record<string, string[]> = {};

    constructor(
        private input: HTMLInputElement,
        private listRenderer: ListRendererInterface,
        private materialSymbols: MaterialSymbolsInterface
    ) {}

    public init(): void {
        this.input.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const matches = this.search(target.value);
            this.listRenderer.render(matches);
        });

       
        this.input.addEventListener('focus', () => {
            const matches = this.search(this.input.value);
            this.listRenderer.render(matches);
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.input.contains(e.target as Node) &&
                !this.listRenderer.getContainer().contains(e.target as Node)) {
                this.listRenderer.render([]);
            }
        });
    }

    private search(query: string): string[] {
        if (Search.cachedMatches[query]) {
            return Search.cachedMatches[query];
        }

        const lowerQuery = query.toLowerCase();
        const matches: string[] = [];

        const keys = Object.keys(this.materialSymbols);
        for (let i = 0; i < keys.length && matches.length < 500; i++) {
            const key = keys[i];
            if (this.materialSymbols[key].toLowerCase().includes(lowerQuery)) {
                matches.push(key);
            }
        }

        Search.cachedMatches[query] = matches;

        return matches;
    }

}

export default Search;