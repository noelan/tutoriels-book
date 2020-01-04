<?php

namespace App\Events;


use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedId
{

    public function updateJwtData(JWTCreatedEvent $event)
    {
        $user = $event->getUser();

        $data = $event->getData();
        $data['id'] = $user->getId();


        $event->setData($data);
    }
}
