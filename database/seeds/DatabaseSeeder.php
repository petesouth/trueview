<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(OrgsTableSeeder::class);
        $this->call(ServersTableSeeder::class);
        $this->call(Msg_logTableSeeder::class);
        $this->call(MessagesTableSeeder::class);
        $this->call(RulesTableSeeder::class);
    }
}
