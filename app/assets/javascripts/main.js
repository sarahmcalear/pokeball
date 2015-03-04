console.log('loaded, bru.');

var $randomPokemon, // page element references (set on load below...)
    $newPokeball,
    $pokeballs,
    $pokeballListEl,
    $pokemon;

var attachPokeball = function(attributes) {
  // call your pokeball template and then append it where it should go
  $template = $('<div class="pokemon template small animated zoomIn">')
    .attr('data-rid', attributes.id)
    .attr('data-pkdx-id', attributes.pkdx_id)
    .attr('data-name', attributes.name)
    $('<img class="poke-sprite" width="120">').attr('src', attributes.image_url).appendTo($template);

}

$(document).ready(function() {
  $randomPokemon = $('#show-random-poke');
  $newPokeball   = $('#add-pokeball');
  $pokeballs     = $('.panel');
  $pokeballListEl = $('.pokeballs');

  $('#generate-random-poke').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: "http://localhost:3000/pokemons",
      dataType: "json",
      data: {"random" : "true"},
      type: "GET"
    }).done(function(data){
      attachLargePokemonTemplate(data);
    })
  });

  loadPokemon();
});


  var $templatePokeball = function(attributes) {
    // create a small jQuery template for pokéballs
}






// Utility function!

var capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}
