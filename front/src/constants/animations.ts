// @ts-ignore
export const topAnimation: any = {
    hidden: {
        y: -20,
        opacity: 0
    },
    visible: custom => ({
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
    visible: custom => ({
        y: 0,
        opacity: 1,
        transition: { delay: custom * 0.3, duration: 0.3, ease: 'easeInOut' }
    })
};

// @ts-ignore
export const headerAnimation: any = {
    hidden: {
        x: -70,
        opacity: 0
    },
    visible: custom => ({
        x: 0,
        opacity: 1,
        transition: { delay: custom * 0.3, duration: 0.3, ease: 'easeInOut' }
    })
};

// @ts-ignore
export const buttonAnimation: any = {
    hidden: {
        x: 100,
        opacity: 0
    },
    visible: custom => ({
        x: 0,
        opacity: 1,
        transition: { delay: custom * 0.2, duration: 0.3, ease: 'easeInOut' }
    })
};
// @ts-ignore
export const titleAnimation: any = {
    hidden: {
        x: -30,
        opacity: 0
    },

    visible: custom => ({
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
    visible: custom => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.2, duration: 0.3, ease: 'easeInOut' }
    })
};

// @ts-ignore
export const rightToLeftSlide: any = {
    hidden: {
        opacity: 0,
        x: 100
    },
    visible: custom => ({
        opacity: 1,
        x: 0,
        transition: { delay: custom * 0.2, duration: 0.5, ease: 'easeInOut' }
    })
};