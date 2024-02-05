<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
        CREATE TRIGGER msg_trigger AFTER INSERT ON messages FOR EACH ROW
        BEGIN
            SET @orgid = (SELECT customer_id FROM servers WHERE system_serial = new.serial);
            SET @updated = (SELECT is_update FROM msg_log WHERE org_id = @orgid);
            IF (@updated < 1) THEN
                UPDATE msg_log SET is_update = 1, updated_at = new.created_at WHERE org_id = @orgid;
            END IF;
            UPDATE msg_log SET new_msg = new_msg + 1  WHERE org_id = @orgid;
        END


        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER msg_trigger');
    }
}
