<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;

class ClientsController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email'=>'email|unique:clients,email|required|max:191',
            'image' =>'required|image|mimes:jpeg,png,jpg|max:2048',

        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors'=>$validator->messages(),
            ]);
        }else{

            $client = new Clients;
            $client->name = $request->input('name');
            $client->email = $request->input('email');
            $client->added_by = auth()->user()->id;

            if($request->hasFile('image')){

                $file= $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename= time().'.'. $extension;
                $file->move('uploads/clients/',$filename);
                $client->image ='uploads/clients/'.$filename;
            }

            $client->save();

            return response()->json([
                'status' => 200,
                'message'=>'Client has been successfully added.',
            ]);
        }
    }
}
