# frozen_string_literal: true

##
# The controller for the primes routes.
class PrimesController < ApplicationController
  def index
    min = [params[:min].to_i, 1].max
    max = params[:max].to_i
    primes = Prime.between(min..max).map(&:prime)
    render json: primes
  end
end
