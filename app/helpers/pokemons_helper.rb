module PokemonsHelper

  def get_pokemon_ids
    Pokegem.get_obj('pokedex', 1)
           .pokemon.map { |p|
             p["resource_uri"].split('/').last.to_i
           }.sort
  end

  def get_pokemon(id)
    begin
      pokemon    = Pokegem.get_obj('pokemon', id)
      sprite_id  = pokemon.sprites.last["resource_uri"].split('/').last.to_i
      image_path = Pokegem.get_obj('sprite', sprite_id).image

      Pokemon.create(
        pkdx_id:     pokemon.pkdx_id,
        name:        pokemon.name,
        attack:      pokemon.attack,
        defense:     pokemon.defense,
        health:      pokemon.hp,
        speed:       pokemon.speed,
        weight:      pokemon.weight,
        height:      pokemon.height,
        catch_rate:  ((25..95).to_a.sample.to_f / 100.0), #pokemon.catch_rate,
        image_url:   "http://pokeapi.co#{image_path}"
      )
    rescue => e
      puts e
      return nil
    end
  end
end
