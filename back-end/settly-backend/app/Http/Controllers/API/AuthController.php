<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'first_name' => 'required',
            'sur_name' =>'required',
            'email'=>'email|unique:users,email|required_with:confirm_email|same:confirm_email|max:191',
            'confirm_email' =>'required|max:191',
            'password'=>'min:6|required_with:confirm_password|same:confirm_password',
            'confirm_password'=>'min:6',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{
            $user = User::create([
                'first_name' => $request->first_name,
                'sur_name' => $request->sur_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;

            return response()->json([
                'status'=>200,
                'username'=>$user->email,
                'token'=>$token,
                'message'=>'Successfully Registered.'
            ]);
        }
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email'=>'email|required|max:191',
            'password'=>'min:6|required',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{

            $user = User::where('email', $request->email)->first();

            if(! $user || ! Hash::check($request->password, $user->password)){
                return response()->json([
                    'status'=>401,
                    'message' => 'Invalid credentials',
                ]);
            }else{
                if($user->role_as==1){
                    $token = $user->createToken($user->email.'_AdminToken',['server:admin'])->plainTextToken;
                }else{
                    $token = $user->createToken($user->email.'_Token',[])->plainTextToken;
                }

                return response()->json([
                    'status'=>200,
                    'username'=>$user->email,
                    'token'=>$token,
                    'message'=>'Successfully logged in.'
                ]);
            }
        }
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Successfully logged out',
        ]);
    }
}
