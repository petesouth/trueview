<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('servers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->string('system_serial')->unique()->nullable(false);
            $table->string('model')->nullable();
            $table->string('hostname')->nullable();
            $table->string('ip')->nullable();
            $table->string('customer_id');
            $table->string('config_name')->nullable();
            $table->date('wnty_expire')->nullable();
            $table->boolean('actived')->default(0);
            $table->enum('contract_type', array('legacy','standard','bronze','silver','gold','freenascer','mini'))->nullable();
            $table->enum('contract_sw', array('none','business','inteegral'))->nullable();
            $table->enum('contract_hw', array('parts','nextday','fourhour'))->nullable();
            $table->date('contract_start')->nullable();
            $table->integer('contract_duration')->nullable();
            $table->string('customer_name')->nullable();
            $table->string('status')->nullable();
            $table->enum('features',array('dedup','jails','fiber'))->nullable();
            $table->string('license_key')->nullable();
            $table->enum('influx_db_name', array('collectd','telegraf','graphite'))->default('collectd');
            $table->boolean('registered')->default(0);
        }); 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('servers'); 
    }
}
