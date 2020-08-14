import Logo from '../logos';
import { legacyNI, flex } from './ni';
import { basicMediaQuery, altContentMediaQuery, primaryContentMediaQuery } from './mediaQueries';
import { textLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    `
                    .weak {
                        display:none;
                    }
                   `,
                    [basicMediaQuery(textSize * 18.5 + 70)]
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    { tag: 'xsmall', br: ['time.'] },
                    { tag: 'medium', br: ['months.'], replace: [['months', 'months.']] }
                ],
                disclaimer: 'xsmall'
            })
        ],
        [
            'logo.type:primary && logo.position:left',
            ({ textSize }) => ({
                logo: [Logo.ALT_NO_PAYPAL.COLOR, Logo.PRIMARY.COLOR],
                messageWidth: [textSize * 13, textSize * 27],
                styles: [
                    basicMediaQuery(textSize * 12),
                    `
                    .weak {
                        display:none;
                    }
                    `,
                    primaryContentMediaQuery({
                        logoContainerBP: textSize * 21,
                        logoAltWidth: textSize * 5,
                        logoWidth: textSize * 9,
                        logoSvgBP: textSize * 41.75,
                        whiteSpaceBP: textSize * 27
                    }),
                    altContentMediaQuery(textSize * 41.75)
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [
                    `.weak {
                        display:none;
                    }`,
                    basicMediaQuery(textSize * 12 + 80),
                    `.message__logo { width: ${textSize * 7}px }`
                ],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [
                    { tag: 'xsmall', replace: [['time.', 'time']], br: ['time'] },
                    { tag: 'medium', br: ['months'] }
                ]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [
                    `.weak {
                        display:none;
                    }`,
                    basicMediaQuery(textSize * 17)
                ],
                logo: false,
                headline: [
                    {
                        tag: 'xsmall',
                        replace: [['time.', 'time']],
                        br: ['time']
                    },
                    {
                        tag: 'medium',
                        br: ['months']
                    }
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `.weak {
                        display:none;
                    }`,
                    basicMediaQuery(textSize * 18),
                    altContentMediaQuery(textSize * 33),
                    `.message__logo-container { width: ${textSize * 5}px }`
                ],
                logo: Logo.ALT_NO_PAYPAL.COLOR
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `
                    .weak {
                        display:none;
                    }
                    .message__disclaimer {
                        display: block;
                    }
                    `,
                    `.message__logo-container { width: ${textSize * 9}px }`,
                    basicMediaQuery(textSize * 18.5)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    `
                    .weak {
                        display:none;
                    }
                    .message__content {
                        display: inline-block;
                    }
                    `,
                    basicMediaQuery(textSize * 18.5),
                    altContentMediaQuery(textSize * 33),
                    `.message__logo-container { width: ${textSize * 9}px }`
                ]
            })
        ],
        [
            'logo.type:alternative && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `.weak {
                        display:none;
                    }`,
                    basicMediaQuery(textSize * 18.5),
                    `.message__logo-container { width: ${textSize * 5}px }`
                ]
            })
        ],
        ...textLogoMutations
    ],

    'layout:flex': flex,
    'layout:legacy': legacyNI
};