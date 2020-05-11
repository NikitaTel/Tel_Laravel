<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('registration','api\AuthController@register');
Route::post('authentification','api\AuthController@login');

Route::post('message', 'api\ChatController@index');

Route::get('posts','api\PostController@index');

Route::post('create_post','api\PostController@store');
Route::delete('delete_chat/{id}','api\ChatController@destroy');

Route::post('createChat','api\ChatController@store');
Route::get('allChatList','api\ChatController@index');
Route::get('chats_from_userid/{user_id}','api\ChatController@chatsByUserId');
Route::get('chat/{id}','api\ChatController@show');
Route::post('updateChat/{id}','api\ChatController@update');
//Route::post('entryIntoChat/{chat_id}','api\ChatController@');


Route::post('chat/add_message','api\MessageController@store');


Route::post('changeAvatar/{id}','api\UserController@updateUserAvatar');
Route::get('user/{id}','api\UserController@show');
Route::post('user/update/{id}','api\UserController@update');
Route::delete('delete_user/{id}','api\UserController@destroy');

Route::get('users','api\UserController@index');
