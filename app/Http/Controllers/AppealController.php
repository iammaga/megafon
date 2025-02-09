<?php

namespace App\Http\Controllers;

use App\Models\Appeal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppealController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $appeals = Appeal::with('responsible')->paginate(10);

        return response()->json($appeals);
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
            'client_name' => 'required|string|max:255',
            'client_phone' => 'required|string|max:20',
            'client_account' => 'required|string|max:50',
            'description' => 'required|string',
        ]);

        $appeal = Appeal::create([
            'client_name' => $request->client_name,
            'client_phone' => $request->client_phone,
            'client_account' => $request->client_account,
            'description' => $request->description,
            'user_id' => Auth::id(),
        ]);

        return response()->json($appeal, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $appeal = Appeal::find($id);

        if (!$appeal) {
            return response()->json(['message' => 'Обращение не найдено'], 404);
        }

        return response()->json($appeal);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Appeal $appeal)
    {
        $this->authorize('update', $appeal);

        $data = $request->validate([
            'status' => 'nullable|in:new,in_progress,resolved',
            'assigned_to' => 'nullable|exists:users,id',
            'comment' => 'nullable|string',
        ]);

        $appeal->update($data);

        return response()->json(['message' => 'Обращение обновлено', 'appeal' => $appeal]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:3'
        ]);

        $query = $request->input('query');

        $appeals = Appeal::where('client_account', 'like', "%{$query}%")
            ->orWhere('client_name', 'like', "%{$query}%")
            ->orWhere('client_phone', 'like', "%{$query}%")
            ->paginate(10);

        return response()->json($appeals);
    }
}
