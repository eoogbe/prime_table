# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PrimeTableGenerator do
  before do
    stub_const('G', PropCheck::Generators)
  end

  describe '#generate' do
    it 'has size n' do
      PropCheck.forall(G.positive_integer) do |n|
        generator = described_class.new(n)

        result = generator.generate

        expect(result.size).to eq(n)
      end
    end

    it 'has elements of size n' do
      PropCheck.forall(G.positive_integer) do |n|
        generator = described_class.new(n)

        result = generator.generate

        expect(result).to all(have_attributes(size: n))
      end
    end
  end
end
