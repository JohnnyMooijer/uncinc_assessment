<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Article;
use Tests\TestCase;

class ArticleApiTest extends TestCase
{
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function  test_user_can_create_article()
    {
        $response = $this->actingAs($this->user, 'sanctum')->postJson('/api/articles', [
            'title'   => 'Test artikel',
            'content' => 'Dit is een test artikel.',
        ]);

        $response->assertStatus(201);
        $this->assertArrayHasKey('title', $response->json());
        $this->assertArrayHasKey('content', $response->json());
    }

    public function test_user_can_update_article()
    {
        $article = Article::factory()->create();

        $response = $this->actingAs($this->user, 'sanctum')->putJson("/api/articles/{$article->id}", [
            'title'   => 'Aangepaste titel',
            'content' => 'Nieuwe content',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('articles', [
            'id'    => $article->id,
            'title' => 'Aangepaste titel',
        ]);
    }

    public function test_user_can_delete_article()
    {
        $article = Article::factory()->create();

        $response = $this->actingAs($this->user, 'sanctum')->deleteJson("/api/articles/{$article->id}");
        $response->assertStatus(200);

        $this->assertDatabaseMissing('articles', [
            'id' => $article->id,
        ]);
    }

    public function test_guests_cannot_create_articles()
    {
        $response = $this->postJson('/api/articles', [
            'title'   => 'Ongeautoriseerd',
            'content' => 'Geen toegang',
        ]);

        $response->assertStatus(401);
    }
}
