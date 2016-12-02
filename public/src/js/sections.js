import $ from 'jquery';

export default function sections() {
    const $window = $(window);
    const $sections = $('.section');

    function resizeWindowHandler() {
        $sections.css('min-height', $window.height());
    }

    function bind() {
        $window.resize(resizeWindowHandler)
    }

    function init() {
        bind();
        resizeWindowHandler();
    }

    return {
        init: init
    }
}
