<?php

namespace App\Policies;

use App\Models\Appeal;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AppealPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return in_array($user->role_id, [
            User::ADMIN,
            User::OPERATOR,
            User::BACK_OFFICE,
        ]);
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Appeal $appeal)
    {
        return $this->viewAny($user) || $user->id === $appeal->user_id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return in_array($user->role_id, [
            User::OPERATOR,
            User::BACK_OFFICE
        ]);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Appeal $appeal
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Appeal $appeal)
    {
        return in_array($user->role_id, [
            User::ADMIN,
            User::BACK_OFFICE,
        ]);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Appeal $appeal
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Appeal $appeal)
    {
        return $user->role_id === User::ADMIN;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Appeal $appeal
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Appeal $appeal)
    {
        return $user->role_id === User::ADMIN;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Appeal $appeal
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Appeal $appeal)
    {
        return $user->role_id === User::ADMIN;
    }
}
