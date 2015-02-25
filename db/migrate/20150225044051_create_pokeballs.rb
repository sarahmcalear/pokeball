class CreatePokeballs < ActiveRecord::Migration
  def change
    create_table :pokeballs do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
