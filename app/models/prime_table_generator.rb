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
    primes = calc_primes
    values = filter_primes(primes)
    values.map do |i|
      values.map do |j|
        i * j
      end
    end
  end

  ##
  # Calculates primes up to +n+ using the Sieve of Eratosthenes.
  #
  # @param [Integer] n the size of the array
  # @return [Array<Boolean>] for any index k > 2, if index k is +true+ then k is a prime number
  def self.mark_primes_up_to_n(n)
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

  private

  attr_reader :n

  def calc_primes
    prime_count = 0
    multiplier = 2
    cur = n * multiplier
    while prime_count < n
      primes = self.class.mark_primes_up_to_n(cur)
      prime_count = primes[2..].count(true)
      multiplier += 1
      cur = n * multiplier
    end
    primes
  end

  def filter_primes(primes)
    values = [1]
    (2...primes.size).each do |i|
      values << i if primes[i]
      return values if values.size == n + 1
    end
  end
end
