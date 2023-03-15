# frozen_string_literal: true

##
# The controller for the primes routes.
class PrimesController < ApplicationController
  def index
    max = params[:n].to_i
    primes = Prime.between(1..max).map(&:prime)
    render json: primes
  end
end
