# frozen_string_literal: true

##
# The controller for the primes routes.
class PrimesController < ApplicationController
  def index
    validator = RangeValidator.new(params[:min], params[:max])
    if validator.valid?
      primes = Prime.between(validator.range).map(&:prime)
      render json: primes
    else
      render json: validator.errors.as_json, status: :bad_request
    end
  end
end
