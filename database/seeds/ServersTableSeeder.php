<?php

use Illuminate\Database\Seeder;

class ServersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('servers')->insert([
            'id' => 1,
            'system_serial' => 'a1e88f9b-7f42-11e6-bae4-fcaa14e9e99e',
            'model' => 'Z30',
            'hostname' => 'TN_TRUENAS',
            'ip' => '10.0.0.2',
            'customer_id' => '12345',
            'config_name' => 'TN_TRUENAS',
            'wnty_expire' => '2017-12-31',
            'actived' => 1,
            'registered' => 1
        ]);

        DB::table('servers')->insert([
            'id' => 2,
            'system_serial' => '6e7f5be6-5859-11e6-a878-6794d019a181',
            'model' => 'Z30',
            'hostname' => 'TN_TRUENAS2',
            'ip' => '10.248.1.7',
            'customer_id' => '12345',
            'config_name' => 'TN_TRUENAS2',
            'wnty_expire' => '2018-12-31',
            'registered' => 1
        ]);

        DB::table('servers')->insert([
            'id' => 6,
            'system_serial' => 'trueview-demo_freehive_io',
            'model' => 'trueview-demo_freehive_io',
            'hostname' => 'trueview-demo_freehive_io',
            'ip' => '10.0.0.42',
            'customer_id' => '12345',
            'config_name' => 'trueview-demo_freehive_io',
            'wnty_expire' => '2019-12-31',
            'registered' => 1
        ]);
    }
}
