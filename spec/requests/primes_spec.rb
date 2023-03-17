# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Primes' do
  describe 'GET /index' do
    it 'when valid returns http success' do
      get '/primes?max=3'

      expect(response).to have_http_status(:success)
    end

    it 'returns primes between the min and the max' do
      get '/primes?min=3&max=7'

      expect(response.parsed_body).to eq([5, 7, 11, 13, 17])
    end

    it 'can be called multiple times' do
      get '/primes?max=3'
      get '/primes?max=3'

      expect(response).to have_http_status(:success)
    end

    it 'when invalid range returns http bad request' do
      get '/primes?max=bad'

      expect(response).to have_http_status(:bad_request)
    end
  end
end
