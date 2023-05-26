<?php

namespace App\Http\Controllers;

use App\Models\Terminado;
use Illuminate\Http\Request;
use PDOException;
use Illuminate\Support\Facades\DB;

class TerminadoController extends Controller
{
    public function getAll(Request $request)
    {
        try {
            $user =  Terminado::query()
                ->with(['client' => function ($query) {
                    $query->select('id', 'name', 'dni', 'address', 'town', 'telephone');
                }])
                ->orderBy('id', 'desc')->get();

            $response = [
                'success' => true,
                'message' => "Terminados obtained successfully",
                'data' => $user
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
            if (Terminado::find($id)) {
                $terminado = Terminado::findOrFail($id);

                $response = [
                    'success' => true,
                    'message' => "Terminado obtained successfully",
                    'data' => $terminado
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Terminado Not Found",
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
            if (Terminado::find($id)) {

                $terminado = Terminado::findOrFail($id);

                Terminado::findOrFail($id)->delete();
                $response = [
                    'success' => true,
                    'message' => "Terminado deleted",
                    'data' => $terminado
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Terminado Not Found",
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
            Terminado::create($request->validate([
                'type' => 'required|string',
                'model' => 'required|string',
                'serial' => 'required|string',
                'password' => 'nullable|string',
                'charger' => 'nullable|string',
                'pattern' => 'nullable|string',
                'task' => 'required|string',
                'client_id' => 'required|integer',
            ]));
            $response = [
                'success' => true,
                'message' => "Terminado Created",
                'data' => Terminado::find(DB::getPdo()->lastInsertId())
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
            if (Terminado::find($id)) {

                Terminado::findOrFail($id)->update($request->validate([
                    'type' => 'nullable|string',
                    'model' => 'nullable|string',
                    'serial' => 'nullable|string',
                    'password' => 'nullable|string',
                    'charger' => 'nullable|string',
                    'pattern' => 'nullable|string',
                    'task' => 'nullable|string',
                    'client_id' => 'nullable|integer'
                ]));

                $response = [
                    'success' => true,
                    'message' => "Document Updated",
                    'data' => Terminado::find($id)
                ];

                return response($response, 200);
            } else {
                $response = [
                    'success' => false,
                    'message' => "Terminado Not Found",
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

    public function client(Request $request, $id)
    {
        try {
            if (!Terminado::find($id)) {
                $response = [
                    'success' => false,
                    'message' => "Client Not Found",
                    'data' => null
                ];

                return response($response, 404);
            }

            $response = [
                'success' => true,
                'message' => "Client Of Terminado obtained successfully",
                'data' => Terminado::findOrFail($id)->client
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
