<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{

    protected $fillable=['name','creator_id','user_id','avatar'];
    public function users(){
        return $this->belongsToMany(User::class);
    }
    public $timestamps = false;
    public function messages(){
        return $this->hasMany(Message::class);
    }


}
