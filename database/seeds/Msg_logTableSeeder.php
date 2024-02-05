<?php

use Illuminate\Database\Seeder;

class Msg_logTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('msg_log')->insert([
            'org_id' => '12345',
            'is_update' => '0',
            'new_msg' => '0'
        ]);
    }
}
