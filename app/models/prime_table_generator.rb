# frozen_string_literal: true

##
# A generator for a multiplication table for prime numbers.
class PrimeTableGenerator
  ##
  # Creates a new generator.
  #
  # @param [Integer] n the number of prime numbers in each row and column header of the table
  def initialize(n)
    @n = n
  end

  ##
  # Generates the prime multiplication table.
  def generate_multiplication_table
    prime_count = 0
    multiplier = 2
    cur = @n * multiplier
    while prime_count < @n
      primes = self.class.calc_primes(cur)
      prime_count = primes[2..].count(true)
      multiplier += 1
      cur = @n * multiplier
    end
    values = [1]
    (2...primes.size).each do |i|
      values << i if primes[i]
      break if values.size == @n + 1
    end
    values.map do |i|
      values.map do |j|
        i * j
      end
    end
  end

  ##
  # Calculates primes using the Sieve of Eratosthenes.
  #
  # @return [Array<Boolean>] for any index k > 2, if index k is +true+ then k is a prime number
  def self.calc_primes(n)
    result = [true] * (n + 1)

    (2..n).each do |i|
      next unless result[i]

      (i..n).each do |j|
        break unless i * j < n

        result[i * j] = false
      end
    end

    result
  end
end
