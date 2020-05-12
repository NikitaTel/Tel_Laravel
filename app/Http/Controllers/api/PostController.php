<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(){
        return Post::all();
    }


    public function store(Request $request){
        return Post::create($request->all());
    }
}
