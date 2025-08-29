<?php

/*
Plugin Name:    Acf Icon Field
Description:    Icon field for Advanced Custom Fields
Version:        1.0
Author:         Niclas Norin
*/

use AcfIcon\CacheBust;

if (! defined('WPINC')) {
    die;
}

define('ACFICON_PATH', plugin_dir_path(__FILE__));
define('ACFICON_URL', plugins_url('', __FILE__));

if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
}

// add_action('init', function () {
//     $domain = 'acf-icon-field';
//     $locale = determine_locale();
//     $mofile = plugin_dir_path(__FILE__) . 'languages/' . $domain . '-' . $locale . '.mo';

//     load_textdomain($domain, $mofile);
// });

add_action( 'acf/include_field_types', 'addAcfIconField');

add_action('admin_enqueue_scripts', 'loadScriptsAndStyle', 10);
add_action('enqueue_block_editor_assets', 'loadScriptsAndStyle', 10);

function getCacheBust() {
    static $cacheBust = null;

    if ($cacheBust === null) {
        $cacheBust = new CacheBust();
    }

    return $cacheBust;
}

function addAcfIconField() {
    require_once ACFICON_PATH . 'source/php/field.php';
}

/**
 * Enqueue scripts and styles in the admin
 */
function loadScriptsAndStyle() {
    wp_register_script_module(
        'acf-icon-field-initializer',
        ACFICON_URL . '/dist/' . getCacheBust()->name('js/acf-icon-field-initializer.js'),
        [],
        null,
        true
    );

    wp_enqueue_script_module('acf-icon-field-initializer');

    wp_register_style(
        'acf-icon-field',
        ACFICON_URL . '/dist/' . getCacheBust()->name('css/acf-icon-field.css'),
        [],
        null
    );

    wp_enqueue_style('acf-icon-field');
}
?>