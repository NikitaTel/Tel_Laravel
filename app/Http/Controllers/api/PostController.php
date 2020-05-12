<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Filters\NewsFilter;
use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(NewsFilter $filter){
        return Post::filter($filter)->get()->load('user');
    }


    public function store(Request $request){
        return Post::create($request->all());
    }

    public function delete($id){
        Post::find($id)->delete();
    }
}
