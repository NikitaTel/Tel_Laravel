<?php

namespace App;

use App\Http\Filters\QueryFilter;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'firstName', 'birthday','favourite_animals','user_description','status','secondName','email','avatar','role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @param Builder $builder
     * @param QueryFilter $filters
     * @return Builder
     */

    public function scopeFilter(Builder $builder,QueryFilter $filters){
        return $filters->apply($builder);
    }
    public function role(){
        return $this->belongsTo(Role::class);
    }

    public function posts(){
        return $this->hasMany(Post::class);
    }

    public function chats(){
        return $this->belongsToMany(Chat::class);
    }

    public function messages(){
        return $this->hasMany(Message::class);
    }
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
