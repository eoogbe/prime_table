# frozen_string_literal: true

##
# Represents the nth prime number.
class Prime < ApplicationRecord
  def self.between(range)
    min, max = range.minmax
    PrimeGenerator.generate_n_primes(max)[(min - 1)...max].each_with_index.map do |prime, i|
      new(n: i + min, prime:)
    end
  end
end
