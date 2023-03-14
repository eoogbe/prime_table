# frozen_string_literal: true

##
# The controller for the prime_table routes
class PrimeTableController < ApplicationController
  def show
    generator = PrimeTableGenerator.new(params[:n].to_i)
    @prime_table = generator.generate_multiplication_table
  end

  def new; end
end
