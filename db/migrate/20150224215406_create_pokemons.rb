class CreatePokemons < ActiveRecord::Migration
  def change
    create_table :pokemons do |t|
      t.string :name
      t.string :image_url
      t.integer :pkdx_id
      t.integer :attack
      t.integer :defense
      t.integer :health
      t.integer :speed
      t.integer :weight
      t.integer :height

      t.timestamps null: false
    end
  end
end
