import { describe, it, expect } from '@jest/globals';
import ListRenderer from './listRenderer';

describe('ListRenderer', () => {
    it('should initialize with hidden input value', () => {
        const parent = document.createElement('div');
        const listContainer = document.createElement('ul');
        parent.appendChild(listContainer);
        const hidden = document.createElement('input');
        hidden.value = 'star';

        const renderer = new ListRenderer(listContainer, hidden);
        renderer.init();

        expect((renderer as any).currentSelectedIcon).toBe('star');
    });

    it('should render items and set parent expanded', () => {
        const parent = document.createElement('div');
        const listContainer = document.createElement('ul');
        parent.appendChild(listContainer);
        const hidden = document.createElement('input');

        const renderer = new ListRenderer(listContainer, hidden);
        renderer.init();

        renderer.render(['home', 'star', 'settings']);

        expect(listContainer.innerHTML).toContain('home');
        expect(listContainer.innerHTML).toContain('star');
        expect(listContainer.innerHTML).toContain('settings');
        expect(parent.classList.contains('is-expanded')).toBe(true);
    });

    it('should collapse parent if no items', () => {
        const parent = document.createElement('div');
        const listContainer = document.createElement('ul');
        parent.appendChild(listContainer);
        const hidden = document.createElement('input');

        const renderer = new ListRenderer(listContainer, hidden);
        renderer.init();

        renderer.render([]);

        expect(listContainer.innerHTML).toBe('');
        expect(parent.classList.contains('is-expanded')).toBe(false);
    });

    it('should mark item as selected when hidden input value changes', () => {
        const parent = document.createElement('div');
        const listContainer = document.createElement('ul');
        parent.appendChild(listContainer);
        const hidden = document.createElement('input');

        const renderer = new ListRenderer(listContainer, hidden);
        renderer.init();
        renderer.render(['home', 'star', 'settings']);

        hidden.value = 'star';
        hidden.dispatchEvent(new Event('change'));

        const selected = listContainer.querySelector('.is-selected');
        expect(selected?.getAttribute('data-js-acf-icon-field-item')).toBe('star');
    });

    it('should remove previous selection when hidden input changes', () => {
        const parent = document.createElement('div');
        const listContainer = document.createElement('ul');
        parent.appendChild(listContainer);
        const hidden = document.createElement('input');
        hidden.value = 'home';

        const renderer = new ListRenderer(listContainer, hidden);
        renderer.init();
        renderer.render(['home', 'star']);

        hidden.value = 'star';
        hidden.dispatchEvent(new Event('change'));

        const selectedItems = listContainer.querySelectorAll('.is-selected');
        expect(selectedItems.length).toBe(1);
        expect(selectedItems[0].getAttribute('data-js-acf-icon-field-item')).toBe('star');
    });
});
