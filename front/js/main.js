$(document).ready(function (  ) {
	$('.delete-students').on('click', function (  ) {
		var id = $(this).data('id');
		var url = '/delete/'+id;
		if(confirm('Delete?')){
			$.ajax({
				url:url,
				type:'Delete',
				success:function ( result ) {
					console.log("Fine...");
					window.location.href='/';
				},
				error :function(err){
					console.log("Smth wrong");
				}
			})
		}
	})
	$('.edit-students').on('click', function (  ) {
		$('#edit-form-name').val($(this).data('name'));
		$('#edit-form-age').val($(this).data('age'));
		$('#edit-form-group').val($(this).data('group'));
		$('#edit-form-id').val($(this).data('id'));
	})
})