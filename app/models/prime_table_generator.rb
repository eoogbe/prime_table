# frozen_string_literal: true

##
# A generator for a multiplication table for prime numbers.
class PrimeTableGenerator
  # rubocop:disable Naming/MethodParameterName
  ##
  # Creates a new generator.
  #
  # @param [Integer] n the size of the table
  def initialize(n)
    # rubocop:enable Naming/MethodParameterName
    @n = n
  end

  ##
  # Generates the prime multiplication table.
  def generate
    Array.new(@n + 1, Array.new(@n + 1, 1))
  end
end
