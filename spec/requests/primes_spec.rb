# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Primes' do
  describe 'GET /index' do
    it 'returns http success' do
      get '/primes?max=3'

      expect(response).to have_http_status(:success)
    end

    it 'returns primes between the min and the max' do
      get '/primes?min=3&max=7'

      expect(response.parsed_body).to eq([5, 7, 11, 13, 17])
    end

    it 'defaults the min to 1' do
      get '/primes?max=3'

      expect(response.parsed_body).to eq([2, 3, 5])
    end

    it 'can be called multiple times' do
      get '/primes?max=3'
      get '/primes?max=3'

      expect(response).to have_http_status(:success)
    end
  end
end
