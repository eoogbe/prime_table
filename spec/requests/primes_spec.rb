# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Primes' do
  describe 'GET /index' do
    it 'returns http success' do
      get '/primes?n=3'

      expect(response).to have_http_status(:success)
    end

    it 'returns n primes' do
      get '/primes?n=3'

      expect(response.parsed_body).to eq([2, 3, 5])
    end
  end
end
