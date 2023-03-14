# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'PrimeTables' do
  before do
    driven_by(:rack_test)
  end

  it 'generates a multiplication table for prime numbers' do
    visit root_path

    fill_in 'Number', with: '3'
    click_button 'Generate'

    expect(page).to have_content('25')
  end
end
