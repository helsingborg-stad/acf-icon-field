import { MaterialSymbolInterface } from "./materialSymbols";

interface ListRendererInterface {
    init(): void;
    render(items: MaterialSymbolInterface[]): void;
}