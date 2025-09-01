import { describe, it, expect } from '@jest/globals';
import PickIcon from './pickIcon';

describe('PickIcon', () => {
    it('should set hidden input value when icon is clicked', () => {
        const hidden = document.createElement('input');
        const list = document.createElement('ul');
        list.innerHTML = `<li data-js-acf-icon-field-item="home">home</li>`;

        const picker = new PickIcon(hidden, list);
        picker.init();

        const icon = list.querySelector('[data-js-acf-icon-field-item="home"]') as HTMLElement;
        icon.dispatchEvent(new Event('pointerdown', { bubbles: true }));

        expect(hidden.value).toBe('home');
    });

    it('should toggle off selection if the same icon is clicked twice', () => {
        const hidden = document.createElement('input');
        const list = document.createElement('ul');
        list.innerHTML = `<li data-js-acf-icon-field-item="star">star</li>`;

        const picker = new PickIcon(hidden, list);
        picker.init();

        const icon = list.querySelector('[data-js-acf-icon-field-item="star"]') as HTMLElement;

        // First click -> select
        icon.dispatchEvent(new Event('pointerdown', { bubbles: true }));
        expect(hidden.value).toBe('star');

        // Second click -> deselect
        icon.dispatchEvent(new Event('pointerdown', { bubbles: true }));
        expect(hidden.value).toBe('');
    });

    it('should not change hidden input if clicked outside icon items', () => {
        const hidden = document.createElement('input');
        const list = document.createElement('ul');
        list.innerHTML = `<li>not an icon</li>`;

        const picker = new PickIcon(hidden, list);
        picker.init();

        const nonIcon = list.querySelector('li') as HTMLElement;
        nonIcon.dispatchEvent(new Event('pointerdown', { bubbles: true }));

        expect(hidden.value).toBe('');
    });

    it('should setSelection and removeSelection methods work directly', () => {
        const hidden = document.createElement('input');
        const list = document.createElement('ul');
        const picker = new PickIcon(hidden, list);

        picker.setSelection('settings');
        expect(hidden.value).toBe('settings');

        picker.removeSelection();
        expect(hidden.value).toBe('');
    });
});
