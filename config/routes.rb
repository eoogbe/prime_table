# frozen_string_literal: true

Rails.application.routes.draw do
  get 'prime_table/new'
  get 'prime_table', to: 'prime_table#show'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'prime_table#new'
end
