<?php

use Illuminate\Database\Seeder;

class OrgsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('orgs')->insert([
            'id' => '1',
            'org_id' => '12345',
            'name' => 'iXsystems, Inc. for test',
            'influx' => 'trueview-demo.freehive.io'
        ]);

    }
}
