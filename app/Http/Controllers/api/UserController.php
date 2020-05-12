<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\User;

use Illuminate\Http\Request;
use App\Http\Filters\UserFilter;

class UserController extends Controller
{
    public function index(UserFilter $filters)
    {

        return User::filter($filters)->get()->load('chats','posts','role');

    }

    public function show($id)
    {
        return User::find($id)->load('chats', 'posts');
    }
    public function updateUserAvatar($id, Request $request)
    {
        $user = User::find($id);
        $path = $request->file('avatar')->store('public');
        $path=str_replace('public/','',$path);
        $user->avatar = $path;
        $user->save();
        return $path;
    }
    public function update($id, Request $request)
    {
        User::find($id)->update($request->all());
        return $request->all();
    }
    public function destroy($id){
      $user=User::all()->find($id);
    }
}
