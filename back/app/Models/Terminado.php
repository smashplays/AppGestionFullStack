<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Terminado extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'type',
        'model',
        'serial',
        'password',
        'charger',
        'pattern',
        'task',
        'client_id'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
