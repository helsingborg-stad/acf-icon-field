<?php

/*
Plugin Name:    Acf Icon Field
Description:    Icon field for Advanced Custom Fields
Version:        1.0
Author:         Niclas Norin
*/

namespace AcfIcon;

use AcfIcon\CacheBust;

if (! defined('WPINC')) {
    die;
}

class Plugin
{
    public function init()
    {
        if (!defined('ACFICON_PATH')) {
            define('ACFICON_PATH', plugin_dir_path(__FILE__));
        }
        if (!defined('ACFICON_URL')) {
            define('ACFICON_URL', plugins_url('', __FILE__));
        }

        if (file_exists(__DIR__ . '/vendor/autoload.php')) {
            require __DIR__ . '/vendor/autoload.php';
        }

        // Load text domain for translations
        add_action('init', [$this, 'loadTextDomain']);

        add_action('acf/include_field_types', [$this, 'addAcfIconField']);

        add_action('admin_enqueue_scripts', [$this, 'loadScriptsAndStyle'], 10);
        add_action('enqueue_block_editor_assets', [$this, 'loadScriptsAndStyle'], 10);
    }

    private function getCacheBust()
    {
        static $cacheBust = null;

        if ($cacheBust === null) {
            $cacheBust = new CacheBust();
        }

        return $cacheBust;
    }

    /**
     * Load text domain for translations
     */
    public function loadTextDomain()
    {
        $domain  = 'acf-icon-field';
        $langDir = 'languages';

        if (strpos(__FILE__, WPMU_PLUGIN_DIR) === 0) {
            $relPath = str_replace(WPMU_PLUGIN_DIR . '/', '', dirname(__FILE__)) . '/' . $langDir;
            load_muplugin_textdomain(
                $domain,
                $relPath
            );
        } else {
            load_plugin_textdomain(
                $domain,
                false,
                dirname(plugin_basename(__FILE__)) . '/' . $langDir
            );
        }
    }

    public function addAcfIconField()
    {
        require_once ACFICON_PATH . 'source/php/field.php';
    }

    /**
     * Enqueue scripts and styles in the admin
     */
    public function loadScriptsAndStyle()
    {
        wp_register_script_module(
            'acf-icon-field-initializer',
            ACFICON_URL . '/dist/' . $this->getCacheBust()->name('js/acf-icon-field-initializer.js'),
            [],
            null
        );

        wp_enqueue_script_module('acf-icon-field-initializer');

        wp_register_style(
            'acf-icon-field',
            ACFICON_URL . '/dist/' . $this->getCacheBust()->name('css/acf-icon-field.css'),
            [],
            null
        );

        wp_enqueue_style('acf-icon-field');
    }
}

(new \AcfIcon\Plugin())->init();