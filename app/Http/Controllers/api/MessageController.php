<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Message;
use App\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(){
        return Message::all();
    }

    public function store(Request $request){
        $user=User::find($request->user_id);

        $msg=new Message();

        $msg=$request->all();
        $msg['username']=$user->firstName;
            $msg['user_avatar']=$user->avatar;
            $message= Message::create($msg);
        \App\Events\SentMessageEvent::dispatch($message);




    }
}
