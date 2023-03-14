# frozen_string_literal: true

##
# Generates a multiplication table for prime numbers.
class PrimeTableGenerator
  # rubocop:disable Naming/MethodParameterName
  def initialize(n)
    # rubocop:enable Naming/MethodParameterName
    @n = n
  end

  def generate
    Array.new(@n + 1, Array.new(@n + 1, 1))
  end
end
