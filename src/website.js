/**
 * Main module, this module is part of the bootstrapping process
 * @param background module
 * @param sections module
 */
export default function website(background, sections) {
    function initSubModules() {
        background.init();
        sections.init();
    }

    function init() {
        initSubModules();
    }

    return {
        init: init
    }
}
