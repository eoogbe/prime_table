# frozen_string_literal: true

##
# Validator for a min and max value that can go in a range of positive numbers.
class RangeValidator
  attr_reader :min, :max

  ##
  # Creates a new validator.
  # @param [String, nil] min the beginning of the range
  # @param [String] max the end of the range inclusive
  def initialize(min, max)
    @min = min
    @max = max
  end

  ##
  # Returns the range represented by min and max.
  # @return [Range]
  def range
    (min.to_i..max.to_i)
  end
end
