// @ts-ignore
export const topAnimation: any = {
    hidden: {
        y: -20,
        opacity: 0
    },
    visible: (custom: number) => ({
        y: 0,
        opacity: 1,
        transition: { delay: custom * 0.2, duration: 0.3, ease: 'easeInOut' }
    })
};

// @ts-ignore
export const bottomAnimation: any = {
    hidden: {
        y: 20,
        opacity: 0
    },
    visible: (custom: number) => ({
        y: 0,
        opacity: 1,
        transition: { delay: custom * 0.3, duration: 0.3, ease: 'easeInOut' }
    })
};

// @ts-ignore
export const headerAnimation: any = {
    hidden: {
        x: -20,
        opacity: 0
    },
    visible: (custom: number) => ({
        x: 0,
        opacity: 1,
        transition: { delay: custom * 0.3, duration: 0.5, ease: 'easeInOut' }
    })
};

// @ts-ignore
export const buttonAnimation: any = {
    hidden: {
        x: 80,
        opacity: 0
    },
    visible: (custom: number) => ({
        x: 0,
        opacity: 1,
        transition: { delay: custom * 0.2, duration: 0.4, ease: 'easeInOut' }
    })
};
// @ts-ignore
export const titleAnimation: any = {
    hidden: {
        x: -30,
        opacity: 0
    },

    visible: (custom: number) => ({
        x: 0,
        opacity: 1,
        transition: { delay: custom * 0.2, duration: 0.3, ease: 'easeInOut' }
    })
};
// @ts-ignore
export const blockAnimation: any = {
    hidden: {
        opacity: 0,
        y: -30
    },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.2, duration: 0.3, ease: 'easeInOut' }
    })
};