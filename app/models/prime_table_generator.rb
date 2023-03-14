# frozen_string_literal: true

##
# A generator for a multiplication table for prime numbers.
class PrimeTableGenerator
  ##
  # Creates a new generator.
  #
  # @param [Integer] n the size of the table
  def initialize(n)
    @n = n
  end

  ##
  # Generates the prime multiplication table.
  def generate_multiplication_table
    Array.new(@n + 1, Array.new(@n + 1, 1))
  end

  ##
  # Generates primes using the Sieve of Eratosthenes.
  #
  # @return [Array<Boolean>] for any index k > 2, if index k is +true+ then k is a prime number
  def self.primes(n)
    result = [true] * n

    (2...n).each do |i|
      next unless result[i]

      (i...n).each do |j|
        break unless i * j < n

        result[i * j] = false
      end
    end

    result
  end
end
