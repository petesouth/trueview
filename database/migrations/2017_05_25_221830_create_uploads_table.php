<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUploadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {  Schema::create('uploads', function (Blueprint $table) {
    	$table->increments('id');
    	$table->string('description')->nullable(false);
    	$table->string('origfilename')->nullable(false);
    	$table->string('filename')->nullable(false);
    	$table->string('org_id')->nullable(false);
    	$table->string('filetype')->nullable(false);
    	$table->boolean('enabled')->defalut(0);
    	$table->timestamps();
    }); 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    	Schema::drop('uploads'); 
    }
}
