<?php

namespace App\Events;

use App\Chat;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EntryToChat
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $newUser;

    /**
     * Create a new event instance.
     *
     * @param $newUser
     */
    public function __construct($newUser)
    {
        $this->newUser=$newUser;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @param Chat $chat
     * @return Channel|array
     */
    public function broadcastOn(Chat $chat)
    {
        return new Channel('chat.'.$chat->id);
    }
}
