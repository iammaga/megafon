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
        return in_array($user->role, ['operator', 'back_office', 'admin']);
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Appeal $appeal)
    {
        return $this->viewAny($user);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return in_array($user->role, ['operator', 'back_office']);
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
        return $user->role === 'back_office' || $user->role === 'admin';
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
        return $user->role === 'admin';
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
        //
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
        //
    }
}
