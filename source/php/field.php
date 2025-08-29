<?php
namespace AcfIcon;

class Field extends \acf_field
{
    public $name = 'icon';
    public $label = 'Icon';
    public $category = 'basic';
    public $defaults;
    public $settings;

    public function __construct() {
        $this->settings = [
            'path' => plugin_dir_path(__FILE__),
            'dir'  => plugin_dir_url(__FILE__),
        ];
        
        $this->defaults = array(
            'default_value' => '',
            'placeholder'   => '',
        );

        parent::__construct();
    }

    public function render_field($field) {
        $id = uniqid('acf-icon-field-');

        ?>
        <div class="acf-icon-field__container" id="<?php echo $id; ?>" onclick="getAcfIcons(this)" data-js-acf-icon-field="container">
            <div class="acf-icon-field__selected-preview">
                hello
            </div>
            <div class="acf-icon-field__search">
                <input 
                        type="hidden" 
                        name="<?php echo esc_attr($field['name']); ?>" 
                        value="<?php echo esc_attr($field['value']); ?>" 
                        class="acf-icon-value-input"
                        data-js-acf-icon-field="hidden-input"
                    />
                <?php

                // 👇 helper search input (not saved, no name)
                acf_text_input([
                    'class'       => 'acf-icon-search-input',
                    'placeholder' => esc_html__( 'Search icons...', 'acf-icon-field' ),
                    'type'        => 'search',
                    'name'        => false,
                    'data-js-acf-icon-field' => 'search-input'
                ]);
                ?>
                <ul data-js-acf-icon-field="list" class="acf-icon-list" role="radiogroup"></ul>
            </div>

            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    getAcfIcons("<?php echo $id; ?>");
                });
            </script>
        </div>
        <?php
    }
}

new Field();