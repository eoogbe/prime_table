# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'PrimeTables' do
  describe 'GET /new' do
    it 'returns http success' do
      get '/prime_table/new'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /show' do
    it 'returns http success' do
      get '/prime_table?n=3'

      expect(response).to have_http_status(:success)
    end
  end
end
