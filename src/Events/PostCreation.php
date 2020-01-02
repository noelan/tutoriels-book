<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Post;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class PostCreation implements EventSubscriberInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [KernelEvents::VIEW => ['bindCurrentUserOnPostCreation', EventPriorities::PRE_VALIDATE]];
    }

    /**
     * Lors de la création d'un post, set le User actuellement connecté au poste
     *
     * @param ViewEvent $event
     * @return void
     */
    public function bindCurrentUserOnPostCreation(ViewEvent $event)
    {
        $post = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        $user = $this->security->getUser();

        if ($post instanceof Post && $method == "POST") {
            $user = $this->security->getUser();
            $post->setUser($user);
        }
    }
}
