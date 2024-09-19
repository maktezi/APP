<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $categories = [
            'Graphics Cards',
            'Motherboards',
            'CPUs',
            'RAM',
            'Hard Drives',
            'SSDs',
            'Cases',
            'Power Supplies',
            'Cooling',
            'Fans',
            'PSUs',
            'Networking',
            'WiFi',
            'Bluetooth',
            'Cameras',
            'Mice',
            'Monitors',
            'Printers',
            'Speakers',
            'Headphones',
            'Webcams',
            'External Hard Drives',
            'Docking Stations',
            'USB Hubs',
        ];
        $generatedSlugs = [];

        foreach ($categories as $category) {
            do {
                $slug = strtoupper(substr(md5(mt_rand()), 0, 8));
            } while (in_array($slug, $generatedSlugs));

            $generatedSlugs[] = $slug;

            DB::table('categories')->upsert(
                [
                    'name' => $category,
                    'slug' => $slug,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                ['name'],
                ['slug', 'updated_at']
            );
        }
    }
}
