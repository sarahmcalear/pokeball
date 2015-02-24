class AddCatchRateToPokemon < ActiveRecord::Migration
  def change
    add_column :pokemons, :catch_rate, :float
  end
end
