# frozen_string_literal: true

##
# The controller for the primes routes.
class PrimesController < ApplicationController
  def index
    render json: PrimeGenerator.generate_n_primes(params[:n].to_i)
  end
end
