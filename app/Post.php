<?php

namespace App;

use App\Http\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable=['thread','content','user_id','avatar'];

    public function scopeFilter(Builder $builder,QueryFilter $filters){
        return $filters->apply($builder);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
