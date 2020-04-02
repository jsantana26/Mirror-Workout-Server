$(document).ready(function(){
    $('.delete-recipe').on('click', function(){
        var id = $(this).data('id');
        var url = '/exercises/delete/' + id;

        if(confirm('Delete Exercise ' + id + '?')){
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result){
                    console.log('Deleting Exercise...');
                    window.location.href='/exercises';
                },
                error: function(err){
                    console.error("Error: ", err);
                }
            })
        }
    });

    $('.edit-recipe').on('click', function(){
        $('#edit-form-id').val($(this).data('id'));
        $('#edit-form-name').val($(this).data('name'));
        $('#edit-form-type').val($(this).data('type'));
        $('#edit-form-difficulty').val($(this).data('difficulty'));
        $('#edit-form-description').val($(this).data('description'));
        $('#edit-form-video_path').val($(this).data('video_path'));
        $('#edit-form-calories_burned').val($(this).data('calories_burned'));
    });
});