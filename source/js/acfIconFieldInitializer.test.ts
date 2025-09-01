import { describe, expect, it } from '@jest/globals';
import AcfIconField from './acfIconField';
import './acfIconFieldInitializer';

describe('AcfIconField bootstrap', () => {
    it('should have AcfIconField defined', () => {
        expect(AcfIconField).toBeDefined();
    });

    it('should attach getAcfIcons to window', () => {
        expect(typeof window.getAcfIcons).toBe('function');
    });

    it('should not throw if required elements are missing', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        document.body.innerHTML = `<div id="test-container"></div>`;
        expect(() => window.getAcfIcons('test-container')).not.toThrow();
        errorSpy.mockRestore();
    });

    it('should not throw when all required elements exist', () => {
        document.body.innerHTML = `
          <div id="test-container">
            <input data-js-acf-icon-field="search-input" />
            <input data-js-acf-icon-field="hidden-input" />
            <ul data-js-acf-icon-field="list"></ul>
            <div data-js-icon-field="preview-icon"></div>
            <button data-js-acf-icon-field="clear-button"></button>
            <div data-js-acf-icon-field="no-icon"></div>
          </div>
        `;

        expect(() => window.getAcfIcons('test-container')).not.toThrow();
    });
});
