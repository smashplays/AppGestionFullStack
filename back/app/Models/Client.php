<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'dni',
        'address',
        'town',
        'telephone',
        'email',
    ];

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function terminados()
    {
        return $this->hasMany(Terminado::class);
    }
}
