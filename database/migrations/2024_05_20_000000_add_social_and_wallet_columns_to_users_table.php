<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('wallet_address')->nullable()->unique()->after('avatar');
        $table->string('wallet_chain')->nullable()->after('wallet_address');
        $table->string('wallet_nonce')->nullable()->after('wallet_chain');
    });
}

public function down()
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn([
            'wallet_address',
            'wallet_chain',
            'wallet_nonce',
        ]);
    });
}
};