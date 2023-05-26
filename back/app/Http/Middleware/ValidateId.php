<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ValidateId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $id = $request->id;
       
        if(!is_numeric($id) || $id < 0 ){
            $response = [
                'success' => false,
                'message' => "'ERROR: The given data was invalid'",
                'data' => null
            ];

            return response($response, 422);
        }

        return $next($request);
    }
}
