<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class ClientsController extends Controller
{
    public function index(){
        $client = Clients::where('added_by', '=', auth()->user()->id)->get();
        return response()->json([
            'status'=>200,
            'client'=>$client,
        ]);
    }

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

    public function edit($id){
        $client = Clients::find($id);
        if($client){
            return response()->json([
                'status' => 200,
                'client'=>$client,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message'=>'Client not found',
            ]);
        }
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email'=> 'required|email|unique:clients,email,'.$id,
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors'=>$validator->messages(),
            ]);
        }else{

            $client = Clients::find($id);
            if($client){
                $client->name = $request->input('name');
                $client->email = $request->input('email');
                $client->added_by = auth()->user()->id;

                if($request->hasFile('image')){

                    $path=$client->image;
                    if(File::exists($path)){
                        File::delete($path);
                    }
                    $file= $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename= time().'.'. $extension;
                    $file->move('uploads/clients/',$filename);
                    $client->image ='uploads/clients/'.$filename;
                }

                $client->update();

                return response()->json([
                    'status' => 200,
                    'message'=>'Client has been successfully updated.',
                ]);
            }else{

                return response()->json([
                    'status' => 404,
                    'message'=>'Client not found.',
                ]);
            }
        }
    }

    public function destroy($id){
        $client = Clients::find($id);
        if($client){
            $client->delete();
            return response()->json([
                'status' => 200,
                'message'=>'Client has been successfully removed.',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message'=>'Client not found',
            ]);
        }
    }
}
