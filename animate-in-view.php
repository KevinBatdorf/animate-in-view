<?php
/**
 * Plugin Name:       Animate In View
 * Description:       This block will animate in as soon as it enters the viewport of the browser window. That's it.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           1.2.2
 * Author:            Kevin Batdorf
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       animate-in-view
 *
 * @package           kevinbatdorf
 */

add_action('init', function () {
    register_block_type(__DIR__ . '/build');
    wp_set_script_translations('kevinbatdorf-animate-in-view', 'animate-in-view');
});

// The JavaScript is minimal so it's easier to just maintain it here.
add_action('wp_enqueue_scripts', function () {
    wp_register_script('animate-in-view-js', false, [], '', true);
    wp_enqueue_script('animate-in-view-js');
    wp_add_inline_script(
        'animate-in-view-js',
        <<<JS
(function() {
'use strict';
document.querySelectorAll('[animatein]').forEach(function (el) {
    if (!Number(el.getAttribute('enabled'))) return;
    const dir = el.getAttribute('direction');
    const offset = el.getAttribute('offset');
    el.style.opacity = 0;
    el.style.overflow = 'hidden';
    Array.from(el.children).forEach(function (child) {
        child.style.transform = `translateX(calc(\${offset} * \${dir}))`;
    });
    const observer = new IntersectionObserver(function (entries) {
        if (entries[0].intersectionRatio === 0) {
            el.classList.remove(el.getAttribute('animatein'));
            el.style.overflow = 'hidden';
            return;
        }
        if (entries[0].intersectionRatio < Number(el.getAttribute('threshold'))) {
            return;
        }
        el.style.overflow = 'visible';
        el.classList.add(el.getAttribute('animatein'));
        Number(el.getAttribute('once')) && observer.unobserve(el);
    }, { threshold: [Number(el.getAttribute('threshold')), 0] });
    observer.observe(el);
});
})();
JS
    );
});
