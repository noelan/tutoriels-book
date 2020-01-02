<?php

namespace App\Events;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtTokenOnCreation
{

    public function onJwtcreated(JWTCreatedEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        $data['id'] = $user->getId();
        $event->setData($data);
    }
}
