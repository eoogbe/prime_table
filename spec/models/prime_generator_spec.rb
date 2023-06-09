# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PrimeGenerator do
  describe '.mark_primes_up_to_n' do
    it 'returns an array marking the primes up to n as true' do
      result = described_class.mark_primes_up_to_n(7)

      expect(result[2..]).to eq([true, true, false, true, false, true])
    end

    it 'starts at 2' do
      result = described_class.mark_primes_up_to_n(2)

      expect(result[2]).to be(true)
    end
  end

  describe '.generate_n_primes' do
    where(:n, :answer) do
      [
        [1, [2]],
        [3, [2, 3, 5]],
        [7, [2, 3, 5, 7, 11, 13, 17]]
      ]
    end

    with_them do
      it 'returns the first n prime numbers' do
        result = described_class.generate_n_primes(n)

        expect(result).to eq(answer)
      end
    end
  end
end
