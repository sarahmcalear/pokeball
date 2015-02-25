console.log('loaded, bru.');

var $randomPokemon;

var $templatePokemonLarge = function(attributes) {
  $template = $('<div class="pokemon template large animated zoomIn">')
                .data('rid', attributes.id)
                .data('pkdx-id', attributes.pkdx_id);

  $('<h4>').text(attributes.name).appendTo($template);
  $image = $('<img class="poke-sprite" width="120"/>')
             .attr('src', attributes.image_url);
  $('<div class="sprite-canvas">')
    .append($image)
    .appendTo($template);
  $('<br>').appendTo($template);
  $('<button type="button" class="btn btn-md btn-default">Catch!</button>')
    .appendTo($template);
  return $template;
}

var attachLargePokemonTemplate = function(attributes) {
  clearRandomPokemon();
  $randomPokemon.parent().removeClass('empty');
  $pokemon = $templatePokemonLarge(attributes);
  $randomPokemon.append($pokemon);
}

var clearRandomPokemon = function() {
  $randomPokemon.children().fadeOut().remove();
}

var $templatePokemonSmall = function(attributes) {
  // create a small jQuery template for Pokémon
  // to insert into your Poké ball!
}

$(document).ready(function() {
  $randomPokemon = $('#show-random-poke');

  $('#generate-random-poke').on('click', function(e) {
    $.getJSON('/pokemons?random=true')
      .done(function(data) {
        console.log(data);
        attachLargePokemonTemplate(data);
      });
  });
});