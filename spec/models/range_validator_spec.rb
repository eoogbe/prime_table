# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RangeValidator do
  describe '#range' do
    it 'when min and max valid returns range' do
      validator = described_class.new('2', '3')

      expect(validator.range).to eq(2..3)
    end
  end

  describe '#valid?' do
    it 'when min and max valid returns true' do
      validator = described_class.new('2', '3')

      expect(validator).to be_valid
    end

    it 'when min is not a number returns false' do
      validator = described_class.new('bad', '3')

      expect(validator).not_to be_valid
    end

    it 'when min is less than 1 returns false' do
      validator = described_class.new('0', '3')

      expect(validator).not_to be_valid
    end

    it 'when min is greater than max returns false' do
      validator = described_class.new('4', '3')

      expect(validator).not_to be_valid
    end
  end
end
