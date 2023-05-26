<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use PDOException;
use Illuminate\Support\Facades\DB;

class DocumentController extends Controller
{
    public function getAll(Request $request)
    {
        try {
            $user =  Document::query()
                ->with(['client' => function ($query) {
                    $query->select('id', 'name', 'dni', 'address', 'town', 'telephone');
                }])
                ->orderBy('id', 'desc')->get();

            $response = [
                'success' => true,
                'message' => "Documents obtained successfully",
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
            if (Document::find($id)) {
                $document = Document::findOrFail($id);

                $response = [
                    'success' => true,
                    'message' => "Document obtained successfully",
                    'data' => $document
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Document Not Found",
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
            if (Document::find($id)) {

                $document = Document::findOrFail($id);

                Document::findOrFail($id)->delete();
                $response = [
                    'success' => true,
                    'message' => "Document deleted",
                    'data' => $document
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Document Not Found",
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
            Document::create($request->validate([
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
                'message' => "Document Created",
                'data' => Document::find(DB::getPdo()->lastInsertId())
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
            if (Document::find($id)) {

                Document::findOrFail($id)->update($request->validate([
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
                    'data' => Document::find($id)
                ];

                return response($response, 200);
            } else {
                $response = [
                    'success' => false,
                    'message' => "Document Not Found",
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
            if (!Document::find($id)) {
                $response = [
                    'success' => false,
                    'message' => "Client Not Found",
                    'data' => null
                ];

                return response($response, 404);
            }

            $response = [
                'success' => true,
                'message' => "Client Of Document obtained successfully",
                'data' => Document::findOrFail($id)->client
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
