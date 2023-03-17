# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RangeValidator do
  describe '#range' do
    it 'when min and max valid returns range' do
      validator = described_class.new('2', '3')

      expect(validator.range).to eq(2..3)
    end
  end
end
