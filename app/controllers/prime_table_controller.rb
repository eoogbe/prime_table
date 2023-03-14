# frozen_string_literal: true

##
# The controller for the prime_table routes
class PrimeTableController < ApplicationController
  def show
    @primes = PrimeGenerator.generate_n_primes(params[:n].to_i)
    @primes.unshift 1
  end

  def new; end
end
