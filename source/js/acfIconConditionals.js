(function($){
	
	
	/**
	*  initialize_field
	*
	*  This function will initialize the $field.
	*
	*  @date	30/11/17
	*  @since	5.6.5
	*
	*  @param	n/a
	*  @return	n/a
	*/

	acf.addAction('ready', function() {
		const icon = acf.Field.extend({ type: 'icon' });

		acf.registerConditionForFieldType('hasValue', 'icon');
		acf.registerConditionForFieldType('hasNoValue', 'icon');
	});
	
	function initialize_field( $field ) {
		const $input = $field.find('input[type="hidden"]');

		$input.on('change', function() {
			$input.trigger('acf-icon-field-change');
			console.log('Icon field value changed:', $input.val());
		});
	}
	
	
	if( typeof acf.add_action !== 'undefined' ) {
	
		/*
		*  ready & append (ACF5)
		*
		*  These two events are called when a field element is ready for initizliation.
		*  - ready: on page load similar to $(document).ready()
		*  - append: on new DOM elements appended via repeater field or other AJAX calls
		*
		*  @param	n/a
		*  @return	n/a
		*/
		acf.add_action('ready_field/type=icon', initialize_field);
		acf.add_action('append_field/type=icon', initialize_field);
		
		
	}
})(jQuery);