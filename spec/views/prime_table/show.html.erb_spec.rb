# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'prime_table/show.html.erb' do
  it 'displays the primes as headers' do
    assign(:prime_table, [[1, 2, 3, 5], [2, 4, 6, 10], [3, 6, 9, 15], [5, 10, 15, 25]])

    render

    %w[2 3 5].each do |header|
      assert_select 'th', text: header, count: 2
    end
  end
end
