<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRulesTable extends Migration
{
    public function up()
    {
        Schema::create('rules', function (Blueprint $table) {
            $table->increments('id');
            $table->string('org');
            $table->string('name')->default("New Rule");
            $table->string('host')->default("all");
            $table->string('service')->default("all");
            $table->string('state')->default("all");
            $table->string('event')->default("all");
            $table->string('action')->default("mail");
            $table->string('receiver')->default("all");
            $table->boolean('enabled')->defalut(0);
        });
    }

    public function down()
    {
        Schema::drop('rules');

    }
}
