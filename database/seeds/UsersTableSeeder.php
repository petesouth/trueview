<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@tv.com',
            'password' => bcrypt('admin'),
            'org_id' => '12345',
            'role_id' => '1',
            'api_token' => str_random(60),
            'confirmed' => 1,
            'confirmation_code' => str_random(30),
        ]);

        DB::table('users')->insert([
            'name' => 'lola',
            'email' => 'lola@tv.com',
            'password' => bcrypt('admin'),
            'org_id' => '12345',
            'role_id' => '1',
            'api_token' => str_random(60),
            'confirmed' => 0,
            'confirmation_code' => str_random(30),
        ]);

        DB::table('users')->insert([
            'name' => 'Viewer',
            'email' => 'viewer@tv.com',
            'password' => bcrypt('viewer'),
            'org_id' => '00001',
            'role_id' => '3',
            'api_token' => str_random(60),
            'confirmed' => 0,
            'confirmation_code' => str_random(30),
        ]);
    }
}
