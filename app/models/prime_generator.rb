# frozen_string_literal: true

##
# A generator for prime numbers.
module PrimeGenerator
  extend self

  ##
  # Calculates primes up to +n+ using the Sieve of Eratosthenes.
  #
  # @param [Integer] n the max number
  # @return [Array<Boolean>] for any index k > 2, if index k is +true+ then k is a prime number
  def mark_primes_up_to_n(n)
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

  ##
  # Calculcates the first +n+ prime numbers.
  #
  # @param [Integer] n the number of primes
  # @return [Array<Integer>] the first +n+ prime numbers
  def generate_n_primes(n)
    primes = calc_primes(n)
    filter_primes(primes, n)
  end

  private

  def calc_primes(n)
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

  def filter_primes(primes, n)
    values = []
    (2...primes.size).each do |i|
      values << i if primes[i]
      return values if values.size == n
    end
  end
end
