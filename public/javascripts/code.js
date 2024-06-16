$(document).ready(function() {
  $('#codeForm').submit(function(event) {
    event.preventDefault();

    var code = $('#cppCode').val();

    $.ajax({
      url: '/code/run',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ code: code }),
      success: function(response) {
        $('#output').html('<pre>' + response.output + '</pre>');
      },
      error: function() {
        $('#output').html('<pre>An error occurred while running the code.</pre>');
      }
    });
  });
});
