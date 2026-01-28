<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
   public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        if (!Schema::hasColumn('users', 'wallet_address')) {
            $table->string('wallet_address')->nullable()->unique();
        }

        if (!Schema::hasColumn('users', 'wallet_nonce')) {
            $table->string('wallet_nonce')->nullable();
        }

        if (!Schema::hasColumn('users', 'wallet_chain')) {
            $table->string('wallet_chain')->nullable();
        }
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
