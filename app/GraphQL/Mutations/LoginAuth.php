<?php

namespace App\GraphQL\Mutations\Auth;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;

class LoginAuth
{
    /**
     * @param mixed $_
     *
     * @throws \JsonException
     * @throws \Exception
     */

    public function __invoke($_, array $args)
    {
        $params = [
            'client_id'     => $args['client_id'],
            'client_secret' => $args['client_secret'],
            'grant_type'    => isset($args['refresh_token']) ? 'refresh_token' : 'password',
            'scopes'        => ['*'],
            'username'      => $args['username'] ?? null,
            'password'      => $args['password'] ?? null,
            'refresh_token' => $args['refresh_token'] ?? null,
        ];
        $params = array_filter($params, static fn ($value) => !is_null($value));

        $proxyRequest = Request::create('/oauth/token', 'POST', $params);

        $response = app()->handle($proxyRequest);
        $result = json_decode($response->getContent(), true);

        if (isset($result['access_token'])) {
            $userRequest = Request::create('/api/user');
            $userRequest->headers->set('Authorization', 'Bearer ' . $result['access_token']);
            $userDataResponse = app()->handle($userRequest);

            if (isset($result['access_token'])) {
                $userRequest = Request::create('/api/user');
                $userRequest->headers->set('Authorization', 'Bearer ' . $result['access_token']);
                $userDataResponse = app()->handle($userRequest);

                if ($userDataResponse->getStatusCode() === 200) {
                    $userData = json_decode($userDataResponse->getContent(), true);

                    $result['user'] = tap(new User($userData), static function ($userModel) use ($userData) {
                        $userModel->id = $userData['id'];
                        $userModel->createdAt = Carbon::parse($userData['created_at'])->format('Y-m-d H:i:s');
                        $userModel->updatedAt = Carbon::parse($userData['updated_at'])->format('Y-m-d H:i:s');
                        $userModel->deleted_at = Carbon::parse($userData['deleted_at'])->format('Y-m-d H:i:s');
                    });
                } else {
                    $result['error'] = 'Failed to retrieve user data.';
                }
            }
        }

        return $result;
    }
}
