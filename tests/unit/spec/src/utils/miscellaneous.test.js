/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { createState, getDataByTag, createEvent, createUUID, viewportHijack } from 'src/utils';

describe('utils/miscellaneous', () => {
    describe('createState', () => {
        it('Creates a state object', () => {
            const [state, setState] = createState({ x: 1, y: 1 });

            expect(state).toEqual({
                x: 1,
                y: 1
            });
            expect(setState).toEqual(expect.any(Function));

            setState({ y: 2 });

            expect(state).toEqual({
                x: 1,
                y: 2
            });

            setState({ x: 3, z: 5 });

            expect(state).toEqual({
                x: 3,
                y: 2,
                z: 5
            });
        });
    });

    describe('getDataByTag', () => {
        const data = [
            ['Message one', ['default', 'small']],
            ['Message two', ['medium']],
            ['Message three', ['medium.2', 'large']]
        ];

        it('Retrieves a message by tag', () => {
            expect(getDataByTag(data, 'small')).toBe('Message one');
            expect(getDataByTag(data, 'medium')).toBe('Message two');
            expect(getDataByTag(data, 'medium.2')).toBe('Message three');
        });

        it('Falls back to default if tag is missing', () => {
            expect(getDataByTag(data, 'xlarge')).toBe('Message one');
            expect(getDataByTag(data, 'xlarge.3')).toBe('Message one');
        });

        it('Falls back to main tag if sub-tag is missing', () => {
            expect(getDataByTag(data, 'medium.3')).toBe('Message two');
        });

        it('Returns empty string when no default provided', () => {
            expect(getDataByTag([['Message one', ['small']]], 'large')).toBe('');
        });
    });

    describe('createEvent', () => {
        it('Returns an event object', () => {
            const event = createEvent('click');

            expect(typeof event).toBe('object');
            expect(event.type).toBe('click');

            // IE11 event
            const { Event } = window;
            delete window.Event;

            const ieEvent = createEvent('click');

            expect(typeof ieEvent).toBe('object');
            expect(ieEvent.type).toBe('click');

            window.Event = Event;
        });
    });

    describe('createUUID', () => {
        it('Creates a random uuid', () => {
            const uuid = createUUID();

            expect(uuid).toMatch(/[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}/);

            const uuids = Array.from({ length: 10 }).map(createUUID);

            expect(uuids.length).toBe(new Set(uuids).size);
        });
    });

    describe('viewportHijack', () => {
        afterEach(() => {
            document.head.innerHTML = '';
        });

        it('Replaces the existing viewport with a new one', () => {
            const [hijackViewport, replaceViewport] = viewportHijack();
            const defaultViewport = (<meta name="viewport" content="test=true" />).render(dom({ doc: document }));
            document.head.appendChild(defaultViewport);

            expect(defaultViewport).toBeInTheDocument();

            hijackViewport();

            const newViewport = document.head.querySelector('meta[name="viewport"]');

            expect(newViewport).not.toBe(defaultViewport);
            expect(defaultViewport).not.toBeInTheDocument();
            expect(newViewport.getAttribute('content')).toBe(
                'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no'
            );

            replaceViewport();

            expect(newViewport).not.toBeInTheDocument();
            expect(defaultViewport).toBeInTheDocument();
        });

        it('Creates an empty viewport if one is missing', () => {
            const [hijackViewport, replaceViewport] = viewportHijack();
            const missingViewport = document.head.querySelector('meta[name="missingViewport"]');

            expect(missingViewport).toBeNull();

            hijackViewport();

            const newViewport = document.head.querySelector('meta[name="viewport"]');

            expect(newViewport.getAttribute('content')).toBe(
                'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no'
            );

            replaceViewport();

            const emptyViewport = document.head.querySelector('meta[name="viewport"]');

            expect(emptyViewport).not.toBe(newViewport);
            expect(newViewport).not.toBeInTheDocument();
            expect(emptyViewport.getAttribute('content')).toBe('');
        });

        it('Removes scrollbar with overflow hidden', () => {
            const [hijackViewport, replaceViewport] = viewportHijack();

            expect(document.body.getAttribute('style')).toBe('');

            hijackViewport();

            expect(document.body.getAttribute('style')).toBe('overflow: hidden;');

            replaceViewport();

            expect(document.body.getAttribute('style')).toBe('');

            document.body.style.display = 'block';
            document.body.style.color = 'black';

            hijackViewport();

            expect(document.body.getAttribute('style')).toBe('display: block; color: black; overflow: hidden;');

            replaceViewport();

            expect(document.body.getAttribute('style')).toBe('display: block; color: black;');
        });
    });

    describe('request', () => {
        it.todo('tests');
    });

    describe('dynamicImport', () => {
        it.todo('tests');
    });
});
