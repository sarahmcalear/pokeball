var currentPokemonData = function() {
  return {
    id: $pokemon.data('rid'),
    pkdx_id: $pokemon.data('pkdx-id'),
    name: $pokemon.find('h4').text(),
    image_url: $pokemon.find('img').attr('src')
  };
}

var currentPlayer = function($chosen) {
  return $chosen.children().first().data('name');
}

// Click methods
var catchPokemon = function(e) {
  var $chosen_player = $('.chosen').children().first();
  var $pokemon       = $(e.target).parent();
  var data           = currentPokemonData();

  // tell the db to add this pokemon to the pokeball
  $.ajax({
    url: 'pokeballs/' + $chosen_player.data('rid') + '/pokemons',
    type: 'post',
    data: {pokemon_id: data.id}
  }).done(function(success){
    console.log(success);
    attachSmallPokemonTemplate(data, $chosen_player.find('.panel-body'));
  });

  clearRandomPokemon();
  // attachSmallPokemonTemplate(data, $chosen_player.find('.panel-body'));
  console.log($chosen_player.data('name') + ' --> ' + $pokemon.data('rid'));
}

// these methods change the chosen pokeball and return whose pokeball it is
var iChoseNext = function() {
  $col    = $('.pokeball-col');
  $chosen = $('.chosen');
  if ($chosen.length != 0) { // if there is a chosen pokeball!
    $next   = $chosen.next();
    if ($next.hasClass('new-pokeball')) { // start over
      $next = $next.siblings().first();
    }
    $chosen.removeClass('chosen');
    $next.addClass('chosen');

    return currentPlayer($next);
  } else if ($col.length != 0) { // no one chosen yet!
    $chosen = $col.first().addClass('chosen');

    return currentPlayer($chosen);
  } else { // no pokeballs!
    return null;
  }
}

var removePokemon = function(e){
  $pokemon = $(e.target).parent();
  $currentPlayer = $pokemon.parent().parent()

  $.ajax({
    url: '/pokeballs/' + $currentPlayer.data('rid') + '/pokemons/' + $pokemon.data('rid'),
    type: 'delete'
  }).done(function(){
    $pokemon.remove();
  })
  console.log($currentPlayer.data('rid'))
}

var loadPokemon = function(){
  $.ajax({
    url: "/pokeballs",
    dataType: "JSON",
    type: "GET"
  }).done(function(data){
    console.log(data);

    for(var i=0, len=data.length; i< len; i++){
      var id = data[i].id;

      $.ajax({
        url: '/pokeballs/' + id,
        type: 'GET',
        dataType: 'JSON'
      }).done(function(pokeball){
        console.log(pokeball)
        var pokemons = pokeball.pokemons;
        var name = pokeball.pokeball.name.toLowerCase();
        var $list = $('[data-name=' + name + ']');

        for (var j=0, len=pokemons.length; j<len; j++){
          attachSmallPokemonTemplate(pokemons[j], $list.find('.panel-body'));
        }
      })
    }
  });
}

