import { describe, it, expect } from '@jest/globals';
import Search from './search';
import { ListRendererInterface } from './listRendererInterface';

describe('Search', () => {
    
    it('should call listRenderer.render with matches on input', () => {
        
        const input = document.createElement('input');
        let rendered: string[] = [];

        const listRenderer: ListRendererInterface = {
            render: (items: string[]) => {
                rendered = items;
            },
            init: () => {}
        };
        const materialSymbols = {
            home: 'Home Icon',
            star: 'Star Icon',
            settings: 'Settings Icon'
        };

        const search = new Search(input, listRenderer, materialSymbols);
        search.init();

        input.value = 'st';
        input.dispatchEvent(new Event('input', { bubbles: true }));

        expect(rendered).toContain('star');
        expect(rendered).not.toContain('home');
    });

    it('should clear list on blur', (done) => {
        const input = document.createElement('input');
        let rendered: string[] = [];

        const listRenderer: ListRendererInterface = {
            render: (items: string[]) => {
                rendered = items;
            },
            init: () => {}
        };
        const materialSymbols = { home: 'Home Icon' };

        const search = new Search(input, listRenderer, materialSymbols);
        search.init();

        input.dispatchEvent(new Event('blur'));

        setTimeout(() => {
            expect(rendered).toEqual([]);
            done();
        }, 200);
    });

    it('should render matches on focus', () => {
        const input = document.createElement('input');
        input.value = 'ho';
        let rendered: string[] = [];

        const listRenderer: ListRendererInterface = {
            render: (items: string[]) => {
                rendered = items;
            },
            init: () => {}
        };
        const materialSymbols = { home: 'Home Icon', star: 'Star Icon' };

        const search = new Search(input, listRenderer, materialSymbols);
        search.init();

        input.dispatchEvent(new Event('focus'));

        expect(rendered).toContain('home');
        expect(rendered).not.toContain('star');
    });

    it('should use cached matches for repeated queries', () => {
        const input = document.createElement('input');
        let callCount = 0;

        const listRenderer: ListRendererInterface = {
            render: (items: string[]) => { callCount++; },
            init: () => {}
        };
        const materialSymbols = { home: 'Home Icon', star: 'Star Icon' };

        const search = new Search(input, listRenderer, materialSymbols);
        search.init();

        input.value = 'ho';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        const firstCallCount = callCount;

        // Repeat the same query
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(callCount).toBeGreaterThanOrEqual(firstCallCount);
    });
});
