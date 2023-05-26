<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use PDOException;
use Illuminate\Support\Facades\DB;



class ClientController extends Controller
{
    public function getAll(Request $request)
    {
        try {
            $clients = Client::all();

            $response = [
                'success' => true,
                'message' => "Clients obtained successfully",
                'data' => $clients
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
            if (Client::find($id)) {
                $client = Client::findOrFail($id);

                $response = [
                    'success' => true,
                    'message' => "Client obtained successfully",
                    'data' => $client
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Client Not Found",
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

    public function delete(Request $request, $id)
    {

        try {
            if (Client::find($id)) {

                $client = Client::findOrFail($id);

                Client::findOrFail($id)->delete();
                $response = [
                    'success' => true,
                    'message' => "Client deleted",
                    'data' => $client
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Client Not Found",
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

    public function post(Request $request)
    {
        try {
            Client::create($request->validate([
                'name' => 'required|string',
                'dni' => 'required|string',
                'address' => 'required|string',
                'town' => 'required|string',
                'telephone' => 'required|string',
                'email' => 'nullable|email:rfc',
            ]));
            $response = [
                'success' => true,
                'message' => "Client Created",
                'data' => Client::find(DB::getPdo()->lastInsertId())
            ];

            return response($response, 201);
        } catch (PDOException $ex) {
            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $ex->errorInfo
            ];

            return response($response, 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            if (Client::find($id)) {

                Client::findOrFail($id)->update($request->validate([
                    'name' => 'nullable|string',
                    'dni' => 'nullable|string',
                    'address' => 'nullable|string',
                    'town' => 'nullable|string',
                    'telephone' => 'nullable|string',
                    'email' => 'nullable|email:rfc',
                ]));

                $response = [
                    'success' => true,
                    'message' => "Client Updated",
                    'data' => Client::find($id)
                ];

                return response($response, 200);
            } else {
                $response = [
                    'success' => false,
                    'message' => "Client Not Found",
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

    public function documents(Request $request, $id)
    {
        try {
            if (!Client::find($id)) {
                $response = [
                    'success' => false,
                    'message' => "Documents Not Found",
                    'data' => null
                ];

                return response($response, 404);
            }

            $response = [
                'success' => true,
                'message' => "Documents of User obtained successfully",
                'data' => Client::findOrFail($id)->documents
            ];

            return response($response, 200);
        } catch (PDOException $ex) {
            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $ex->errorInfo
            ];
            return response($response, 500);
        }
    }

    public function terminados(Request $request, $id)
    {
        try {
            if (!Client::find($id)) {
                $response = [
                    'success' => false,
                    'message' => "Terminados Not Found",
                    'data' => null
                ];

                return response($response, 404);
            }

            $response = [
                'success' => true,
                'message' => "Terminados of User obtained successfully",
                'data' => Client::findOrFail($id)->documents
            ];

            return response($response, 200);
        } catch (PDOException $ex) {
            $response = [
                'success' => false,
                'message' => "Connection Failed",
                'data' => $ex->errorInfo
            ];
            return response($response, 500);
        }
    }
}
