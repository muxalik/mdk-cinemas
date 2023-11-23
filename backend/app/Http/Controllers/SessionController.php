<?php

namespace App\Http\Controllers;

use App\Filters\SessionFilter;
use App\Http\Requests\Session\UpdateSessionRequest;
use App\Http\Resources\SessionResource;
use App\Models\Session;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class SessionController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = (new SessionFilter(
            $request,
            Session::query()
        ))
            ->filter()
            ->search()
            ->sort()
            ->apply();

        return SessionResource::collection(
            $query->paginate(10)
        );
    }

    public function update(
        Session $session,
        UpdateSessionRequest $request
    ): Response {
        $ok = $session->update($request->validated());

        if (!$ok) {
            return response()->json([
                'status' => 'Data not saved due to unexpected error',
            ], 500);
        }

        return response()->noContent();
    }

    public function destroy(Session $session): Response
    {
        $session->delete();

        return response()->noContent();
    }
}
