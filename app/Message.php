<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable=['content','chat_id','user_id','user_avatar','username'];
    public function user(){
        return $this->belongsTo(User::class );
    }

    public function chat(){
        return $this->belongsTo(Chat::class);
    }

}
