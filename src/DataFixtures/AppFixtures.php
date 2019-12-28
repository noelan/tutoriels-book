<?php

namespace App\DataFixtures;

use App\Entity\Comment;
use App\Entity\Post;
use Faker\Factory;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        $difficulties = ['beginner', 'intermediate', 'hard', 'insane', 'impossible'];
        // $product = new Product();
        // $manager->persist($product);


        /**
         * Création des users
         */
        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $encodedPassword = $this->encoder->encodePassword($user, "password");
            $user->setPseudo($faker->firstName())
                ->setEmail($faker->email())
                ->setPassword($encodedPassword);

            $manager->persist($user);

            /**
             * Création des commentaires pour les postes
             */
            for ($k = 0; $k < rand(5, 10); $k++) {
                $comment = new Comment();
                $comment->setComment($faker->sentence())
                    ->setUser($user)
                    ->setCreatedAt($faker->dateTimeBetween('-1 years'));
                $manager->persist($comment);


                /**
                 * Création des postes
                 */
                for ($j = 0; $j < rand(3, 10); $j++) {
                    $post = new Post();
                    $post->setTitle($faker->word())
                        ->setDescription($faker->sentence())
                        ->setDifficulty($difficulties[rand(0, count($difficulties) - 1)])
                        ->setHref("https://www.youtube.com/watch?v=GbvwyxW2WOA&list=PLDTlf-v8f7V_MLKfR61mOOLKqQQ2IS6_-&index=195")
                        ->setUser($user)
                        ->addComment($comment);
                    $manager->persist($post);
                }
            }
        }



        $manager->flush();
    }
}
