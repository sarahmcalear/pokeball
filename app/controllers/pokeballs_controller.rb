class PokeballsController < ApplicationController
  before_action :set_pokeball, only: [:show, :update, :destroy]

  def index
    @pokeballs = Pokeball.all
    render json: @pokeballs
  end

  def show

    render json: {pokeball: @pokeball, pokemon: @pokeball.pokemons}
  end

  def create
    @pokeball = Pokeball.new(pokeball_params)

    if @pokeball.save
      render :show, status: :created, location: @pokeball
    else
      render json: @pokeball.errors, status: :unprocessable_entity
    end
  end

  def update
    if @pokeball.update(pokeball_params)
      render :show, status: :ok, location: @pokeball
    else
      render json: @pokeball.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @pokeball.destroy
    head :no_content
  end

  private
  
  def set_pokeball
    @pokeball = Pokeball.find(params[:id])
  end

  def pokeball_params
    params.require(:pokeball).permit(:name, :pokemons)
  end
end
