<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $inventories = [
            [
                'id' => 1,
                'product_id' => 1,
                'qty' => 123,
                'location' => 'Manila',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'product_id' => 2,
                'qty' => 123,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'product_id' => 3,
                'qty' => 123,
                'location' => 'Manila',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'product_id' => 4,
                'qty' => 100,
                'location' => 'Manila',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'product_id' => 5,
                'qty' => 100,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'product_id' => 6,
                'qty' => 10,
                'location' => 'Manila',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'product_id' => 7,
                'qty' => 100,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'product_id' => 8,
                'qty' => 100,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'product_id' => 9,
                'qty' => 100,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'product_id' => 10,
                'qty' => 150,
                'location' => 'Leyte',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 11,
                'product_id' => 11,
                'qty' => 1000,
                'location' => 'Cebu',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 12,
                'product_id' => 12,
                'qty' => 100,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 13,
                'product_id' => 1,
                'qty' => 25,
                'location' => 'Manila',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 14,
                'product_id' => 2,
                'qty' => 100,
                'location' => 'Manila',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 15,
                'product_id' => 3,
                'qty' => 3890,
                'location' => 'Warehouse',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 16,
                'product_id' => 4,
                'qty' => 1000,
                'location' => 'Leyte',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('inventories')->insert($inventories);
    }
}
