import { describe, it, expect } from '@jest/globals';
import IconPreview from './iconPreview';

describe('IconPreview', () => {
    it('should initialize with existing hidden input value', () => {
        const preview = document.createElement('div');
        const hidden = document.createElement('input');
        hidden.value = 'home';
        const clear = document.createElement('button');
        const noIcon = document.createElement('div');

        const iconPreview = new IconPreview(preview, hidden, clear, noIcon);
        iconPreview.init();

        expect(preview.innerHTML).toContain('home');
        expect(noIcon.style.display).toBe('none');
        expect(clear.style.display).toBe('flex');
    });

    it('should clear preview when hidden input is empty', () => {
        const preview = document.createElement('div');
        const hidden = document.createElement('input');
        hidden.value = '';
        const clear = document.createElement('button');
        const noIcon = document.createElement('div');

        const iconPreview = new IconPreview(preview, hidden, clear, noIcon);
        iconPreview.init();

        expect(preview.innerHTML).toBe('');
        expect(noIcon.style.display).toBe('block');
        expect(clear.style.display).toBe('none');
    });

    it('should update preview when hidden input changes', () => {
        const preview = document.createElement('div');
        const hidden = document.createElement('input');
        hidden.value = '';
        const clear = document.createElement('button');
        const noIcon = document.createElement('div');

        const iconPreview = new IconPreview(preview, hidden, clear, noIcon);
        iconPreview.init();

        hidden.value = 'star';
        hidden.dispatchEvent(new Event('change'));

        expect(preview.innerHTML).toContain('star');
        expect(noIcon.style.display).toBe('none');
        expect(clear.style.display).toBe('flex');
    });

    it('should clear value and preview when clear button is clicked', () => {
        const preview = document.createElement('div');
        const hidden = document.createElement('input');
        hidden.value = 'settings';
        const clear = document.createElement('button');
        const noIcon = document.createElement('div');

        const iconPreview = new IconPreview(preview, hidden, clear, noIcon);
        iconPreview.init();

        clear.click();

        expect(hidden.value).toBe('');
        expect(preview.innerHTML).toBe('');
        expect(noIcon.style.display).toBe('block');
        expect(clear.style.display).toBe('none');
    });
});
