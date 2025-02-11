<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = ['operator', 'back_office', 'admin'];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }
    }
}
