# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Prime do
  describe '.between' do
    # rubocop:disable RSpec/ExampleLength
    it 'returns primes between a range' do
      result = described_class.between((3..7)).map do |p|
        p.attributes.slice('n', 'prime')
      end

      expect(result).to contain_exactly(
        { 'n' => 3, 'prime' => 5 },
        { 'n' => 4, 'prime' => 7 },
        { 'n' => 5, 'prime' => 11 },
        { 'n' => 6, 'prime' => 13 },
        { 'n' => 7, 'prime' => 17 }
      )
    end
    # rubocop:enable RSpec/ExampleLength
  end
end
