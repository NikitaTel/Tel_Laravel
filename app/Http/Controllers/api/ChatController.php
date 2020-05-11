<?php

namespace App\Http\Controllers\api;

use App\Chat;
use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index(Request $request)
    {
            return Chat::all()->load('messages','users');
    }
    public function chatsByUserId($user_id){

       return User::find($user_id)->chats->load('users','messages');

    }
    public function store(Request $request){
        $path=$request->file('avatar')->store('public');// эта строка возвращает путь до файла.Только путь
        $path=str_replace('public/','',$path);
        $request->avatar=$path;
        $newChat=Chat::create($request->all());
//        $newChat->avatar=$path;
        $newChat->users()->attach(explode(',',$request->users));
         $newChat->load('users');;

         return $newChat;

    }




    public function show($id){
        return Chat::find($id)->load('messages','users');
    }



    public function update($id,Request $request){
        return Chat::find($id)->update($request->all());
    }

    public function entryIntoChat($chat_id,Request $request){
        $chat=Chat::find($chat_id);
        $chat->users()->attach($request->all());
        $chat->save();

    }


    public function destroy($id){
        $chat=Chat::find($id);
        $chat->messages()->delete();
        $chat->users()->delete();

        $chat->delete();
    }

}
