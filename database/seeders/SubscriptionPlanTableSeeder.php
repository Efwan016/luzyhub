<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\Models\SubscriptionPlan;

class SubscriptionPlanTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subscriptionPlans = [
            [
                'name' => 'Basic',
                'price' => 10,
                'active_period_months' => 1,
                'features' => json_encode(['Feature A', 'Feature B', 'Feature C']),
            ],
            [
                'name' => 'Premium',
                'price' => 84,
                'active_period_months' => 12,
                'features' => json_encode(['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E', 'Feature F']),
            ],
            
        ];

        SubscriptionPlan::insert($subscriptionPlans);
    }
}
