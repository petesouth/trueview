<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->increments('id');
            $table->string('kayako_fusion_ticket_link');
            $table->string('ticket_id');
            $table->string('priority');
            $table->string('company');
            $table->string('org_id');
            $table->string('status');
            $table->string('days_open');
            $table->string('subject');
            $table->string('chief_complaint');
            $table->string('department');
            $table->string('owner');
            $table->dateTime('date');
            $table->dateTime('last_replier');
            $table->dateTime('last_activity');
            $table->string('order_number');
            $table->string('invoice_number');
            $table->string('serial_number_system_1');
            $table->string('serial_number_system_2');
            $table->string('serial_number_system_3');
            $table->string('hardware_platform');
            $table->string('expansion_shelf');
            $table->string('system_location');
            $table->string('main_contact_person')->nullable();
            $table->string('main_contact_email')->nullable();
            $table->string('customer_internal_ticket');
            $table->string('sla_plan');
            $table->string('support_level');
            $table->string('hardware_support_expiration');
            $table->string('software_support_expiration');
            $table->string('resolution_type'); 
            $table->string('sales_rep');
            $table->string('os');
            $table->string('resolution');
            $table->string('course_of_action'); 
            $table->string('RMA_number');
            $table->string('inbound_tracking_number');
            $table->string('date_shipped_to_customer');
            $table->string('date_of_returned_part_from_customer');
            $table->string('RMA_manufacturer'); 
            $table->string('tracking_number_to_vendor');
            $table->string('date_of_returned_fixed_part');
            $table->string('model_number');
            $table->string('RMA_contact_name');
            $table->string('RMA_ship_to_address'); 
            $table->string('special_instructions');
            $table->string('part_serial_number');
            $table->string('main_contact_phone_number');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tickets');
    }
}
