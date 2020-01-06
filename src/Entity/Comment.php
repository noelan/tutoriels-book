<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CommentRepository")
 * @ApiResource( attributes={
 *      "normalizationContext"={"groups"={"comment_read"}},
 *      "force_eager"=false,
 * })
 */
class Comment
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"comment_read", "post_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=1000)
     * @Assert\NotBlank(message="Le commentaire ne peut pas être vide")
     * @Assert\Length(
     *      min = 1,
     *      max = 1000,
     *      minMessage = "Votre commentaire faire minimum 1 caractères",
     *      maxMessage = "Votre commentaire doit faire maximum 1000 caractères"
     * )
     * @Groups({"comment_read", "post_read"})
     */
    private $comment;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User",cascade={"persist"} )
     * @Assert\NotBlank(message="Le champ user commentaire ne peut pas être vide")
     * @Groups({"comment_read", "post_read"})
     */
    private $user;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank(message="Le champ creadtedAt ne peut pas être vide")
     * @Groups({"comment_read", "post_read"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Post", inversedBy="comments")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Le commentaire doit apartenir à un poste")
     * @Groups({"comment_read"})
     */
    private $post;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(?Post $post): self
    {
        $this->post = $post;

        return $this;
    }
}
