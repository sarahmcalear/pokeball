Pokemon.destroy_all

include PokemonsHelper

pokedex = get_pokemon_ids
total   = pokedex.length
i       = 1
colors  = [:green, :blue, :yellow]

pokedex.each do |id|
  pokemon = get_pokemon(id)
  if pokemon
    message = "#{id.to_s.rjust 3}. #{pokemon.name.send(colors[i%3])} was caught."
    l = message.length
    puts "#{message}#{l<38 ? "\t" : ""}#{l<46 ? "\t" : ""} Only #{total-i} left."
  else
    puts "#{id.to_s.rjust 3}. oh no, one escaped...".red
  end
  i+=1
end