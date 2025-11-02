<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use App\Http\Requests\ArticleSearchRequest;
use App\Http\Requests\ArticleUpdateRequest;
use App\Models\Article;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ArticleController extends Controller
{
    public function index(ArticleSearchRequest $request)
    {
        $query = Article::query();

        if ($search = $request->query('search')) {
            $query->where('title', 'like', '%' . $search . '%');
        }

        $articles = $query->orderBy('created_at', 'desc')->get();

        return response()->json($articles);
    }

    public function store(ArticleRequest $request)
    {
        try {
            $article = Article::create($request->validated());

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('articles', $filename, 'public');
                $article->image = $path;

                $article->save();
            }

            return response()->json($article->toArray(), 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $article = Article::findOrFail($id);
        return response()->json($article);
    }

    public function update(ArticleUpdateRequest $request, $id)
    {
        try {
            $article = Article::findOrFail($id);
            $article->update($request->validated());

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('articles', $filename, 'public');
                $article->image = $path;

                $article->save();
            }

            return response()->json($article);

        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Article not found'], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error'   => $e->getMessage()
            ], 500);
        }
    }


    public function destroy($id)
    {
        try {
            $article = Article::findOrFail($id);
            $article->delete();

            return response()->json([], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Article not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

}
