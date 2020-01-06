<?php

namespace App\DataFixtures;

use App\Entity\Post;
use Faker\Factory;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        // $product = new Product();
        // $manager->persist($product);

        /**
         * Création des users
         */
        $user = new User();
        $encodedPassword = $this->encoder->encodePassword($user, "password");
        $user->setPseudo($faker->firstName())
            ->setEmail("test@test.test")
            ->setPassword($encodedPassword)
            ->setPicture("https://i.pinimg.com/originals/3b/10/a8/3b10a845ad9843b25552eb957728d47e.jpg");
        $manager->persist($user);

        for ($j = 0; $j < 20; $j++) {


            $post = new Post();
            $post->setTitle(ucfirst($faker->sentence()))
                ->setDescription(ucfirst($faker->sentence()))
                ->setDifficulty("Difficile")
                ->setHref("https://www.youtube.com/watch?v=OpUWqlsLic8")
                ->setUser($user)
                ->setCategory("food")
                ->setCreatedAt($faker->dateTimeBetween('-1 years'));
            $manager->persist($post);
        }



        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $encodedPassword = $this->encoder->encodePassword($user, "password");
            $user->setPseudo($faker->firstName())
                ->setEmail($faker->email())
                ->setPassword($encodedPassword)
                ->setPicture("https://i.pinimg.com/originals/3b/10/a8/3b10a845ad9843b25552eb957728d47e.jpg");
            $this->addReference('user' . $i, $user);
            $manager->persist($user);
        }
        $manager->flush();
    }
}
