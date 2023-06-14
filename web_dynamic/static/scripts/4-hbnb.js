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
      if (list.length === 0) {
        $('.amenities h4').html('&nbsp;');
      }
      else {
      $('.amenities h4').text(list.join(', '));
      };
    })

    $.get("http://127.0.0.1:5001/api/v1/status/", function(data, textStatus)
	{
		if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        }
        else {
            $('div#api_status').removeClass('available');
        }
	});

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'http://127.0.0.1:5001/api/v1/places_search/',
        data: JSON.stringify({}),
        error: (e) => { console.log(e); },
        dataType: 'json',
        success: append_places
    });

    $('button').click(function () {
        let amenitiesList = [];
        $.each($('input:checked'), function () {
        amenitiesList.push($(this).attr('data-id'));
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://127.0.0.1:5001/api/v1/places_search/',
            data: JSON.stringify({'amenities': amenitiesList}),
            error: (e) => { console.log(e); },
            dataType: 'json',
            success: append_places
        });
    });
});

    function append_places(data, textStatus, jQxhr) {
        for (let place of data) {
          $('section.places').append(
            `<article>
            <div class='title'>
            <h2>${place.name}</h2>
            <div class='price_by_night'>
            $${place.price_by_night}
            </div>
            </div>
            <div class='information'>
            <div class = 'max_guest'>
            <i class='fa fa-users fa-3x' aria-hidden='true'></i>
            <br />
            ${place.max_guest} Guests 
            </div> 
            <div class='number_rooms'> 
            <i class='fa fa-bed fa-3x' aria-hidden='true'></i> 
            <br /> 
            ${place.number_rooms} Bedrooms 
            </div>
            <div class='number_bathrooms'>
            <i class='fa fa-bath fa-3x' aria-hidden='true'></i>
            <br />
            ${place.number_bathrooms} Bathroom
            </div>
            </div>
            <div class='description'>
            ${place.description}
            </div> 
            </article>`);
          };
      };
  });