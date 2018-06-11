export const progressBarDriverFactory = ({element}) => {
    const getProgressBarForeGroundStyle = () => window.getComputedStyle(element.querySelector('[data-hook="progressbar-foreground"]'));
    const getProgressBarBackgroundStyle = () => window.getComputedStyle(element.querySelector('[data-hook="progressbar-background"]'));
    
    const driver = {
        exists: () => !!element,
        getWidth: () => getProgressBarForeGroundStyle().width,
        getBackgroundColor: () => getProgressBarBackgroundStyle().background,
        getForegroundColor: () => getProgressBarForeGroundStyle().background
    }

    return driver;
};
