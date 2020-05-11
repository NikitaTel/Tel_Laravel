<?php
namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
class AuthController extends Controller
{
    public $successStatus = 200;

    public function register(Request $request) {
      $validator = Validator::make($request->all(),
            [
                'firstName' => 'required',
                'email' => 'required|email',
               'password' => 'required',


            ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $input = $request->all();

        $newUser = new User($input);
        $newUser->role=0;
       $newUser->password = bcrypt($input['password']);
        $newUser->save();

       $success['token'] =  $newUser->createToken('AppName')->accessToken;
//        return response()->json(['success'=>$success], $this->successStatus);

    }


    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('AppName')-> accessToken;
            return response()->json(['success' => $success,'user'=>$user], $this-> successStatus);
        } else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }


}
