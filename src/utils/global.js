import objectKeys from 'core-js-pure/stable/object/keys';
import objectAssign from 'core-js-pure/stable/object/assign';

import { getEnv } from './sdk';
import { createState } from './miscellaneous';

const NAMESPACE = '__paypal_messages_state__';

const createDefaultState = () => ({
    index: 1,
    config: {},
    messagesMap: new Map()
});

export const [globalState, setGlobalState] = createState(window[NAMESPACE] || createDefaultState());
export const destroyGlobalState = () => {
    objectKeys(globalState).forEach(key => delete globalState[key]);
    objectAssign(globalState, createDefaultState());

    delete window[NAMESPACE];
};

Object.defineProperty(window, NAMESPACE, {
    value: globalState,
    enumerable: false,
    configurable: true,
    writable: false
});

export const nextIndex = () => {
    setGlobalState({ index: globalState.index + 1 });
    return globalState.index - 1;
};

const DOMAINS = __MESSAGES__.__DOMAIN__;
const URI = __MESSAGES__.__URI__;

/**
 * Create a URL of the requested type from Webpack global variables
 * @param {String} type URL type
 * @returns {String} URL of requested type
 */
export function getGlobalUrl(type) {
    const envField = `__${getEnv().toUpperCase()}__`;
    const typeField = `__${type.toUpperCase()}__`;
    const domain = (DOMAINS[typeField] && DOMAINS[typeField][envField]) || DOMAINS[envField];

    return `${domain}${URI[typeField]}`;
}

export function getGlobalVariable(variable, fn) {
    if (!window[NAMESPACE][variable]) {
        window[NAMESPACE][variable] = fn();
    }

    return window[NAMESPACE][variable];
}
