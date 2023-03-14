# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PrimeTableGenerator do
  before do
    stub_const('G', PropCheck::Generators)
  end

  describe '#generate_multiplication_table' do
    it 'has size n + 1' do
      PropCheck.forall(G.positive_integer) do |n|
        generator = described_class.new(n)

        result = generator.generate_multiplication_table

        expect(result.size).to eq(n + 1)
      end
    end

    it 'has elements of size n + 1' do
      PropCheck.forall(G.positive_integer) do |n|
        generator = described_class.new(n)

        result = generator.generate_multiplication_table

        expect(result).to all(have_attributes(size: n + 1))
      end
    end

    it 'each cell is a mulitple of the first row and column' do
      PropCheck.forall(G.positive_integer) do |n|
        generator = described_class.new(n)

        result = generator.generate_multiplication_table

        result.each_index do |i|
          result[i].each_index do |j|
            expect(result[i][j] / result[i][0]).to eq(result[0][j])
          end
        end
      end
    end
  end

  describe '.calc_primes' do
    it 'returns an array of primes up to n' do
      result = described_class.calc_primes(7)

      expect(result[2..]).to eq([true, true, false, true, false])
    end
  end
end
