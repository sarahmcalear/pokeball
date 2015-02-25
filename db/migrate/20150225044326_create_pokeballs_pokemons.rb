class CreatePokeballsPokemons < ActiveRecord::Migration
  def change
    create_table :pokeballs_pokemons do |t|
      t.integer :pokeball_id
      t.integer :pokemon_id
    end

    add_foreign_key :pokeballs_pokemons, :pokeballs
    add_foreign_key :pokeballs_pokemons, :pokemons    
  end
end
