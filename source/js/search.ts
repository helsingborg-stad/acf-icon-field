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
    }

    private search(query: string): string[] {
        if (Search.cachedMatches[query]) {
            console.log(Search.cachedMatches[query]);
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
        console.log(Search.cachedMatches[query]);

        return matches;
    }

}

export default Search;