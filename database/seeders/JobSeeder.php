<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Job;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Job::truncate();
        Job::unguard();

        $faker = \Faker\Factory::create();

        User::all()->each(function ($user) use ($faker) {
            foreach (range(1, 5) as $i) {
                $status = 'queued';
                if ($i === 1) {
                    $status = 'processing';
                } else if ($i === 2) {
                    $status = 'completed';
                }

                Job::create([
                    'user_id' => $user->getKey(),
                    'title' => $faker->jobTitle,
                    'status' => rand(0, 2),
                ]);
            }
        });
    }
}
