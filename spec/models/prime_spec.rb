# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Prime do
  describe '.between' do
    # rubocop:disable RSpec/ExampleLength
    it 'returns primes between a range' do
      result = described_class.between(3..7).map do |p|
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

    it 'gets primes from the database' do
      result = described_class.between(1...2).first

      expect(result).not_to be_new_record
    end

    it 'does not recreate the same record' do
      described_class.between(1..3).to_a

      result = described_class.between(2..4).map do |p|
        p.attributes.slice('n', 'prime')
      end

      expect(result).to contain_exactly(
        { 'n' => 2, 'prime' => 3 },
        { 'n' => 3, 'prime' => 5 },
        { 'n' => 4, 'prime' => 7 }
      )
    end
  end
end
