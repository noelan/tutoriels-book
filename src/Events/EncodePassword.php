<?php

namespace App\Events;

use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class EncodePassword implements EventSubscriberInterface
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE],
        ];
    }

    //set default picture to user should be not here
    public function encodePassword(ViewEvent $event)
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($user instanceof User && $method == "POST") {
            $encodedPassword = $this->encoder->encodePassword($user, $user->getPassword());
            $user->setPassword($encodedPassword);
            $user->setPicture("https://st3.depositphotos.com/6672868/13801/v/450/depositphotos_138013506-stock-illustration-user-profile-group.jpg");
        }
    }
}
