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
    values = self.class.generate_n_primes(n)
    values.unshift 1
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

  def self.generate_n_primes(n)
    primes = calc_primes(n)
    filter_primes(primes, n)
  end

  def self.calc_primes(n)
    prime_count = 0
    multiplier = 2
    cur = n * multiplier
    while prime_count < n
      primes = mark_primes_up_to_n(cur)
      prime_count = primes[2..].count(true)
      multiplier += 1
      cur = n * multiplier
    end
    primes
  end

  def self.filter_primes(primes, n)
    values = []
    (2...primes.size).each do |i|
      values << i if primes[i]
      return values if values.size == n
    end
  end

  private

  attr_reader :n
end
