# frozen_string_literal: true

##
# Represents the nth prime number.
class Prime < ApplicationRecord
  class << self
    ##
    # Finds or generates primes with n contained in +range+.
    # @param [Range] range the range of n values
    # @return [ActiveRecord::Relation] primes within the range
    def between(range)
      result = where(n: range).order(:n)
      return result if result.size == range.size

      max = range.max
      min = result.size + range.min - 1
      generate_and_insert(min, max)

      result
    end

    private

    def generate_and_insert(min, max)
      addl = PrimeGenerator.generate_n_primes(max)[min...max].each_with_index.map do |prime, i|
        { n: i + min + 1, prime: }
      end
      # rubocop:disable Rails/SkipsModelValidations
      Prime.insert_all(addl)
      # rubocop:enable Rails/SkipsModelValidations
    end
  end
end
