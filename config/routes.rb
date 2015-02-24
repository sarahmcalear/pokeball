Rails.application.routes.draw do
  root 'welcome#index'

  resources :pokemons, except: [:new, :edit]
end
