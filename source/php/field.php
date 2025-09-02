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
        $currentScreen = get_current_screen();
        $isBlockEditor = !empty($currentScreen->is_block_editor) ? "1" : "0";

        ?>
        <div class="acf-icon-field__container" id="<?php echo $id; ?>" data-js-acf-icon-field="container">
            <div data-js-acf-icon-field="preview" class="acf-icon-field__selected-preview-container">
                <div role="button" class="acf-icon-field__preview-clear" type="button" data-js-acf-icon-field="clear-button" aria-label="<?php __('Remove Icon', 'acf-icon-field'); ?>">
                    <span class="acf-icon-field__preview-clear-icon material-symbols material-symbols-rounded material-symbols-sharp material-symbols-outlined">delete</span>
                </div>
                <span class="acf-icon-field__preview-no-icon" data-js-acf-icon-field="no-icon">
                    <?php _e('No icon', 'acf-icon-field'); ?>
                </span>
                <div data-js-icon-field="preview-icon" class="acf-icon-field__selected-preview-icon"></div>
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
                    'class'         => 'acf-icon-search-input',
                    'placeholder'   => __('Search for icons', 'acf-icon-field') . '...',
                    'type'          => 'search',
                    'name'          => false,
                    'autocomplete'  => 'off',
                    'data-js-acf-icon-field' => 'search-input'
                ]);
                ?>
                <ul data-js-acf-icon-field="list" class="acf-icon-field__list" role="radiogroup"></ul>
            </div>
                
            <script>
                if (<?php echo $isBlockEditor ?>) {
                    getAcfIcons("<?php echo $id; ?>");
                } else {
                    document.addEventListener('DOMContentLoaded', function() {
                        getAcfIcons("<?php echo $id; ?>");
                    });
                }
            </script>
        </div>
        <?php
    }
}

new Field();