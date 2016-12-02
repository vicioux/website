export default function website(background, sections, preLoader) {
    function load() {
        background.init();
        sections.init();
        preLoader.init();
    }

    function init() {
        load();
    }

    return {
        init: init
    }
}
