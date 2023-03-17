# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RangeValidator do
  describe '#range' do
    it 'when min and max valid returns range' do
      validator = described_class.new('2', '3')

      expect(validator.range).to eq(2..3)
    end

    it 'when min nil begins range at 1' do
      validator = described_class.new(nil, '3')

      expect(validator.range).to eq(1..3)
    end
  end

  describe 'validation' do
    it 'when min and max valid is valid' do
      validator = described_class.new('2', '3')

      expect(validator).to be_valid
    end

    it 'when min nil is valid' do
      validator = described_class.new(nil, '3')

      expect(validator).to be_valid
    end

    it 'when min is not a number is not valid' do
      validator = described_class.new('bad', '3')

      expect(validator).not_to be_valid
    end

    it 'when min is less than 1 is not valid' do
      validator = described_class.new('0', '3')

      expect(validator).not_to be_valid
    end

    it 'when min is greater than max is not valid' do
      validator = described_class.new('4', '3')

      expect(validator).not_to be_valid
    end

    it 'when max is not a number is not valid' do
      validator = described_class.new('2', 'bad')

      expect(validator).not_to be_valid
    end

    # rubocop:disable RSpec/MultipleExpectations
    it 'when max is less than 1 has error on max' do
      validator = described_class.new('2', '0')

      expect(validator).not_to be_valid
      expect(validator.errors).to be_of_kind(:max, :greater_than)
    end
    # rubocop:enable RSpec/MultipleExpectations
  end
end
