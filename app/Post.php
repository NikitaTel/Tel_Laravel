<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable=['thread','content','user_id','avatar'];


    public function user(){
        return $this->belongsTo(User::class);
    }
}
