# frozen_string_literal: true

##
# Validator for a min and max value that can go in a range of positive numbers.
class RangeValidator
  include ActiveModel::Validations

  attr_reader :min, :max

  validates :max, numericality: { only_integer: true, greater_than: 0 }
  validates :min, numericality: { only_integer: true, greater_than: 0 }
  validates :min, numericality: { less_than_or_equal_to: :max },
                  unless: -> { errors.include?(:max) || errors.of_kind?(:min, :not_a_number) }

  ##
  # Creates a new validator.
  # @param [String, nil] min the beginning of the range
  # @param [String] max the end of the range inclusive
  def initialize(min, max)
    @min = min || '1'
    @max = max
  end

  ##
  # Returns the range represented by min and max.
  # @return [Range]
  def range
    @range ||= (min.to_i..max.to_i)
  end
end
