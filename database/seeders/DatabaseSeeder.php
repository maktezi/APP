<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(JobSeeder::class);

        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'admin@mail.com',
            'password' => bcrypt('admin1234'),
        ]);
    }
}
