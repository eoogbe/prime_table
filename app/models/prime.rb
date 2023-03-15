# frozen_string_literal: true

##
# Represents the nth prime number.
class Prime < ApplicationRecord
  def self.between(range)
    result = where(n: range).order(:n)
    return result if result.size == range.size

    max = range.max
    min = result.size + range.min - 1
    PrimeGenerator.generate_n_primes(max)[min...max].each_with_index do |prime, i|
      create(n: i + min + 1, prime:)
    end

    result
  end
end
