<?php

namespace App\Events;


use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtTokenOnCreation
{

    public function onJwtcreated(JWTCreatedEvent $event)
    {
        //     $data = $event->getData();
        //     $user = $event->getUser();


        //     if (!$user instanceof UserInterface) {
        //         return;
        //     }

        //     // $data['id'] = $user->getId();

        //     $event->setData($data);
        // }
    }
}
