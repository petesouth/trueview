<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('title', 50);
            $table->string('slug', 10);
        }); 

        DB::table('roles')->insert([
            ['title' => 'TrueView Administrator','slug' => 'tvadmin'],
            ['title' => 'Administrator','slug' => 'admin'],
            ['title' => 'Viewer','slug' => 'viewer']
        ]);   

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('roles'); 
    }
}
