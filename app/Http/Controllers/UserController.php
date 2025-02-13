<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('role')->get();

        return response()->json([
            'message' => 'Список пользователей успешно получен.',
            'data' => $users
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:operator,back_office,admin',
        ]);

        if (User::where('email', $request->email)->exists()) {
            return response()->json(['error' => 'Этот email уже зарегистрирован.'], 400);
        }

        $role = Role::where('name', $request->role)->first();
        if (!$role) {
            return response()->json(['error' => 'Роль не найдена.'], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id,
        ]);

        return response()->json([
            'message' => 'Пользователь успешно создан.',
            'data' => $user
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json([
            'message' => 'Пользователь найден.',
            'data' => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255',
            'password' => 'sometimes|string|min:8',
            'role' => 'sometimes|in:operator,back_office,admin',
        ]);

        $data = $request->all();

        if ($request->has('email') && User::where('email', $request->email)->where('id', '!=', $user->id)->exists()) {
            return response()->json(['error' => 'Этот email уже зарегистрирован другим пользователем.'], 400);
        }

        if ($request->has('password')) {
            $data['password'] = Hash::make($request->password);
        }

        if ($request->has('role')) {
            $role = Role::where('name', $request->role)->first();
            if (!$role) {
                return response()->json(['error' => 'Роль не найдена.'], 400);
            }
            $data['role_id'] = $role->id;
            unset($data['role']);
        }

        $user->update($data);

        return response()->json([
            'message' => 'Пользователь успешно обновлен.',
            'data' => $user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'message' => 'Пользователь успешно удален.'
        ], 204);
    }
}
