<?php

use Illuminate\Database\Seeder;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('messages')->insert([
            'uuid' => 1,
            'id' => 'A0001',
            'content' => 'Drive disconnected from pool',
            'serial' => 'A1-00001',
            'severity' => 'Critical',
            'time' => '2016-07-31 10:59:59',
            'is_read' => 0,
            'created_at' => '2016-7-31 11:00:00'
        ]);

        DB::table('messages')->insert([
            'uuid' => 2,
            'id' => 'A0002',
            'content' => 'Drive disconnected from pool',
            'serial' => 'A1-00003',
            'severity' => 'Error',
            'time' => '2016-01-31 10:59:59',
            'is_read' => 0,
            'created_at' => '2016-1-31 11:00:00'
        ]);
    }
}
