<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PDOException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $data = '';

        if (!Auth::guard('api')->check()) {

            $data = $request->validate([
                'name' => 'required | string',
                'password' => 'required | string',
            ]);
        } else {
            $response = [
                "success" => false,
                "message" => "User and Password are required",
                "data" => null
            ];


            return response($response, 400);
        };


        if (Auth::attempt($data)) {

            $response = [
                "success" => true,
                "message" => "Logged",
                "data" => Auth::user()->createToken("AuthToken")->accessToken
            ];

            return response($response, 200);
        } else {

            $response = [
                "success" => false,
                "message" => "Failed password or user",
                "data" => Auth::user()
            ];

            return response($response, 404);
        } {
            $response = [
                "success" => false,
                "message" => "You have already logged",
                "data" => null
            ];


            return response($response, 200);
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('api')->user()->tokens()->delete();

        $response = [
            "success" => true,
            "message" => "Logout",
            "data" => null
        ];

        return response($response, 200);
    }

    public function whoAmI(Request $request)
    {

        $response = [
            "success" => true,
            "message" => "User Info",
            "data" => Auth::guard('api')->user()
        ];

        return response($response, 200);
    }

    public function getUsers(Request $request)
    {
        try {
            $users = User::all();

            $response = [
                'success' => true,
                'message' => "Users obtained successfully",
                'data' => $users
            ];

            return response($response, 200);
        } catch (PDOException $exception) {

            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $exception->errorInfo
            ];

            return response($response, 500);
        }
    }

    public function getById(Request $request, $id)
    {
        try {
            if (User::find($id)) {
                $user = User::findOrFail($id);

                $response = [
                    'success' => true,
                    'message' => "User obtained successfully",
                    'data' => $user
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "User Not Found",
                    'data' => null
                ];

                return response($response, 404);
            }
        } catch (PDOException $ex) {

            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $ex->errorInfo
            ];
            return response($response, 500);
        }
    }

    public function updateUser(Request $request, $id)
    {

        try {
            if (User::find($id)) {

                $request->validate([
                    'name' => "nullable|string",
                    'password' => "nullable|string",
                    'role' => "nullable|string",
                ]);

                User::findOrFail($id)->update([
                    "name" => $request->name,
                    "password" => Hash::make($request->password),
                    "role" => $request->role
                ]);

                $response = [
                    'success' => true,
                    'message' => "User Updated",
                    'data' => User::find($id)
                ];

                return response($response, 200);
            } else {
                $response = [
                    'success' => false,
                    'message' => "User Not Found",
                    'data' => null
                ];

                return response($response, 404);
            }
        } catch (PDOException $ex) {

            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $ex->errorInfo
            ];

            return response($response, 500);
        }
    }

    public function deleteUser(Request $request, $id)
    {
        try {
            if (User::find($id)) {

                $user = User::findOrFail($id);

                User::findOrFail($id)->delete();
                $response = [
                    'success' => true,
                    'message' => "User deleted",
                    'data' => $user
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "User Not Found",
                    'data' => null
                ];

                return response($response, 404);
            }
        } catch (PDOException $ex) {

            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $ex->errorInfo
            ];

            return response($response, 500);
        }
    }


    public function crearUser(Request $request)
    {
        try {

            $request->validate([
                'name' => "required | string",
                'password' => "required | string",
                'rpassword' => "required | same:password",
                'role' => "required | string",
            ]);

            User::create([
                "name" => $request->name,
                "password" => Hash::make($request->password),
                "role" => $request->role
            ]);

            $response = [
                "success" => true,
                "message" => "User Created",
                "data" => User::find(DB::getPdo()->lastInsertId())
            ];

            return response($response, 201);
        } catch (PDOException $ex) {
            return response($ex->errorInfo, 500);
        }
    }
}
