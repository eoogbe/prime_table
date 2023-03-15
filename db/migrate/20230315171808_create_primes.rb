# frozen_string_literal: true

##
# Migration to create the primes table
class CreatePrimes < ActiveRecord::Migration[7.0]
  def change
    create_table :primes do |t|
      t.integer :n
      t.integer :prime

      t.timestamps
    end
    add_index :primes, :n, unique: true
    add_index :primes, :prime, unique: true
  end
end
