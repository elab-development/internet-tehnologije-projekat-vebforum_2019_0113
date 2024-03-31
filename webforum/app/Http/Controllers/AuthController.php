<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //registracija
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['Registracija neuspešna:' => $validator->errors()]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('BearerToken')->plainTextToken;

        $odgovor = [
            'Poruka' => 'Uspešna registracija!',
            'User' => $user,
            'Token' => $token,
        ];

        return response()->json($odgovor);
    }

    // Login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status'=>400,'Greška:' => $validator->errors()]);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['Greška pri prijavi:' => 'Pokušajte ponovo!']);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('BearerToken')->plainTextToken;

        $odgovor = [
            'status'=>200,
            'Poruka' => 'Uspešna prijava!',
            'User' => $user,
            'Token' => $token,
        ];

        return response()->json($odgovor);
    }

 
    //logout
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json('Uspesna odjava!.');
    }
}
