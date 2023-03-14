# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'prime_table/show.html.erb' do
  it 'displays the primes as headers' do
    assign(:primes, [1, 2, 3, 5])

    render

    %w[2 3 5].each do |header|
      assert_select 'th', text: header, count: 2
    end
  end

  it 'displays multiplication results as table cells' do
    assign(:primes, [1, 2, 3, 5])

    render

    { '4' => 1, '6' => 2, '9' => 1, '10' => 2, '15' => 2, '25' => 1 }.each do |cell, count|
      assert_select 'td', text: cell, count:
    end
  end

  it 'does not display 1' do
    assign(:primes, [1, 2, 3, 5])

    render

    assert_select 'th', text: '1', count: 0
  end
end
