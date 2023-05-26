<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use PDOException;
use Illuminate\Support\Facades\DB;


class EventController extends Controller
{
    public function getAll(Request $request)
    {
        try {
            $events = Event::all();

            $response = [
                'success' => true,
                'message' => "Events obtained successfully",
                'data' => $events
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
            if (Event::find($id)) {
                $event = Event::findOrFail($id);

                $response = [
                    'success' => true,
                    'message' => "Event obtained successfully",
                    'data' => $event
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Event Not Found",
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
            if (Event::find($id)) {

                $event = Event::findOrFail($id);

                Event::findOrFail($id)->delete();
                $response = [
                    'success' => true,
                    'message' => "Event deleted",
                    'data' => $event
                ];

                return response($response, 200);
            } else {

                $response = [
                    'success' => false,
                    'message' => "Event Not Found",
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
            Event::create($request->validate([
                'name' => 'required|string',
                'start' => 'required|string',
                'end' => 'required|string',
            ]));
            $response = [
                'success' => true,
                'message' => "Event Created",
                'data' => Event::find(DB::getPdo()->lastInsertId())
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
            if (Event::find($id)) {

                Event::findOrFail($id)->update($request->validate([
                    'name' => 'nullable|string',
                    'start' => 'nullable|string',
                    'end' => 'nullable|string',
                ]));

                $response = [
                    'success' => true,
                    'message' => "Event Updated",
                    'data' => Event::find($id)
                ];

                return response($response, 200);
            } else {
                $response = [
                    'success' => false,
                    'message' => "Event Not Found",
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
}
