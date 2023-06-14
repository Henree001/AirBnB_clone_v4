$(document).ready(function()
{
    $(document).ready(function () {
        let list = [];
        $('input[type="checkbox"]').change(function () {
          let amenity_name = $(this).attr('data-name');
          if ($(this).is(':checked')) {
              list.push(amenity_name);
          }
          else {
            $.each(list, function(i, item) {
              if (item === amenity_name) {
                  list.splice(i, 1);
              } 
            });
          }
          $('.amenities h4').text(list.join(', '));
        })
      });
      
	$.get("http://127.0.0.1:5001/api/v1/status/", function(data, textStatus)
	{
		if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        }
        else {
            $('div#api_status').removeClass('available');
        }
	});
});