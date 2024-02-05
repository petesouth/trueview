<?php

use Illuminate\Database\Seeder;

class RulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rules')->insert([
            'org' => '12345',
            'name' => 'Slack Test',
            'state' => 'succeeded',
            'action' => 'slack',
            'enabled' => 1
        ]);

        DB::table('rules')->insert([
            'org' => '12345',
            'name' => 'Email Test'
        ]);

    }
}