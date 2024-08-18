<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Job extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeUserType($query, array $args)
    {
        $status = $args['status'] ?? null;

        return $query->when(!is_null($status), function ($query) use ($status) {
            return $query->where('status', $status);
        });
    }

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return empty($search) ? $query : $query->where('name', 'like', "%{$search}%");
    }
}
