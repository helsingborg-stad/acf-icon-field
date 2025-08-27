<?php

namespace AcfIcon;

class Field extends \acf_field
{
    public $name;
    public $label;
    public $category;
    public $settings;

    public function __construct() {
        $this->name = 'icon';
        $this->label = 'Icon';
        $this->category = 'basic';
        $this->settings = array(
            'path' => plugin_dir_path(__FILE__),
            'dir' => plugin_dir_url(__FILE__),
        );

        parent::__construct();
    }

    /**
     * Render the field input
     */
    public function render_field($field) {
        ?>
        <div class="acf-icon-search-wrapper">
            <?php
            acf_text_input(
                array(
                    'class'       => 'acf-icon-search-input',
                    'placeholder' => esc_html__( 'Search icons...', 'acf-icon-field' ),
                    'type'        => 'search',
                )
            );
            ?>
        </div>
        <div
            class="acf-icon-list"
            role="radiogroup"
        >
            
        </div>
        <?php
    }

    /**
     * Add custom field settings for latitude and longitude
     */
    public function render_field_settings($field) {
        acf_render_field_setting($field, [
            'label'        => __('Icon Library', 'acf-icon-field'),
            'instructions' => __('Choose which icon library this field should use.', 'acf-icon-field'),
            'type'         => 'select',
            'name'         => 'library',
            'choices'      => [
                'material'    => 'Material Icons',
                'dashicons'   => 'Dashicons',
            ],
            'default_value' => 'material',
        ]);
    }
}

new Field();