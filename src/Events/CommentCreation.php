<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Comment;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class CommentCreation implements EventSubscriberInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [KernelEvents::VIEW => ['bindCommentForUser', EventPriorities::PRE_VALIDATE]];
    }

    /**
     * Lors de la création d'un post, set le User actuellement connecté au poste
     *
     * @param ViewEvent $event
     * @return void
     */
    public function bindCommentForUser(ViewEvent $event)
    {
        $comment = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        $user = $this->security->getUser();

        if ($comment instanceof Comment && $method == "POST") {
            $user = $this->security->getUser();
            $comment->setUser($user);
            $comment->setCreatedAt(new \DateTime('now'));
        }
    }
}
