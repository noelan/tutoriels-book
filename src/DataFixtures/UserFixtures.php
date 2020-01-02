<?php

namespace App\DataFixtures;

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
            ->setPassword($encodedPassword);
        $manager->persist($user);

        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $encodedPassword = $this->encoder->encodePassword($user, "password");
            $user->setPseudo($faker->firstName())
                ->setEmail($faker->email())
                ->setPassword($encodedPassword);
            $this->addReference('user' . $i, $user);
            $manager->persist($user);
        }
        $manager->flush();
    }
}
