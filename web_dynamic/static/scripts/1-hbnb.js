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
