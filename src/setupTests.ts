import '@testing-library/jest-dom';

class MockResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
}

beforeEach(() => {
    window.ResizeObserver = MockResizeObserver as any;
});
